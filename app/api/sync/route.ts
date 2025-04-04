import { type NextRequest, NextResponse } from "next/server";
import { syncFirebaseToMySQL, syncMySQLToFirebase } from "@/lib/database-sync";
import { getCurrentUser } from "@/lib/auth";

// POST /api/sync - Sync databases (protected, admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin (you'll need to implement this logic)
    const isAdmin = user.email === "admin@example.com"; // Replace with your admin check
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { direction } = await request.json();

    if (direction === "firebase-to-mysql") {
      await syncFirebaseToMySQL();
    } else if (direction === "mysql-to-firebase") {
      await syncMySQLToFirebase();
    } else {
      // Default: sync both ways
      await syncFirebaseToMySQL();
      await syncMySQLToFirebase();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing databases:", error);
    return NextResponse.json(
      { error: "Failed to sync databases" },
      { status: 500 }
    );
  }
}
