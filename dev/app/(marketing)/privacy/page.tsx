import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Yellow Power International",
  description: "Learn how Yellow Power International collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="py-16 text-white" style={{ backgroundColor: "#003087" }}>
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Yellow Power International (&quot;Yellow Power&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting
            your privacy and handling your personal information responsibly. This Privacy Policy explains
            how we collect, use, and safeguard information when you visit our website or interact with us
            online.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container max-w-4xl mx-auto space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              We may collect information that you voluntarily provide to us, such as your name, email
              address, phone number, company, and any other details you share when you:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Submit a contact or enquiry form</li>
              <li>Subscribe to our newsletter or updates</li>
              <li>Request information about our services or partnerships</li>
            </ul>
            <p className="mt-3">
              We may also collect limited technical information automatically, such as your IP address,
              browser type, device information, and pages visited, to help us understand how our website
              is used and to improve performance and security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Respond to your enquiries and provide customer support</li>
              <li>Manage partnerships, projects, and service requests</li>
              <li>Send you newsletters or updates that you have opted in to receive</li>
              <li>Improve our website, services, and user experience</li>
              <li>Maintain the security and integrity of our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">3. Legal Basis and Retention</h2>
            <p>
              We process personal information based on our legitimate business interests, your consent
              (where required), and our contractual or legal obligations. We retain personal information
              only for as long as necessary to fulfil the purposes described in this Policy or to comply
              with applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share information with trusted service
              providers who assist us in operating our website, managing communications, or delivering
              services, provided they agree to keep your information confidential and use it only for the
              purposes we specify. We may also share information where required by law or to protect our
              rights, safety, or property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">5. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have rights to access, correct, or delete your personal
              information, or to object to or restrict certain types of processing. You can also withdraw
              your consent to marketing communications at any time by using the unsubscribe link in our
              emails or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your personal
              information, please contact us using the details provided on our Contact page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-3">7. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              applicable laws. The updated version will be indicated by a revised &quot;Last updated&quot; date on
              this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
