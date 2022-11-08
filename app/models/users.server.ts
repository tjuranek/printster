import { prisma } from "~/db.server";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * Gets a user by their id.
 */
export async function getUserById(id: User["id"]) {
  return await prisma.user.findUnique({ where: { id } });
}

/**
 * Gets a user by their username.
 */
export async function getUserByUsername(username: User["username"]) {
  return await prisma.user.findUnique({ where: { username } });
}

/**
 * Validates a users login credentials, returning the user if the credentials were valid.
 */
export async function verifyLogin(
  username: User["username"],
  password: User["password"]
) {
  const user = await getUserByUsername(username);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  return user;
}
