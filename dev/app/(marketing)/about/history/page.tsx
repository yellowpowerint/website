import type { Metadata } from "next";
import { Timeline } from "@/components/sections/Timeline";
import { COMPANY_INFO } from "@/lib/constants/company";

export const metadata: Metadata = {
  title: "Company History | Yellow Power International",
  description: `Explore Yellow Power International's journey from our founding in ${COMPANY_INFO.founded} to becoming a leading mining services provider.`,
};

const milestones = [
  {
    year: 2017,
    title: "Company Founded",
    description: `${COMPANY_INFO.founder} establishes Yellow Power International in ${COMPANY_INFO.location}, with a vision to revolutionize mining support services in Africa.`,
  },
  {
    year: 2018,
    title: "First Major Contract",
    description: "Secured our first major drilling contract with a leading mining company, establishing credibility in the industry.",
  },
  {
    year: 2019,
    title: "Fleet Expansion",
    description: "Invested in state-of-the-art drilling equipment and expanded our load and haul fleet to meet growing demand.",
  },
  {
    year: 2020,
    title: "Regional Expansion",
    description: "Extended operations to our second African country, demonstrating our capability to deliver excellence across borders.",
  },
  {
    year: 2021,
    title: "Team Growth",
    description: "Expanded workforce to over 200 employees, implementing comprehensive training and safety programs.",
  },
  {
    year: 2022,
    title: "Third Country Operations",
    description: "Established presence in our third African country, solidifying our position as a regional leader.",
  },
  {
    year: 2023,
    title: "Technology Leadership",
    description: "Deployed GPS-guided drilling systems and real-time monitoring across all operations.",
  },
  {
    year: 2024,
    title: "Safety Excellence Award",
    description: "Recognized for outstanding safety record and commitment to zero-accident operations.",
  },
  {
    year: 2025,
    title: "Continued Growth",
    description: "Operating at full capacity across all locations with a team of 201-500 professionals delivering exceptional results.",
  },
];

export default function HistoryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#003087' }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Company History
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Our journey from startup to industry leader
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Since our founding in {COMPANY_INFO.founded}, Yellow Power International has grown from a 
            single-location operation to a multi-country organization serving the mining industry 
            across {COMPANY_INFO.offices} African nations. Our journey is marked by strategic investments in 
            people, equipment, and technology, always guided by our commitment to safety and excellence.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl">
          <Timeline items={milestones} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-gold mb-2">{COMPANY_INFO.founded}</div>
              <div className="text-sm text-gray-300">Year Founded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">{COMPANY_INFO.offices}</div>
              <div className="text-sm text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">{COMPANY_INFO.employees}</div>
              <div className="text-sm text-gray-300">Employees</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">8+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
