// app/components/ShowHeader.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@components/Header";

const HIDDEN_ROUTES = ["/login", "/signup"];

const ShowHeader = () => {
  const pathname = usePathname();

  const shouldHide = HIDDEN_ROUTES.includes(pathname);

  if (shouldHide) return null;

  return <Header />;
};

export default ShowHeader;
