"use client";
export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
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
            Welcome to RentalRooms! These Terms and Conditions ("Terms") govern
            your use of our website and services. By accessing or using
            RentalRooms, you agree to be bound by these Terms. If you do not
            agree, please do not use our platform.
          </p>
        </section>

        {/* Definitions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Definitions
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>"Platform"</strong> refers to the RentalRooms website and
              mobile applications
            </li>
            <li>
              <strong>"User"</strong> refers to anyone who accesses or uses our
              Platform
            </li>
            <li>
              <strong>"Host"</strong> refers to property owners who list rooms
              on our Platform
            </li>
            <li>
              <strong>"Guest"</strong> refers to users who book accommodations
              through our Platform
            </li>
            <li>
              <strong>"Listing"</strong> refers to a property or room advertised
              on our Platform
            </li>
          </ul>
        </section>

        {/* Eligibility */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Eligibility
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>You must be at least 18 years old to use our services</li>
            <li>You must provide accurate and complete information</li>
            <li>You must not have been previously banned from our Platform</li>
            <li>You must comply with all applicable laws and regulations</li>
          </ul>
        </section>

        {/* User Accounts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. User Accounts
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Account Registration
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials
                </li>
                <li>
                  You must notify us immediately of any unauthorized access
                </li>
                <li>
                  You are responsible for all activities under your account
                </li>
                <li>One person or entity may maintain only one account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Account Termination
              </h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account if you
                violate these Terms, engage in fraudulent activities, or for any
                other reason at our discretion.
              </p>
            </div>
          </div>
        </section>

        {/* For Hosts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. For Hosts (Property Owners)
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Listing Requirements
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>You must have legal authority to list the property</li>
                <li>
                  All information must be accurate, complete, and up-to-date
                </li>
                <li>Photos must accurately represent the property</li>
                <li>You must comply with all local laws and regulations</li>
                <li>
                  You must disclose any safety hazards or property limitations
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Host Responsibilities
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Respond to inquiries and booking requests promptly</li>
                <li>
                  Honor confirmed bookings unless exceptional circumstances
                  exist
                </li>
                <li>Maintain the property in good condition</li>
                <li>Provide accurate availability information</li>
                <li>Comply with anti-discrimination laws</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Pricing and Fees
              </h3>
              <p className="text-gray-700 mb-2">
                Hosts set their own prices. RentalRooms may charge a service fee
                for each booking:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>
                  Host service fee: Typically 3-5% of the booking subtotal
                </li>
                <li>Fees are deducted from your payout</li>
                <li>Taxes may apply based on your location</li>
              </ul>
            </div>
          </div>
        </section>

        {/* For Guests */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. For Guests (Renters)
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Booking and Payment
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>All bookings are subject to Host approval</li>
                <li>Payment is processed through our secure payment system</li>
                <li>You must pay the full amount at the time of booking</li>
                <li>
                  Guest service fee: Typically 10-15% of the booking subtotal
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Guest Responsibilities
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Treat the property with respect and care</li>
                <li>Follow all house rules set by the Host</li>
                <li>Leave the property in the same condition you found it</li>
                <li>Report any damages or issues immediately</li>
                <li>Do not exceed the maximum occupancy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Cancellation and Refund Policy
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">
                Flexible Cancellation
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Full refund if cancelled 24 hours before check-in</li>
                <li>• 50% refund if cancelled within 24 hours</li>
                <li>• No refund after check-in</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">
                Moderate Cancellation
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Full refund if cancelled 5 days before check-in</li>
                <li>• 50% refund if cancelled within 5 days</li>
                <li>• No refund after check-in</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">
                Strict Cancellation
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Full refund if cancelled 14 days before check-in</li>
                <li>• 50% refund if cancelled 7-14 days before</li>
                <li>• No refund within 7 days of check-in</li>
              </ul>
            </div>

            <p className="text-gray-700 mt-4">
              <strong>Note:</strong> Service fees are non-refundable except in
              cases of Host cancellation or property misrepresentation.
            </p>
          </div>
        </section>

        {/* Prohibited Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Prohibited Activities
          </h2>
          <p className="text-gray-700 mb-3">You may not:</p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Post false, misleading, or fraudulent content</li>
            <li>Harass, threaten, or discriminate against others</li>
            <li>Use the Platform for commercial solicitation</li>
            <li>Attempt to circumvent our fee structure</li>
            <li>Scrape or copy content from the Platform</li>
            <li>Interfere with the Platform's operation</li>
            <li>Create multiple accounts to manipulate reviews or ratings</li>
          </ul>
        </section>

        {/* Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Limitation of Liability
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-3">
              RentalRooms acts as an intermediary platform connecting Hosts and
              Guests. We are not responsible for:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>The condition, safety, or legality of listed properties</li>
              <li>The accuracy of listings or user-provided information</li>
              <li>The conduct of Hosts or Guests</li>
              <li>Property damage, injury, or loss during stays</li>
              <li>Disputes between Hosts and Guests</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY SHALL
              NOT EXCEED THE AMOUNT YOU PAID FOR THE BOOKING IN QUESTION.
            </p>
          </div>
        </section>

        {/* Indemnification */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify and hold harmless RentalRooms, its officers,
            directors, employees, and agents from any claims, damages, losses,
            liabilities, and expenses arising from your use of the Platform,
            violation of these Terms, or infringement of any rights of another
            party.
          </p>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            10. Dispute Resolution
          </h2>
          <div className="space-y-3">
            <p className="text-gray-700">
              In the event of a dispute between users, we encourage direct
              communication. If unable to resolve:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Contact our support team for mediation assistance</li>
              <li>Disputes will be resolved through binding arbitration</li>
              <li>Governing law: Laws of India</li>
              <li>Jurisdiction: Courts of Bangalore, India</li>
            </ul>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            11. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            All content on the Platform, including logos, text, graphics, and
            software, is owned by RentalRooms or licensed to us. You may not:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Use our trademarks or branding</li>
            <li>Reverse engineer any aspect of the Platform</li>
          </ul>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            12. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will
            notify users of significant changes via email or Platform
            notification. Continued use after changes constitutes acceptance of
            the updated Terms.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            13. Contact Information
          </h2>
          <p className="text-gray-700 mb-3">
            For questions about these Terms, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> legal@rentalrooms.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +91 9876543210
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Tech Park, Bangalore, India
            </p>
          </div>
        </section>

        {/* Acceptance */}
        <div className="bg-blue-50 border-2 border-blue-500 p-6 rounded-lg mb-8">
          <p className="text-gray-800 font-semibold text-center">
            By using RentalRooms, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.history.back()}
            className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
