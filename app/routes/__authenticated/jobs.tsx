import { BriefcaseIcon, HomeIcon } from '@heroicons/react/24/solid';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { getJobs } from '~/models/jobs.server';

export async function loader() {
  const jobs = await getJobs();

  return json({ jobs });
}

export default function Jobs() {
  const { jobs } = useLoaderData<typeof loader>();

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
            icon: <BriefcaseIcon />,
            link: '/jobs',
            name: 'Jobs'
          }
        ]}
      />

      <div className="overflow-x-auto shadow-xl">
        <table className="table w-full" data-test-id="jobs-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                className="hover"
                data-test-id={`jobs-table-row-${job.id}`}
                key={job.id}
              >
                <td>{job.name}</td>
                <td>{job.author}</td>
                <td>{job.publisher}</td>
                <td>{job?.completionDate ? 'Completed' : 'In Progress'}</td>
                <td>
                  <Link
                    to={`/jobs/${job.id}`}
                    prefetch="intent"
                    data-test-id={`jobs-table-row-${job.id}-button`}
                  >
                    <button className="btn btn-sm btn-primary">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
