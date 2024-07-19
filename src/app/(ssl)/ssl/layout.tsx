"use client";

import LayoutBody from "@/components/LayoutBody";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ReactElement, ReactNode } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function StatusLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <ProtectedRoute>
      <LayoutBody>{children}</LayoutBody>
    </ProtectedRoute>
  );
}
