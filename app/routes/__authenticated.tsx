import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <Navbar user={user} />

      <main className="mx-[15%]">
        <div className="my-4">
          <Outlet />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full">
        <footer
          data-test-id="footer"
          className="footer footer-center p-4 bg-base-300 text-base-content"
        >
          <div>
            <p data-test-id="footer-copyright">
              © {new Date().getFullYear()} Printster
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
