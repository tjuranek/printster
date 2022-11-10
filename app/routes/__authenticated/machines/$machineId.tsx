import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { getMachine, getMachineJobTasks } from '~/models/machines.server';
import { formatDateString } from '~/utils';

export async function loader({ params }: LoaderArgs) {
  const machineId = Number(params.machineId);

  const machine = await getMachine(machineId);
  const jobTasks = await getMachineJobTasks(machineId);

  return json({ machine, jobTasks });
}

export default function MachinesMachineId() {
  const { machine, jobTasks } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  function onClose() {
    navigate('/machines');
  }

  return (
    <>
      <div
        className="modal modal-open"
        data-test-id={`machine-${machine?.id}-modal`}
      >
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onClose}
          >
            X
          </button>

          <h2 className="text-lg font-bold">
            {machine?.nickname}
            <div className="badge badge-secondary badge-outline ml-2">
              {machine?.type.name}
            </div>
          </h2>

          <div className="divider" />

          <div className="my-2">
            <p>Manufacturer: {machine?.manufacturer}</p>
            <p>Model: {machine?.model}</p>
          </div>

          <div className="divider" />

          <div className="overflow-x-auto my-2">
            <table
              className="table table-compact w-full shadow-xl"
              data-test-id={`machine-${machine?.id}-modal-job-table`}
            >
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Operator</th>
                  <th>Start Date</th>
                </tr>
              </thead>

              <tbody>
                {jobTasks?.map((jobTask) => (
                  <tr
                    key={jobTask.id}
                    data-test-id={`machine-${machine?.id}-modal-job-table-row-${jobTask.id}`}
                  >
                    <td className="bg-base-300">
                      <Link
                        className="link"
                        data-test-id={`machine-${machine?.id}-modal-job-table-row-${jobTask.id}-job-link`}
                        to={`/jobs/${jobTask.job.id}`}
                        prefetch="intent"
                      >
                        {jobTask.job.name}
                      </Link>
                    </td>

                    <td className="bg-base-300">
                      <Link
                        className="link"
                        data-test-id={`machine-${machine?.id}-modal-job-table-row-${jobTask.id}-employee-link`}
                        to={`/employees/${jobTask.employee.id}`}
                        prefetch="intent"
                      >
                        {jobTask.employee.name}
                      </Link>
                    </td>

                    <td className="bg-base-300">
                      {formatDateString(jobTask.job.startDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
