import type { Metadata } from "next";
import { CSRProjectsClient } from "./CSRProjectsClient";

export const metadata: Metadata = {
  title: "CSR Project Showcase | Yellow Power International",
  description: "Explore our complete portfolio of community impact initiatives across West Africa. Filter projects by category, status, and country.",
};

export default function CSRProjectsPage() {
  return <CSRProjectsClient />;
}
