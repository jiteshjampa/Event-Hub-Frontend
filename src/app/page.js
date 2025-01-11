"use client"; // Required for client-side components

import { useState } from "react";
// Example component for fetching data
import DashBoard from "./dashboard/page";
export default function Home() {
  return (
    <div>
      <DashBoard />
    </div>
  );
}
