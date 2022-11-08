import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getLastHiredEmployee, getUsersCount } from "~/models/employee.server";
import { getRecentJobs } from "~/models/jobs.server";
import { getMachinesCount } from "~/models/machines.server";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { formatDateString } from "~/utils/format";
import { requireAdminPermissions } from "~/session.server";
import {
  ChartBarSquareIcon,
  HomeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

export async function loader({ request }: LoaderArgs) {
  await requireAdminPermissions(request);

  const recentJobs = await getRecentJobs();
  const usersCount = await getUsersCount();
  const lastHiredEmployee = await getLastHiredEmployee();
  const machinesCount = await getMachinesCount();

  return json({
    recentJobs,
    lastHiredEmployee,
    usersCount,
    machinesCount,
  });
}

export default function Dashboard() {
  const { recentJobs, lastHiredEmployee, usersCount, machinesCount } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            icon: <HomeIcon />,
            link: "/",
            name: "Home",
          },
          {
            icon: <ChartBarSquareIcon />,
            link: "/",
            name: "Dashboard",
          },
        ]}
      />

      <div className="grid grid-cols-3 gap-4">
        {usersCount && lastHiredEmployee && (
          <div
            data-test-id="users-card"
            className="card w-full bg-base-300 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">Users</h2>

              <div className="stats bg-base-300 text-center">
                <div className="stat">
                  <div
                    data-test-id="users-card-admins-value"
                    className="stat-value"
                  >
                    {usersCount.adminCount}
                  </div>
                  <div className="stat-desc">Admins</div>
                </div>

                <div className="stat">
                  <div
                    data-test-id="users-card-employees-value"
                    className="stat-value"
                  >
                    {usersCount.employeeCount}
                  </div>
                  <div className="stat-desc">Employees</div>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <UserPlusIcon />

                <p
                  className="text-sm"
                  data-test-id={`users-card-last-hired-employee-${lastHiredEmployee.id}`}
                >
                  <b>{lastHiredEmployee.name}</b> was hired on{" "}
                  {formatDateString(lastHiredEmployee.dateCreated)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className="card col-span-2 w-full bg-base-300 shadow-xl"
          data-test-id="recent-jobs-card"
        >
          <div className="card-body">
            <h2 className="card-title">Recent Jobs</h2>

            {recentJobs ? (
              <div className="mt-4" data-test-id="recent-jobs-card-list">
                {recentJobs.map((job) => (
                  <div
                    className="flex justify-between py-1"
                    data-test-id={`recent-jobs-card-list-item-${job.id}`}
                    key={job.id}
                  >
                    <span>
                      <b>{job.name}</b>
                    </span>

                    <Link
                      to={`/jobs/${job.id}`}
                      data-test-id={`recent-jobs-card-list-item-${job.id}-button`}
                    >
                      <button className="btn btn-primary btn-sm">
                        View Job
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No active jobs.</p>
            )}
          </div>
        </div>

        <div
          className="card col-span-3 w-full bg-base-300 shadow"
          data-test-id="machines-card"
        >
          <div className="card-body">
            <h2 className="card-title">Machines</h2>

            <div className="stats mt-2">
              <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value" data-test-id="machines-card-total">
                  {machinesCount.totalCount}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Printers</div>
                <div
                  className="stat-value"
                  data-test-id="machines-card-printers"
                >
                  {machinesCount.printersCount}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Binders</div>
                <div
                  className="stat-value"
                  data-test-id="machines-card-binders"
                >
                  {machinesCount.bindersCount}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Coverers</div>
                <div
                  className="stat-value"
                  data-test-id="machines-card-coverers"
                >
                  {machinesCount.coverersCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
