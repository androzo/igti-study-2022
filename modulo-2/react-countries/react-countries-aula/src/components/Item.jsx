import React from "react";

export default function Item({ children: value, label = "Nome:" }) {
  return (
    <span className="text-sm">
      <strong>{label}</strong> {value}
    </span>
  );
}
