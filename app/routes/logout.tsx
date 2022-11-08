import type { LoaderArgs } from "@remix-run/node";
import { logout } from "~/session.server";

/**
 * On load, logout any currently logged in user and redirect them to the login
 * page.
 */
export async function loader({ request }: LoaderArgs) {
  return logout(request);
}
