"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENVIRONMENTAL_METRICS, getTotalBeneficiaries, CSR_PROJECTS } from "@/lib/constants/sustainability";
import { TrendingUp, TrendingDown, Leaf, Heart, Users, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ImpactMetricsProps {
  focus?: "environmental" | "csr" | "all";
  showCharts?: boolean;
}

export function ImpactMetrics({ focus = "all", showCharts = true }: ImpactMetricsProps) {
  const totalBeneficiaries = getTotalBeneficiaries();
  const completedProjects = CSR_PROJECTS.filter((p) => p.status === "completed").length;
  const ongoingProjects = CSR_PROJECTS.filter((p) => p.status === "ongoing").length;

  // Color scheme for environmental metrics
  const COLORS = ["#FDB714", "#003B5C", "#0D9488", "#F97316", "#10B981", "#3B82F6"];

  return (
    <section className="py-16">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">
            {focus === "environmental" && "Environmental Impact"}
            {focus === "csr" && "Community Impact"}
            {focus === "all" && "Our Sustainability Impact"}
          </h2>
          <p className="text-gray-600">
            Measurable progress towards a more sustainable and equitable future
          </p>
        </div>

        {/* CSR Overview Metrics */}
        {(focus === "csr" || focus === "all") && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Beneficiaries
                </CardTitle>
                <Users className="h-5 w-5 text-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy">{totalBeneficiaries.toLocaleString()}+</div>
                <p className="text-xs text-gray-500 mt-1">People impacted by our CSR programs</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Completed Projects
                </CardTitle>
                <Award className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy">{completedProjects}</div>
                <p className="text-xs text-gray-500 mt-1">Successfully delivered initiatives</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Ongoing Projects
                </CardTitle>
                <Heart className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy">{ongoingProjects}</div>
                <p className="text-xs text-gray-500 mt-1">Active community programs</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Countries Served
                </CardTitle>
                <Leaf className="h-5 w-5 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy">5</div>
                <p className="text-xs text-gray-500 mt-1">Ghana, Côte d&apos;Ivoire, Mali, Burkina Faso, Canada</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Environmental Metrics Grid */}
        {(focus === "environmental" || focus === "all") && (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-navy mb-6">Environmental Performance</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ENVIRONMENTAL_METRICS.map((metric, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold text-gray-700">
                        {metric.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-navy">{metric.value}</span>
                          <span className="text-lg text-gray-600">{metric.unit}</span>
                        </div>
                        {metric.change !== undefined && (
                          <div className="flex items-center gap-2">
                            {metric.change > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                metric.change > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {metric.change > 0 ? "+" : ""}
                              {metric.change}% vs 2023
                            </span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500">Year: {metric.year}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Environmental Chart */}
            {showCharts && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-navy">
                    Environmental Performance Overview (2024)
                  </CardTitle>
                  <p className="text-sm text-gray-600">Key environmental metrics across operations</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={ENVIRONMENTAL_METRICS}
                      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="category"
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        interval={0}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis label={{ value: "Performance (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Performance" radius={[8, 8, 0, 0]}>
                        {ENVIRONMENTAL_METRICS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Impact Statement */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Commitment to Sustainable Operations</h3>
            <p className="text-lg text-teal-100">
              We integrate environmental stewardship and social responsibility into everything we do,
              ensuring our operations create lasting positive impact for communities and the planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
