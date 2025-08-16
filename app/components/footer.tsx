import React from "react";

export default function Footer({ fullVersion }: { fullVersion?: string }) {
  return (
    <footer className="mt-5 py-3 bg-accent/70 text-sm">
      {!!fullVersion && <div className="text-center">Version: {fullVersion}</div>}
    </footer>
  );
}
