import type { JobTask } from '@prisma/client';
import { getCompletedTaskCount, getPendingTaskCount } from '../';

const jobTasks: JobTask[] = [
  {
    id: 1,
    employeeId: 1,
    machineId: 1,
    jobId: 1,
    jobStepId: 1,
    jobTaskStatusId: 3
  },
  {
    id: 2,
    employeeId: 2,
    machineId: 2,
    jobId: 1,
    jobStepId: 2,
    jobTaskStatusId: 2
  },
  {
    id: 3,
    employeeId: 3,
    machineId: 3,
    jobId: 1,
    jobStepId: 3,
    jobTaskStatusId: 1
  }
];

describe('getCompletedTaskCount()', () => {
  test('returns the correct number of completed tasks.', () => {
    expect(getCompletedTaskCount(jobTasks)).toBe(1);
  });
});

describe('getPendingTaskCount()', () => {
  test('returns the correct number of pending tasks.', () => {
    expect(getPendingTaskCount(jobTasks)).toBe(2);
  });
});
