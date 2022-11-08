import { HomeIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { json } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { getEmployees } from '~/models/employee.server';
import { requireAdminPermissions } from '~/session.server';

export async function loader({ request }: LoaderArgs) {
  await requireAdminPermissions(request);

  const employees = await getEmployees();
  return json({ employees });
}

export default function Employees() {
  const { employees } = useLoaderData<typeof loader>();
  const { employeeId } = useParams();

  const sortedEmployees = employees.sort(({ name: prev }, { name: next }) => {
    return prev < next ? -1 : prev > next ? 1 : 0;
  });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            icon: <HomeIcon />,
            link: '/',
            name: 'Home'
          },
          {
            icon: <UserGroupIcon />,
            link: '/employees',
            name: 'Employees'
          }
        ]}
      />

      <section className="flex gap-2">
        <div className="flex-1">
          <div
            data-test-id="employees-list"
            className="w-full flex flex-col gap-2"
          >
            {sortedEmployees.map((employee) => {
              const isSelected = Number(employeeId) === employee.id;
              const dataTestId = isSelected
                ? `employee-list-item-${employee.name}-selected`
                : `employee-list-item-${employee.name}`;

              return (
                <Link
                  to={`/employees/${employee.id}`}
                  prefetch="intent"
                  key={employee.id}
                >
                  <div
                    data-test-id={dataTestId}
                    className={`card card-compact ${
                      isSelected ? 'bg-primary' : 'bg-base-300'
                    } shadow-xl border-l-4 border-l-primary`}
                  >
                    <div className="card-body">
                      <h2 className="card-title pl-2">{employee.name}</h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </>
  );
}
