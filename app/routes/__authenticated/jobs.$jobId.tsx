import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { JobTaskStatus } from '~/enums/jobTaskStatus';
import { getOperators } from '~/models/employee.server';
import { getJob, updateJobTaskAssignments } from '~/models/jobs.server';
import { getMachines } from '~/models/machines.server';
import { requireUser } from '~/session.server';
import { formatDateString } from '~/utils/format';
import { isAdmin } from '~/utils/roles';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);
  const jobId = Number(params.jobId);

  const job = await getJob(jobId);
  const machines = await getMachines();
  const operators = await getOperators();

  return json({ job, machines, operators, user });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const jobTaskId = Number(formData.get('jobTaskId'));
  const machineId = Number(formData.get('machineId'));
  const employeeId = Number(formData.get('employeeId'));

  await updateJobTaskAssignments(jobTaskId, employeeId, machineId);
  return json({});
}

export default function JobsJobId() {
  const { job, machines, operators, user } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  if (!job || !machines || !operators) return;

  const isEveryTaskComplete = job?.jobTasks.every(
    (jobTask) => jobTask.jobTaskStatusId === JobTaskStatus.Complete
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div
        className="card w-full bg-base-300 shadow-xl"
        data-test-id={`job-${job.id}-info`}
      >
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title text-3xl">{job.name}</h2>

            {isEveryTaskComplete ? (
              <div className="badge badge-success">Complete</div>
            ) : (
              <div className="badge badge-info">In Progress</div>
            )}
          </div>
          <p>by {job.author}</p>

          <div className="divider" />

          <div className="grid grid-cols-3">
            <div>
              <p className="text-sm text-gray-600">Publisher</p>
              <p>{job.publisher}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Start Date</p>
              <p>{formatDateString(job.startDate)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Completion Date</p>
              {job.completionDate && (
                <p>{formatDateString(job.completionDate)}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAdmin(user) && (
        <div
          className="card w-full bg-base-300 shadow-xl"
          data-test-id={`job-${job.id}-tasks`}
        >
          <div className="card-body">
            <h3 className="card-title text-2xl">Tasks</h3>

            <div className="divider" />

            {job.jobTasks.map((jobTask) => {
              const machinesForTaskType = machines.filter((machine) => {
                return machine.machineTypeId === jobTask.jobStep.machineTypeId;
              });

              return (
                <>
                  <h2>{jobTask.jobStep.name}</h2>
                  <Form
                    method="post"
                    key={jobTask.id}
                    data-test-id={`job-${job.id}-tasks-step-${jobTask.jobStepId}`}
                    onChange={(e) => submit(e.currentTarget)}
                  >
                    <input
                      hidden={true}
                      readOnly={true}
                      name="jobTaskId"
                      defaultValue={jobTask.id}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text text-gray-600">
                            Machine
                          </span>
                        </label>

                        <select
                          className="select select-bordered"
                          data-test-id={`job-${job.id}-tasks-step-${jobTask.jobStepId}-machine-select`}
                          name="machineId"
                        >
                          {machinesForTaskType.map((machine) => {
                            const isSelected = machine.id === jobTask.machineId;

                            return (
                              <option
                                selected={isSelected}
                                key={machine.id}
                                value={machine.id}
                              >
                                {machine.nickname}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text text-gray-600">
                            Operator
                          </span>
                        </label>

                        <select
                          className="select select-bordered"
                          data-test-id={`job-${job.id}-tasks-step-${jobTask.jobStepId}-employee-select`}
                          name="employeeId"
                        >
                          {operators.map((operator) => {
                            const isSelected =
                              operator.id === jobTask.employeeId;

                            return (
                              <option
                                selected={isSelected}
                                key={jobTask.id}
                                value={operator.id}
                              >
                                {operator.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </Form>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
