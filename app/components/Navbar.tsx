import { UserCircleIcon } from '@heroicons/react/24/solid';
import type { User } from '@prisma/client';
import { Link } from '@remix-run/react';
import { isAdmin } from '~/utils';

interface NavbarProps {
  user: User;
}

export function Navbar(props: NavbarProps) {
  const { user } = props;

  return (
    <nav className="navbar bg-base-300" data-test-id="navbar">
      <div className="navbar-start">
        <Link
          className="btn btn-ghost normal-case text-xl"
          data-test-id="navbar-title"
          to="/"
        >
          Printster
        </Link>
      </div>

      <div className="navbar-center">
        <ul data-test-id="navbar-links" className="menu menu-horizontal p-0">
          {isAdmin(user) && (
            <li>
              <Link
                data-test-id="navbar-dashboard-link"
                to="/dashboard"
                prefetch="intent"
              >
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link
              data-test-id="navbar-task-list-link"
              to="/tasklist"
              prefetch="intent"
            >
              Task List
            </Link>
          </li>

          {isAdmin(user) && (
            <li>
              <Link
                data-test-id="navbar-employees-link"
                to="/employees"
                prefetch="intent"
              >
                Employees
              </Link>
            </li>
          )}

          <li>
            <Link data-test-id="navbar-jobs-link" to="/jobs" prefetch="intent">
              Jobs
            </Link>
          </li>

          <li>
            <Link
              data-test-id="navbar-machines-link"
              to="/machines"
              prefetch="intent"
            >
              Machines
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle ">
              <div
                data-test-id="navbar-user-dropdown"
                className="w-10 rounded-full flex justify-center"
              >
                <UserCircleIcon />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
            >
              <li>
                <Link
                  data-test-id="navbar-user-dropdown-logout-button"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
