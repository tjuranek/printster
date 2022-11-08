import type { JobTask } from "@prisma/client";
import { JobTaskStatus } from "~/enums/jobTaskStatus";

/**
 * Returns the number of complete tasks given an array of job tasks.
 */
export function getCompletedTaskCount(jobTasks: JobTask[]) {
  return jobTasks.filter(
    (jobTask) => jobTask.jobTaskStatusId === JobTaskStatus.Complete
  ).length;
}

/**
 * Return the number of upcoming or in progress tasks given an array of job tasks.
 */
export function getPendingTaskCount(jobTasks: JobTask[]) {
  const pendingStatuses = [JobTaskStatus.Upcoming, JobTaskStatus.InProgress];

  return jobTasks.filter((jobTask) =>
    pendingStatuses.includes(jobTask.jobTaskStatusId)
  ).length;
}
