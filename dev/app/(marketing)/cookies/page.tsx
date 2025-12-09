import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Yellow Power International",
  description: "Find out how Yellow Power International uses cookies and similar technologies on this website.",
};

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="py-16 text-white" style={{ backgroundColor: "#003087" }}>
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            This Cookie Policy explains how Yellow Power International (&quot;Yellow Power&quot;, &quot;we&quot;, &quot;us&quot;,
            or &quot;our&quot;) uses cookies and similar technologies on our website to improve performance,
            enhance user experience, and understand how our digital channels are used.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container max-w-4xl mx-auto space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website.
              They allow the website to recognise your device and remember certain information about
              your visit, such as your preferences or previous actions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">2. Types of Cookies We Use</h2>
            <p className="mb-3">
              We may use the following types of cookies on this website:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold">Essential cookies:</span> Required for the website to
                function properly and to provide core features such as page navigation and security.
              </li>
              <li>
                <span className="font-semibold">Performance and analytics cookies:</span> Help us
                understand how visitors use our website so we can improve content, navigation, and
                user experience.
              </li>
              <li>
                <span className="font-semibold">Preference cookies:</span> Allow the website to
                remember your choices, such as language or region, where applicable.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">3. How We Use Cookies</h2>
            <p>
              We use cookies to ensure the website operates securely and efficiently, to monitor
              aggregate usage patterns, and to help us make informed improvements to our digital
              channels. We do not use cookies to collect sensitive personal information such as
              financial details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">4. Managing Cookies</h2>
            <p>
              Most web browsers allow you to manage cookies through their settings, including
              blocking or deleting cookies. If you choose to disable certain cookies, some features
              of the website may not function as intended.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">5. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in how we use
              cookies or due to legal or regulatory requirements. Any updates will be posted on this
              page with a revised &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">6. Contact</h2>
            <p>
              If you have any questions about our use of cookies, please contact us using the
              details provided on our Contact page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
