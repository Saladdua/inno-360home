"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface SyncDatabasesButtonProps {
  direction?: "firebase-to-mysql" | "mysql-to-firebase" | "both";
}

export default function SyncDatabasesButton({
  direction = "both",
}: SyncDatabasesButtonProps) {
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setSuccess(null);

    try {
      // Get user token for authorization
      const token = await user?.getIdToken();

      const response = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ direction }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to sync databases");
      }

      setSuccess("Databases synced successfully!");
    } catch (error: any) {
      console.error("Error syncing databases:", error);
      setError(error.message || "Failed to sync databases. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleSync}
        disabled={syncing}
        className="flex items-center gap-2"
        variant="outline"
      >
        <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
        {syncing ? "Syncing..." : "Sync Databases"}
      </Button>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      {success && <div className="mt-2 text-sm text-green-600">{success}</div>}
    </div>
  );
}
