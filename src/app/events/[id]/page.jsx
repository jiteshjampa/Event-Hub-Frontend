"use client";
import EventDetails from "@/components/EventDetails";
import React from "react";

function page({ params }) {
  return <EventDetails params={params} />;
}

export default page;
