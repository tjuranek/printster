import { HomeIcon, QueueListIcon } from '@heroicons/react/24/solid';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useSubmit
} from '@remix-run/react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { getEmployee, getEmployees } from '~/models/employee.server';
import {
  getIncompleteJobTasks,
  getJobTaskStatuses,
  updateJobTaskStatus
} from '~/models/jobs.server';
import { requireUser } from '~/session.server';
import { isAdmin } from '~/utils';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  const employee = await getEmployee(user.employeeId);
  const jobTaskStatuses = await getJobTaskStatuses();
  const tasks = await getIncompleteJobTasks(user.employeeId);

  return json({
    employee,
    ...(isAdmin(user) && { employees: await getEmployees() }),
    jobTaskStatuses,
    tasks,
    user
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const jobTaskId = Number(formData.get('jobTaskId'));
  const jobTaskStatusId = Number(formData.get('jobTaskStatusId'));

  await updateJobTaskStatus(jobTaskId, jobTaskStatusId);
  return json({});
}

export default function TaskList() {
  const { employee, employees, jobTaskStatuses, tasks, user } =
    useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const submit = useSubmit();

  function onEmployeeSelection(employeeId: string) {
    navigate(`/tasklist/${employeeId}`);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          breadcrumbs={[
            {
              icon: <HomeIcon />,
              link: '/',
              name: 'Home'
            },
            {
              icon: <QueueListIcon />,
              link: '/tasklist',
              name: 'Task List'
            }
          ]}
        />

        {isAdmin(user) && employees && (
          <select
            className="select select-bordered w-full max-w-xs"
            data-test-id="employee-select"
            onChange={(event) => onEmployeeSelection(event.target.value)}
          >
            {employees.map((employee) => {
              const isSelected = employee.id === user.employeeId;

              return (
                <option
                  key={employee.id}
                  disabled={isSelected}
                  selected={isSelected}
                  value={employee.id}
                >
                  {employee.name}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <div className="mt-8" data-test-id="welcome-message">
        <h2 className="text-3xl">
          Wecome back,{' '}
          <span data-test-id="welcome-message-name">
            {employee?.name.split(' ')[0]}
          </span>
        </h2>

        <p className="text-gray-500 pt-2">
          You've got{' '}
          <span data-test-id="welcome-message-task-count">{tasks.length}</span>{' '}
          task{tasks.length !== 1 && 's'} on your list.
        </p>
      </div>

      <div className="mt-8" data-test-id="task-list">
        {tasks.map((task) => {
          return (
            <div
              className="card card-compact bg-base-300 shadow my-2"
              data-test-id={`task-list-item-${task.id}`}
              key={task.id}
            >
              <div className="card-body flex flex-row justify-between items-center">
                <div>
                  <h2
                    className="card-title text-lg"
                    data-test-id={`task-list-item-${task.id}-header`}
                  >
                    {task.job.name}
                  </h2>

                  <p>
                    <b>
                      <span data-test-id={`task-list-item-${task.id}-step`}>
                        {task.jobStep.name}
                      </span>
                    </b>{' '}
                    with{' '}
                    <Link
                      data-test-id={`task-list-item-${task.id}-machine`}
                      to={`/machines/${task.machine.id}`}
                      className="link"
                    >
                      {task.machine.nickname}
                    </Link>
                  </p>
                </div>

                <Form method="post" onChange={(e) => submit(e.currentTarget)}>
                  <input hidden={true} name="jobTaskId" value={task.id} />

                  <select
                    className="select select-ghost select-bordered w-full max-w-xs"
                    data-test-id={`task-list-item-${task.id}-status-select`}
                    name="jobTaskStatusId"
                  >
                    {jobTaskStatuses.map((status) => {
                      const isSelected = status.id === task.jobTaskStatusId;

                      return (
                        <option
                          data-test-id={`task-list-item-${task.id}-status-select-option-${status.name}`}
                          key={status.id}
                          selected={isSelected}
                          value={status.id}
                        >
                          {status.name}
                        </option>
                      );
                    })}
                  </select>
                </Form>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
