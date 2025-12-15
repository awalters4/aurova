import React from "react";
import WWSFooter from "./WWSFooter";

const Privacy: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-rose-500 mb-2">Privacy Policy for Aurova</h1>
        <p className="text-gray-600 italic mb-8"><strong>Last Updated:</strong> November 30, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">Aurova ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Personal Information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Account Information:</strong> Email address or phone number (for authentication)</li>
            <li><strong>Profile Data:</strong> Display name (optional), profile settings</li>
            <li><strong>Authentication Data:</strong> Encrypted session tokens stored locally on your device</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Habit Tracking Data</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Habit Information:</strong> Custom habit names, emojis, settings, and completion records</li>
            <li><strong>Progress Photos:</strong> Photos you choose to upload for progress tracking (optional)</li>
            <li><strong>Mood Data:</strong> Mood selections and daily reflections (optional)</li>
            <li><strong>Notes:</strong> Personal notes and reflections you create</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Social Features Data</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Friend Connections:</strong> Email addresses of friends you connect with</li>
            <li><strong>Messages:</strong> Direct messages and nudges sent to friends (140 character limit)</li>
            <li><strong>Shared Data:</strong> Progress data you choose to share with friends</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Automatically Collected Information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Device Information:</strong> Device type, operating system version</li>
            <li><strong>Usage Data:</strong> App features used, crash reports, error logs (via Sentry)</li>
            <li><strong>Notification Tokens:</strong> Push notification device tokens</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Health Data (Optional)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Apple Health/HealthKit:</strong> Workout data, steps, active energy (if you grant permission)</li>
            <li><strong>Google Fit:</strong> Activity data, step count, workout sessions (if you grant permission)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-3">We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Provide and maintain the Aurova app functionality</li>
            <li>Authenticate and secure your account with Face ID/Touch ID</li>
            <li>Track your habits and display progress</li>
            <li>Enable social features (friend connections, messages, nudges)</li>
            <li>Send push notifications for reminders and milestones</li>
            <li>Sync your data across your devices</li>
            <li>Analyze app usage to improve features</li>
            <li>Debug and fix technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Data Storage and Security</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Supabase Backend:</strong> Your data is stored on Supabase servers with industry-standard encryption</li>
            <li><strong>Local Storage:</strong> Session data and offline cache stored securely on your device</li>
            <li><strong>Biometric Authentication:</strong> Face ID/Touch ID data never leaves your device</li>
            <li><strong>Encryption:</strong> All data transmitted between your device and our servers uses HTTPS/TLS encryption</li>
            <li><strong>Secure Storage:</strong> Sensitive data on your device uses iOS Keychain/Android Keystore</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Data Sharing</h2>
          <p className="text-gray-700 mb-3">We do NOT sell your personal information. We only share data:</p>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">With Your Consent</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Friends:</strong> Progress data you explicitly choose to share with connected friends</li>
            <li><strong>Social Sharing:</strong> Photos/progress you choose to share on social media</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Service Providers</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Supabase:</strong> Database and authentication services</li>
            <li><strong>Expo:</strong> Push notifications and app updates</li>
            <li><strong>Sentry:</strong> Error tracking and crash reporting (anonymized)</li>
            <li><strong>Apple/Google:</strong> Push notification delivery</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">Legal Requirements</h3>
          <p className="text-gray-700 mb-3">We may disclose your information if required by law or to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Comply with legal processes</li>
            <li>Protect our rights and safety</li>
            <li>Prevent fraud or security issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Your Data Rights</h2>
          <p className="text-gray-700 mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Access:</strong> Request a copy of your data</li>
            <li><strong>Delete:</strong> Request deletion of your account and all associated data</li>
            <li><strong>Modify:</strong> Update or correct your personal information</li>
            <li><strong>Export:</strong> Download your habit tracking data</li>
            <li><strong>Opt-Out:</strong> Disable push notifications, social features, or health data integrations</li>
          </ul>
          <p className="text-gray-700 mt-3">To exercise these rights, contact us at <a href="mailto:support@aurovabyaw.com" className="text-rose-500 hover:underline">support@aurovabyaw.com</a></p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Data Retention</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Active Accounts:</strong> We retain your data while your account is active</li>
            <li><strong>Deleted Accounts:</strong> Data is permanently deleted within 30 days of account deletion</li>
            <li><strong>Backups:</strong> Backup copies are deleted within 90 days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">Aurova is not intended for children under 13. We do not knowingly collect data from children under 13. If we discover we have collected data from a child under 13, we will delete it immediately.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Third-Party Integrations</h2>
          <p className="text-gray-700 mb-3">When you connect third-party services (Strava, MyFitnessPal, Apple Health, etc.):</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>We only access data you explicitly authorize</li>
            <li>You can revoke access at any time in app settings</li>
            <li>Each service has its own privacy policy</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">International Data Transfers</h2>
          <p className="text-gray-700 leading-relaxed">Your data may be transferred to and stored on servers in different countries. By using Aurova, you consent to such transfers. We ensure appropriate safeguards are in place.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-3">We may update this Privacy Policy periodically. We will notify you of significant changes via:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>In-app notification</li>
            <li>Email to your registered address</li>
          </ul>
          <p className="text-gray-700 mt-3">Continued use after changes constitutes acceptance.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">California Privacy Rights (CCPA)</h2>
          <p className="text-gray-700 mb-3">California residents have additional rights:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of sale of personal information (we don't sell data)</li>
            <li>Right to non-discrimination for exercising privacy rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">GDPR Compliance (EU Users)</h2>
          <p className="text-gray-700 mb-3">EU residents have rights under GDPR:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Right to access, rectification, erasure</li>
            <li>Right to data portability</li>
            <li>Right to restrict processing</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-3">For privacy questions or requests:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Email:</strong> <a href="mailto:support@aurovabyaw.com" className="text-rose-500 hover:underline">support@aurovabyaw.com</a></li>
            <li><strong>Website:</strong> <a href="https://www.aurovabyaw.com" className="text-rose-500 hover:underline">https://www.aurovabyaw.com</a></li>
            <li><strong>Address:</strong> Well Walt Studios, Orleans Parish, Louisiana</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-4">Cookie Policy</h2>
          <p className="text-gray-700 leading-relaxed">Aurova does not use cookies. We use local storage for authentication and offline functionality only.</p>
        </section>

        <hr className="my-8 border-gray-300" />
        <p className="text-center text-gray-700 font-semibold">By using Aurova, you agree to this Privacy Policy.</p>
      </div>

      <WWSFooter />
    </div>
  );
};

export default Privacy;
