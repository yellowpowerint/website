import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Yellow Power International",
  description: "Understand the terms and conditions for using the Yellow Power International website and services.",
};

export default function TermsOfServicePage() {
  return (
    <main>
      <section className="py-16 text-white" style={{ backgroundColor: "#003087" }}>
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your use of the Yellow Power International
            (&quot;Yellow Power&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) website and any content, information, or
            services made available through it. By accessing or using this site, you agree to be
            bound by these Terms.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container max-w-4xl mx-auto space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">1. Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does not
              infringe the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the
              site. You must not attempt to gain unauthorised access to any part of the website, our
              systems, or any networks connected to our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">2. Information and Services</h2>
            <p>
              The content on this website is provided for general information purposes related to our
              mining support and related services. While we strive to keep information accurate and
              up to date, we do not warrant that the content is complete, reliable, or free from
              errors. Any reliance you place on such information is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">3. Intellectual Property</h2>
            <p>
              Unless otherwise stated, all content on this website, including text, graphics, logos,
              images, and layout, is owned or licensed by Yellow Power and is protected by
              applicable intellectual property laws. You may not reproduce, distribute, or use any
              part of the site for commercial purposes without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">4. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or resources. These links are
              provided for your convenience only, and we are not responsible for the content,
              accuracy, or practices of any third-party sites. Accessing third-party websites is at
              your own discretion and subject to their terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Yellow Power shall not be liable for any
              direct, indirect, incidental, consequential, or special damages arising out of or in
              connection with your use of, or inability to use, this website or its content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">6. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time to reflect changes in our practices or
              applicable laws. Any changes will be posted on this page with an updated &quot;Last
              updated&quot; date. Your continued use of the website following any changes constitutes
              your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">7. Contact</h2>
            <p>
              If you have any questions about these Terms or our website, please contact us using
              the details provided on our Contact page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
