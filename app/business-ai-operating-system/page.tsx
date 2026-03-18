import type { Metadata } from "next";
import BusinessAIOSPage from "./BusinessAIOSPage";

export const metadata: Metadata = {
  title: "Business AI Operating System — Revaya AI",
  description:
    "Five layers. Every major drain on your time. Automated, connected, fully auditable. The Business AI OS is how your business runs without you in the room.",
};

export default function Page() {
  return <BusinessAIOSPage />;
}
