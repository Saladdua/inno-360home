import { prisma } from "./mysql-config"
import { UserRole } from "./user-service"

export async function createOrUpdateUserProfileMySQL(
  uid: string,
  email: string,
  displayName?: string,
  photoURL?: string,
  role?: UserRole,
): Promise<void> {
  const now = new Date()

  await prisma.user.upsert({
    where: { uid },
    update: {
      email,
      role: role || undefined,
      updatedAt: now,
    },
    create: {
      uid,
      email,
      name: displayName || "Anonymous", // Added 'name' field with a fallback value
      role: role || UserRole.USER,
      createdAt: now,
      updatedAt: now,
    },
  })
}

export async function getUserProfileMySQL(uid: string) {
  return await prisma.user.findUnique({
    where: { uid },
  })
}

export async function updateUserRoleMySQL(uid: string, role: UserRole): Promise<void> {
  await prisma.user.update({
    where: { uid },
    data: {
      role,
      updatedAt: new Date(),
    },
  })
}

export async function getAllUsersMySQL() {
  return await prisma.user.findMany()
}

export async function getUsersByRoleMySQL(role: UserRole) {
  return await prisma.user.findMany({
    where: { role },
  })
}

