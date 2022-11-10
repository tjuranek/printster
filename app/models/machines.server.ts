import type { Machine } from '@prisma/client';
import { prisma } from '~/db.server';
import { isBinder, isCoverer, isPrinter } from '~/utils';

/**
 * Gets all availabe machines and thier types.
 */
export async function getMachines() {
  return await prisma.machine.findMany({
    include: {
      type: true
    }
  });
}

/**
 * Gets a machine by it's id or else returns null.
 */
export async function getMachine(id: Machine['id']) {
  return await prisma.machine.findUnique({
    where: { id },
    include: {
      type: true
    }
  });
}

export async function getMachinesCount() {
  const machines = await prisma.machine.findMany();

  const printers = machines.filter(isPrinter);
  const binders = machines.filter(isBinder);
  const coverers = machines.filter(isCoverer);

  return {
    totalCount: machines.length,
    printersCount: printers.length,
    bindersCount: binders.length,
    coverersCount: coverers.length
  };
}

export async function getMachineJobTasks(id: Machine['id']) {
  return await prisma.jobTask.findMany({
    where: { machineId: id },
    include: {
      job: true,
      employee: true
    }
  });
}

export async function getMachinesByType(id: number) {
  return await prisma.machine.findMany({
    where: { machineTypeId: id }
  });
}
