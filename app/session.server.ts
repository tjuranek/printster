import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { User } from "@prisma/client";
import { getUserById } from "./models/users.server";
import { isAdmin, isEmployee } from "./utils/roles";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET as string],
  },
});

const USER_SESSION_KEY = "userId";

/**
 * Parses the session from the request cookie, returning
 * an empty session if there wasn't one.
 */
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");

  return sessionStorage.getSession(cookie);
}

/**
 * Gets the user id from the request session.
 */
export async function getUserId(request: Request): Promise<number | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);

  return userId;
}

/**
 * Gets the user correspoinding to the user id from the request session.
 * If the user id is found but a user is not, we logout.
 */
export async function getUser(request: Request): Promise<User | null> {
  const userId = await getUserId(request);

  if (!userId) {
    return null;
  }

  const user = await getUserById(userId);

  if (user) {
    return user;
  }

  throw await logout(request);
}

/**
 * Ensures a user id is in the session, redirecting to the log in page
 * if there is not.
 */
export async function requireUserId(request: Request) {
  const userId = await getUserId(request);

  if (!userId) {
    throw redirect("/");
  }

  return userId;
}

/**
 * Requires a user available for the logged in session. If a user is not logged in the
 * are redirected to the log in page. If a user is logged in but not associated to a user
 * record they are logged out.
 */
export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

/**
 * Requires the logged in user to have administrator permissions. Redirets
 * to the unauthorized page if not.
 */
export async function requireAdminPermissions(request: Request) {
  const user = await requireUser(request);

  if (!isAdmin(user)) {
    console.log("pre redirect");
    throw redirect("/unauthorized");
  }

  console.log("pre return");
  return user;
}

/**
 * Requires the logged in user to have employee permissions or higher. Redirects
 * to the unauthorized page if not.
 */
export async function requireEmployeePermissions(request: Request) {
  const user = await requireUser(request);

  if (isEmployee(user)) {
    return user;
  }

  throw redirect("/unauthorized");
}

function getHomePagePathname(user: User) {
  return isAdmin(user) ? "/dashboard" : "/tasklist";
}

export function redirectToHomePage(user: User) {
  return redirect(getHomePagePathname(user));
}

/**
 * Creates a new user session to hold the logged in users id. Redirects to
 * the dashboard and sets the cookie valid for one week.
 */
export async function createUserSession(request: Request, user: User) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, user.id);

  const redirectPathname = getHomePagePathname(user);

  return redirect(redirectPathname, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}

/**
 * Destroys the current session for the logged in user and redirects to
 * the login page.
 */
export async function logout(request: Request) {
  const session = await getSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
