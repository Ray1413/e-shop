import React from "react";
import { useNavigation } from "react-router";
import { RefreshCw } from "lucide-react";

export default function SideLoading() {
  const navigation = useNavigation();
  const loading = navigation.state !== "idle";

  if (!loading) return null;
  return (
    <div className="fixed z-50 p-2 animate-spin">
      <RefreshCw />
    </div>
  );
}
