import type { Metadata } from "next";
import { JobsClient } from "./JobsClient";

export const metadata: Metadata = {
  title: "Job Openings | Yellow Power International Careers",
  description: "Browse current job opportunities at Yellow Power International across drilling operations, engineering, safety, technical roles, and corporate positions in Ghana, Mali, and Burkina Faso.",
};

export default function JobsPage() {
  return <JobsClient />;
}
