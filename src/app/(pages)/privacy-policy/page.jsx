"use client";
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At RentalRooms, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you use our platform.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Information We Collect
          </h2>

          <div className="ml-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Personal Information
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Profile picture and user preferences</li>
                <li>
                  Payment information (processed securely through third-party
                  providers)
                </li>
                <li>Government-issued ID for verification (if applicable)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Property Information
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Property details, photos, and descriptions</li>
                <li>Location and pricing information</li>
                <li>Availability and booking details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Usage Information
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>IP address, browser type, and device information</li>
                <li>Pages visited and features used</li>
                <li>Search queries and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To process bookings and transactions</li>
            <li>
              To communicate with you about bookings, updates, and promotions
            </li>
            <li>To verify user identities and prevent fraud</li>
            <li>To improve our platform and user experience</li>
            <li>To comply with legal obligations</li>
            <li>To send you marketing communications (with your consent)</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-700 mb-3">
            We may share your information with:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Property Owners/Tenants:</strong> To facilitate bookings
              and communication
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party companies that
              help us operate our platform (payment processors, hosting
              services, analytics)
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to
              protect our rights
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with mergers,
              acquisitions, or asset sales
            </li>
          </ul>
          <p className="text-gray-700 mt-3">
            <strong>
              We do not sell your personal information to third parties.
            </strong>
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction. However, no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Your Rights and Choices
          </h2>
          <p className="text-gray-700 mb-3">You have the right to:</p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
            <li>Object to certain processing activities</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="text-gray-700 mt-3">
            To exercise these rights, contact us at{" "}
            <strong>privacy@rentalrooms.com</strong>
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use cookies and similar technologies to enhance your experience,
            analyze usage, and deliver personalized content. You can control
            cookies through your browser settings.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Types of cookies we use:</strong> Essential, Functional,
              Analytics, and Marketing cookies.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not intended for individuals under 18 years of age.
            We do not knowingly collect personal information from children. If
            you believe we have collected information from a child, please
            contact us immediately.
          </p>
        </section>

        {/* International Transfers */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. International Data Transfers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            to protect your data in accordance with applicable laws.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes by posting the new policy on this page
            and updating the "Last Updated" date. Your continued use of our
            services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            10. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you have questions or concerns about this Privacy Policy, please
            contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> privacy@rentalrooms.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +91 9876543210
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Tech Park, Bangalore, India
            </p>
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
