import { StatCounter } from "@/components/ui/StatCounter";
import { COMPANY_INFO } from "@/lib/constants/company";

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-navy text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatCounter
            value={COMPANY_INFO.employees}
            label="Skilled Employees"
          />
          <StatCounter
            value={COMPANY_INFO.founded}
            label="Established"
          />
          <StatCounter
            value={COMPANY_INFO.offices}
            label="African Countries"
          />
          <StatCounter
            value="100+"
            label="Projects Completed"
            suffix="+"
          />
        </div>
      </div>
    </section>
  );
}
