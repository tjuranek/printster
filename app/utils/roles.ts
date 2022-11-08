import type { User } from "@prisma/client";
import { Role } from "~/enums/role";

export function getRole(user: User) {
  if (isAdmin(user)) {
    return Role.Admin;
  }

  return Role.Employee;
}

/**
 * Returns true if the passed in user has the admin role.
 */
export function isAdmin(user: User) {
  return user.userRoleId === Role.Admin;
}

/**
 * Returns true if the passed in user has the employee role.
 */
export function isEmployee(user: User) {
  return user.userRoleId === Role.Employee;
}
