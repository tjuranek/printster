import type { Employee, Job, JobTask } from '@prisma/client';
import { prisma } from '~/db.server';
import { JobTaskStatus } from '~/enums/jobTaskStatus';

export async function getJob(id: Job['id']) {
  return await prisma.job.findUnique({
    where: { id },
    include: {
      jobTasks: {
        include: {
          jobStep: true
        },
        orderBy: {
          id: 'asc'
        }
      }
    }
  });
}

export async function getJobTaskStatuses() {
  return await prisma.jobTaskStatus.findMany();
}

export async function updateJobTaskStatus(
  jobTaskId: JobTask['id'],
  jobTaskStatusId: JobTask['jobTaskStatusId']
) {
  await prisma.jobTask.update({
    where: { id: jobTaskId },
    data: {
      jobTaskStatusId
    }
  });
}

export async function updateJobTaskAssignments(
  jobTaskId: JobTask['id'],
  employeeId: JobTask['employeeId'],
  machineId: JobTask['machineId']
) {
  await prisma.jobTask.update({
    where: { id: jobTaskId },
    data: {
      employeeId,
      machineId
    }
  });
}

/**
 * Gets all available jobs.
 */
export async function getJobs() {
  return await prisma.job.findMany();
}

export async function getJobDetails(id: Job['id']) {
  return await prisma.job.findFirst({
    where: { id },
    include: {
      jobTasks: {
        include: {
          employee: true,
          jobStep: true,
          jobTaskStatus: true
        }
      }
    }
  });
}

export async function getIncompleteJobTasks(id: Employee['id']) {
  return await prisma.jobTask.findMany({
    where: {
      employeeId: id,
      jobTaskStatusId: {
        in: [JobTaskStatus.Upcoming, JobTaskStatus.InProgress]
      }
    },
    include: {
      job: true,
      machine: true,
      jobStep: true
    }
  });
}

export async function getRecentJobs() {
  return await prisma.job.findMany({
    orderBy: {
      startDate: 'desc'
    },
    take: 3
  });
}

export async function getJobCount() {
  const jobs = await prisma.job.findMany();

  return jobs.length;
}
