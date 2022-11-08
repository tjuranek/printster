import { HomeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { getMachines } from '~/models/machines.server';

export async function loader() {
  const machines = await getMachines();

  return json({ machines });
}

export default function Machines() {
  const { machines } = useLoaderData<typeof loader>();

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

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
            icon: <WrenchScrewdriverIcon />,
            link: '/machines',
            name: 'Machines'
          }
        ]}
      />

      <div className="grid grid-cols-3 gap-4" data-test-id="machine-cards">
        {machines.map((machine) => (
          <div
            className="card w-full basis-1/3 bg-base-300 shadow-xl"
            data-test-id={`machine-card-${machine.id}`}
            key={machine.id}
          >
            <div className="card-body">
              <div className="stats shadow mb-4">
                <div className="stat">
                  <div className="stat-title">{currentMonth} Uptime</div>
                  <div className="stat-value">100%</div>
                </div>
              </div>

              <h2 className="card-title">
                {machine.nickname}
                <div className="badge badge-secondary badge-outline">
                  {machine.type.name}
                </div>
              </h2>

              <p>Manufacturer: {machine.manufacturer}</p>
              <p>Model: {machine.model}</p>

              <div className="card-actions justify-end mt-4">
                <Link to={`/machines/${machine.id}`} prefetch="intent">
                  <button
                    className="btn btn-primary btn-sm"
                    data-test-id={`machine-card-${machine.id}-jobs-button`}
                  >
                    View Jobs
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </>
  );
}
