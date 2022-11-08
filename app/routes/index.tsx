import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";
import { verifyLogin } from "~/models/users.server";
import {
  createUserSession,
  getUser,
  redirectToHomePage,
} from "~/session.server";

/**
 * On load, check for a logged in user. If they exist redirect,
 * to their home page. Otherwise stay on the login page.
 */
export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);

  if (!user) {
    return json({});
  }

  return redirectToHomePage(user);
}

/**
 * Handle the login form submission. An 'isInvalid' property is returned with a
 * 400 status code if the form data is incorrect, or a 404 is returned if the
 * user wasn't found. A new user session is created if the user is found which
 * redirects to their home page.
 */
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  if (!username || !password) {
    return json({ isInvalid: true }, { status: 400 });
  }

  const user = await verifyLogin(username, password);

  if (!user) {
    return json({ isInvalid: true }, { status: 404 });
  }

  return createUserSession(request, user);
}

/**
 * The login page only holds a login form for requests that don't have users. If
 * the request had a user, they're redirected.
 */
export default function Login() {
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);

  const formHasError = actionData?.isInvalid;

  if (formHasError) {
    formRef?.current?.reset();
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Form
        className="card w-96 bg-neutral text-neutral-content"
        data-test-id="login-form"
        method="post"
        ref={formRef}
      >
        <div className="card-body items-center text-center gap-4">
          <h2 className="card-title">Printster</h2>

          {formHasError && (
            <p className="text-sm" data-test-id="login-form-error">
              Invalid username or password. Try again.
            </p>
          )}

          <input
            className={`input w-full max-w-xs ${formHasError && "input-error"}`}
            data-test-id="login-form-username"
            name="username"
            placeholder="Username"
            type="text"
          />

          <input
            className={`input w-full max-w-xs ${formHasError && "input-error"}`}
            data-test-id="login-form-password"
            name="password"
            placeholder="Password"
            type="password"
          />

          <div className="card-actions w-full flex justify-end">
            <button
              className="btn btn-primary px-8"
              data-test-id="login-form-submit"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
