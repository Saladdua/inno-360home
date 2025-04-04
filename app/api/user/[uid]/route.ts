import { type NextRequest, NextResponse } from "next/server";
import { getUserProfile, updateUserRole, UserRole } from "@/lib/user-service";
import { updateUserRoleMySQL } from "@/lib/mysql-user-service";
import { getCurrentUser } from "@/lib/auth";

// GET /api/users/[uid] - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    // Check authentication
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user profile to check role
    const currentUserProfile = await getUserProfile(currentUser.uid);

    // Users can view their own profile, admins can view any profile
    if (
      currentUser.uid !== params.uid &&
      (!currentUserProfile || currentUserProfile.role !== UserRole.ADMIN)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const userProfile = await getUserProfile(params.uid);

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[uid] - Update a user's role (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    // Check authentication
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user profile to check role
    const currentUserProfile = await getUserProfile(currentUser.uid);

    if (!currentUserProfile || currentUserProfile.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { role } = await request.json();

    // Validate role
    if (!Object.values(UserRole).includes(role as UserRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Update role in Firebase
    await updateUserRole(params.uid, role as UserRole);

    // Update role in MySQL
    try {
      await updateUserRoleMySQL(params.uid, role as UserRole);
    } catch (error) {
      console.error("Error updating user role in MySQL:", error);
      // Continue even if MySQL update fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
