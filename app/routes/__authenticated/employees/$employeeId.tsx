import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  deactivateEmployeeById,
  getEmployeeDetails,
  reactivateEmployeeById
} from '~/models/employee.server';
import invariant from 'tiny-invariant';
import { Form, useLoaderData } from '@remix-run/react';
import { formatDateString } from '~/utils/format';
import { getCompletedTaskCount, getPendingTaskCount } from '~/utils/jobs';

export async function loader({ params }: LoaderArgs) {
  const employeeId = Number(params.employeeId);
  invariant(employeeId, 'Employee id is required.');

  const employeeDetails = await getEmployeeDetails(employeeId);
  invariant(employeeDetails, 'Employee details not found.');

  return json({ employeeDetails });
}

export async function action({ request, params }: ActionArgs) {
  const employeeId = Number(params.employeeId);

  const formData = await request.formData();
  const intent = formData.get('intent');

  try {
    switch (intent) {
      case 'deactivate': {
        await deactivateEmployeeById(employeeId);
        return json({});
      }

      case 'reactivate': {
        await reactivateEmployeeById(employeeId);
        return json({});
      }

      default: {
        return json({}, { status: 500 });
      }
    }
  } catch (error) {
    return json({}, { status: 500 });
  }
}

export default function EmployeeId() {
  const { employeeDetails } = useLoaderData<typeof loader>();

  const {
    name,
    streetAddressLineOne,
    streetAddressLineTwo,
    emailAddress,
    phoneNumber,
    employeePosition,
    jobTasks,
    dateCreated,
    dateDeactivated
  } = employeeDetails;

  return (
    <div
      className="card w-full h-full bg-base-300 shadow-xl"
      data-test-id={`employee-selection-${employeeDetails.id}`}
    >
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <span className="text-sm">
          {employeePosition.name} since {formatDateString(dateCreated)}
        </span>

        <div className="my-4">
          <p>
            <b>Details</b>
          </p>
          <div className="divider m-0 p-0"></div>

          <div className="flex">
            <div className="flex-1">
              <p>{phoneNumber}</p>
              <p>{emailAddress}</p>
            </div>

            <div className="flex-1">
              <p>{streetAddressLineOne}</p>
              <p>{streetAddressLineTwo}</p>
            </div>
          </div>
        </div>

        <div className="my-4">
          <p>
            <b>Tasks</b>
          </p>
          <div className="divider m-0 p-0"></div>

          <p
            data-test-id={`employee-selection-${employeeDetails.id}-completed-task-count`}
          >
            Completed Count: {getCompletedTaskCount(jobTasks)}
          </p>
          <p
            data-test-id={`employee-selection-${employeeDetails.id}-active-task-count`}
          >
            Active Count: {getPendingTaskCount(jobTasks)}
          </p>
        </div>

        <div className="card-actions justify-end">
          <Form method="post">
            <button
              className={`btn ${dateDeactivated ? 'btn-primary' : 'btn-error'}`}
              data-test-id={`employee-selection-${employeeDetails.id}-activation-button`}
              name="intent"
              value={dateDeactivated ? 'reactivate' : 'deactivate'}
              type="submit"
            >
              {dateDeactivated ? 'Reactivate' : 'Deactivate'}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
