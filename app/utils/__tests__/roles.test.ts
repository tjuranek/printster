import type { User } from '@prisma/client';
import { Role } from '~/enums/role';
import { getRole, isAdmin, isEmployee } from '../';

const baseUser: Partial<User> = {
  id: 1,
  username: 'username',
  password: 'password',
  employeeId: 1
};

describe('getRole()', () => {
  test('defaults to employee role when the role id is invalid.', () => {
    const invalidRoleId = 3;
    const user = { ...baseUser, userRoleId: invalidRoleId } as User;

    expect(getRole(user)).toBe(Role.Employee);
  });

  test('returns employee role if the user is an employee.', () => {
    const user = { ...baseUser, userRoleId: Role.Employee } as User;

    expect(getRole(user)).toBe(Role.Employee);
  });

  test('returns admin if the user is an admin.', () => {
    const user = { ...baseUser, userRoleId: Role.Admin } as User;

    expect(getRole(user)).toBe(Role.Admin);
  });
});

describe('isAdmin()', () => {
  test('returns true if user is an admin.', () => {
    const user = { ...baseUser, userRoleId: Role.Admin } as User;

    expect(isAdmin(user)).toBe(true);
  });

  test('returns false if user is not an admin.', () => {
    const user = { ...baseUser, userRoleId: Role.Employee } as User;

    expect(isAdmin(user)).toBe(false);
  });
});

describe('isEmployee()', () => {
  test('returns true if user is an employee.', () => {
    const user = { ...baseUser, userRoleId: Role.Employee } as User;

    expect(isEmployee(user)).toBe(true);
  });

  test('returns false if user is not an employee.', () => {
    const user = { ...baseUser, userRoleId: Role.Admin } as User;

    expect(isEmployee(user)).toBe(false);
  });
});
