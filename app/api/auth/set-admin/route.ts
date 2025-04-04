import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { updateUserRole, UserRole } from "@/lib/user-service";
import { updateUserRoleMySQL } from "@/lib/mysql-user-service";

// POST /api/auth/set-admin - Set a user as admin (protected by secret key)
export async function POST(request: NextRequest) {
  try {
    const { email, secretKey } = await request.json();

    // Verify the secret key
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user by email
    const userRecord = await auth.getUserByEmail(email);

    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });

    // Update role in Firestore
    await updateUserRole(userRecord.uid, UserRole.ADMIN);

    // Update role in MySQL
    try {
      await updateUserRoleMySQL(userRecord.uid, UserRole.ADMIN);
    } catch (error) {
      console.error("Error updating user role in MySQL:", error);
      // Continue even if MySQL update fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting admin:", error);
    return NextResponse.json({ error: "Failed to set admin" }, { status: 500 });
  }
}
