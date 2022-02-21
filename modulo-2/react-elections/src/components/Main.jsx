import React from "react";

export default function Main({ children }) {
  return (
    <main>
      <div className="container mx-auto p-4">{children}</div>
    </main>
  );
}
