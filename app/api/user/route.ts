import { type NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/user-service";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/user-service"; // Import getUserProfile
import { UserRole } from "@/lib/definitions"; // Import UserRole

// GET /api/users - Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to check role
    const userProfile = await getUserProfile(user.uid);

    if (!userProfile || userProfile.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
