import React from "react";
import WWSFooter from "./WWSFooter";

const Terms: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-rose-500 mb-2">Terms of Service for Aurova</h1>
        <p className="text-gray-600 italic mb-8"><strong>Last Updated:</strong> November 30, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">By downloading, installing, or using Aurova ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the App.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">2. Description of Service</h2>
          <p className="text-gray-700 mb-3">Aurova is a mobile application for habit tracking, progress monitoring, and social accountability. Features include:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Daily habit tracking and check-ins</li>
            <li>Progress photos and measurements</li>
            <li>Mood tracking and reflections</li>
            <li>Friend connections and social features</li>
            <li>Push notifications and reminders</li>
            <li>Analytics and insights</li>
            <li>Optional integrations with third-party health and fitness apps</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">3. Account Registration</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">3.1 Account Creation</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You must provide a valid email address or phone number</li>
            <li>You must be at least 13 years old to use the App</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must not share your account credentials</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">3.2 Account Security</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Enable Face ID/Touch ID for enhanced security</li>
            <li>Notify us immediately of unauthorized access</li>
            <li>You are responsible for all activities under your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">4. User Conduct</h2>
          <p className="text-gray-700 mb-3">You agree NOT to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Upload illegal, harmful, or offensive content</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Impersonate others or provide false information</li>
            <li>Attempt to hack, disrupt, or damage the App</li>
            <li>Use the App for commercial purposes without permission</li>
            <li>Spam other users with unwanted messages</li>
            <li>Upload content that infringes on intellectual property rights</li>
            <li>Use automated tools or bots to access the App</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">5. User Content</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">5.1 Your Content</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You retain ownership of content you create (habits, photos, notes, messages)</li>
            <li>You grant us a license to store and display your content to provide the service</li>
            <li>You can delete your content at any time</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">5.2 Content Standards</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Do not upload sexually explicit, violent, or illegal content</li>
            <li>Progress photos must comply with App Store guidelines</li>
            <li>Messages to friends must be respectful and non-harassing</li>
            <li>We reserve the right to remove content that violates these Terms</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">5.3 Content Backup</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You are responsible for backing up your own content</li>
            <li>We are not liable for lost or deleted content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">6. Social Features</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">6.1 Friend Connections</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Friend requests must be sent to valid email addresses</li>
            <li>Both parties must consent to connect</li>
            <li>Either party can remove the connection at any time</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">6.2 Messaging and Nudges</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Messages are limited to 140 characters</li>
            <li>Use respectful and supportive language</li>
            <li>Harassment or abuse will result in account suspension</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">6.3 Sharing Progress</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You control what progress data to share with friends</li>
            <li>Shared data is visible only to connected friends</li>
            <li>You can revoke sharing permissions at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">7. Third-Party Integrations</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">7.1 Health Data</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Apple Health, Google Fit, and wearable integrations are optional</li>
            <li>You control what health data to share with Aurova</li>
            <li>Revoke access at any time through device settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">7.2 App Integrations</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Strava, MyFitnessPal, Goodreads, and other integrations require separate accounts</li>
            <li>Each service has its own Terms of Service and Privacy Policy</li>
            <li>We are not responsible for third-party service issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">8. Intellectual Property</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">8.1 Aurova Property</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The App, design, logo, and features are owned by Aurova</li>
            <li>You may not copy, modify, or distribute our intellectual property</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">8.2 Trademarks</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>"Aurova" and associated logos are our trademarks</li>
            <li>Unauthorized use is prohibited</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">9. Privacy and Data</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Our Privacy Policy explains how we collect and use data</li>
            <li>By using the App, you consent to our Privacy Policy</li>
            <li>Available at: <a href="/privacy" className="text-rose-500 hover:underline">Privacy Policy</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">10. Push Notifications</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You can opt-in to push notifications for reminders and milestones</li>
            <li>Disable notifications in device settings at any time</li>
            <li>Notification frequency depends on your habit settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">11. Disclaimers</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">11.1 No Medical Advice</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Aurova is NOT a medical device or health advisor</li>
            <li>Consult healthcare professionals for medical advice</li>
            <li>We do not guarantee health outcomes</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">11.2 No Warranties</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The App is provided "AS IS" without warranties</li>
            <li>We do not guarantee uninterrupted or error-free service</li>
            <li>Features may change or be discontinued</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">12. Limitation of Liability</h2>
          <p className="text-gray-700 mb-3">To the maximum extent permitted by law:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>We are not liable for indirect, incidental, or consequential damages</li>
            <li>Our total liability is limited to $100 or the amount you paid us</li>
            <li>We are not responsible for data loss, business interruption, or lost profits</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">13. Indemnification</h2>
          <p className="text-gray-700 mb-3">You agree to indemnify and hold us harmless from claims arising from:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Your violation of these Terms</li>
            <li>Your content or conduct</li>
            <li>Your violation of others' rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">14. Termination</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">14.1 By You</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Delete your account at any time in app settings</li>
            <li>Data will be deleted within 30 days</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">14.2 By Us</h3>
          <p className="text-gray-700 mb-3">We may suspend or terminate your account if you:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Violate these Terms</li>
            <li>Engage in fraudulent or illegal activities</li>
            <li>Harass or harm other users</li>
            <li>Repeatedly upload inappropriate content</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">14.3 Effect of Termination</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Your right to use the App ends immediately</li>
            <li>We may delete your data per our Privacy Policy</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">15. Changes to Terms</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>We may update these Terms periodically</li>
            <li>We will notify you of significant changes via app or email</li>
            <li>Continued use after changes constitutes acceptance</li>
            <li>You can review current Terms at any time in the App</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">16. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">16.1 Governing Law</h3>
          <p className="text-gray-700 leading-relaxed">These Terms are governed by the laws of Louisiana</p>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">16.2 Arbitration</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Disputes will be resolved through binding arbitration</li>
            <li>Class action lawsuits are waived</li>
            <li>Arbitration location: Orleans Parish, Louisiana</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">16.3 Exceptions</h3>
          <p className="text-gray-700 leading-relaxed">You may pursue small claims court or seek injunctive relief</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">17. Age Restrictions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You must be 13 or older to use Aurova</li>
            <li>Users under 18 should have parental consent</li>
            <li>We comply with COPPA (Children's Online Privacy Protection Act)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">18. Export Controls</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You agree to comply with export laws</li>
            <li>You will not use the App in embargoed countries</li>
            <li>You are not on any government restricted party list</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">19. Contact Information</h2>
          <p className="text-gray-700 mb-3">For questions about these Terms:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Email:</strong> <a href="mailto:ariel@wellwaltstudios.com" className="text-rose-500 hover:underline">ariel@wellwaltstudios.com</a></li>
            <li><strong>Website:</strong> <a href="https://www.wellwaltstudios.com" className="text-rose-500 hover:underline">https://www.wellwaltstudios.com</a></li>
            <li><strong>Address:</strong> Well Walt Studios, Orleans Parish, Louisiana</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">20. Apple and Google Requirements</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">20.1 App Store Terms</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You must comply with Apple's App Store Review Guidelines</li>
            <li>Apple is not responsible for the App or your use of it</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">20.2 Google Play Terms</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You must comply with Google Play's Developer Policy</li>
            <li>Google is not responsible for the App or your use of it</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">20.3 Third-Party Beneficiaries</h3>
          <p className="text-gray-700 leading-relaxed">Apple and Google are third-party beneficiaries of these Terms with respect to your use of the App</p>
        </section>

        <hr className="my-8 border-gray-300" />
        <p className="text-center text-gray-700 font-semibold mb-2">By using Aurova, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
        <p className="text-center text-gray-500 text-sm">For the latest version, visit: <a href="/terms" className="text-rose-500 hover:underline">Terms of Service</a></p>
      </div>

      <WWSFooter />
    </div>
  );
};

export default Terms;
