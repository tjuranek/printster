import type { Employee } from '@prisma/client';
import { prisma } from '~/db.server';
import { EmployeePosition } from '~/enums/employeePosition';
import { isAdmin, isEmployee } from '~/utils';

/**
 * Gets all available employees.
 */
export async function getEmployees() {
  return await prisma.employee.findMany();
}

export async function getOperators() {
  return await prisma.employee.findMany({
    where: { employeePositionId: EmployeePosition.MachineOperator }
  });
}

/**
 * Gets an employee, thier position, and job tasks.
 */
export async function getEmployeeDetails(id: Employee['id']) {
  return prisma.employee.findFirst({
    where: { id },
    include: {
      jobTasks: true,
      employeePosition: true
    }
  });
}

export async function getEmployee(id: Employee['id']) {
  return prisma.employee.findUnique({
    where: { id }
  });
}

/**
 * Gets the total number of employees by role.
 */
export async function getEmployeeCount() {
  return prisma.employee.count();
}

export async function getUsersCount() {
  const users = await prisma.user.findMany();

  const admins = users.filter(isAdmin);
  const employees = users.filter(isEmployee);

  return {
    adminCount: admins.length,
    employeeCount: employees.length
  };
}

export async function getLastHiredEmployee() {
  return prisma.employee.findFirst({
    orderBy: {
      dateCreated: 'desc'
    }
  });
}

/**
 * Deactivates an employee.
 */
export async function deactivateEmployeeById(id: Employee['id']) {
  return prisma.employee.update({
    where: { id },
    data: {
      dateDeactivated: new Date()
    }
  });
}

/**
 * Reactivates an employee.
 */
export async function reactivateEmployeeById(id: Employee['id']) {
  return prisma.employee.update({
    where: { id },
    data: {
      dateDeactivated: null
    }
  });
}
