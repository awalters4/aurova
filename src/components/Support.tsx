import React from "react";
import WWSFooter from "./WWSFooter";

const Support: React.FC = () => {
  return (
    <div className="bg-[#FFF7F8] text-gray-900 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        <div className="bg-white p-10 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-rose-500 mb-4">Aurova Support</h1>
          <p className="text-gray-700 leading-relaxed mb-8">Welcome to Aurova Support! We're here to help you transform your daily habits into lasting change.</p>

          <div className="bg-[#FFF7F8] p-6 rounded-xl my-6 border-l-4 border-rose-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">📧 Contact Us</h3>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:support@aurovabyaw.com" className="text-rose-500 hover:underline">support@aurovabyaw.com</a></p>
            <p className="text-gray-700 mb-2"><strong>Website:</strong> <a href="https://www.aurovabyaw.com" className="text-rose-500 hover:underline">https://www.aurovabyaw.com</a></p>
            <p className="text-gray-700">We typically respond within 24 hours on business days.</p>
          </div>

          <h2 className="text-3xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-6 mt-10">Frequently Asked Questions</h2>

          <div className="space-y-5">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do I log in to Aurova?</p>
              <p className="text-gray-700">A: Aurova uses passwordless email authentication. Simply enter your email, tap "Send Code", and check your email for a 6-digit verification code. Enter the code to log in.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do I enable Face ID / Touch ID?</p>
              <p className="text-gray-700">A: After your first login, you'll be prompted to enable biometric authentication. You can also enable it from the checkbox on the login screen.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do I add a new habit?</p>
              <p className="text-gray-700">A: Tap the "+" button on the home screen, enter your habit name, choose an emoji, and tap "Add Habit".</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: What do the flames mean?</p>
              <p className="text-gray-700">A: Flames 🔥 indicate you're on a streak! When you complete a habit for 2 or more consecutive days, you'll see flames to celebrate your consistency.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do I track my progress with photos?</p>
              <p className="text-gray-700">A: Tap on any day to open the daily view, then use the camera icon to take or upload progress photos.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: Can I share my progress?</p>
              <p className="text-gray-700">A: Yes! On the dashboard, tap the "📸 Share This Week" button to capture and share a screenshot of your progress grid.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do I add friends?</p>
              <p className="text-gray-700">A: Tap the Friends icon in the navigation bar, then use the "+" button to add friends. You can invite them by email or share an invite link.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do I delete my account?</p>
              <p className="text-gray-700">A: Go to Settings (gear icon) → Account Settings → Delete Account. This action is permanent and cannot be undone.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: I'm not receiving login codes. What should I do?</p>
              <p className="text-gray-700">A: Check your spam folder. If you still don't see it, wait 60 seconds before requesting a new code to avoid rate limiting. Make sure you entered the correct email address.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: Can I change my challenge length?</p>
              <p className="text-gray-700">A: Yes! Tap the gear icon in the top navigation to access Settings, where you can adjust your challenge start date and total days (e.g., 30, 75, 90 days).</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: How do push notifications work?</p>
              <p className="text-gray-700">A: You can set daily reminders for each habit. Go to Settings → Notifications to customize when you want to be reminded.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-bold text-rose-500 mb-2">Q: Is my data private?</p>
              <p className="text-gray-700">A: Yes! Your data is encrypted and stored securely. We never sell your information. Read our <a href="/privacy" className="text-rose-500 hover:underline">Privacy Policy</a> for details.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-6 mt-10">Troubleshooting</h2>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">App Crashes or Freezes</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Force close the app and reopen it</li>
              <li>Restart your device</li>
              <li>Check for app updates in the App Store / Google Play</li>
              <li>Contact support if the issue persists</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Syncing Issues</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Make sure you have an active internet connection</li>
              <li>Pull down on the screen to refresh</li>
              <li>Log out and log back in</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Notifications Not Working</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Check that notifications are enabled in your device settings</li>
              <li>Make sure "Do Not Disturb" is off</li>
              <li>Verify notification times are set in Aurova Settings</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-6 mt-10">Feature Requests</h2>
          <p className="text-gray-700 leading-relaxed mb-6">Have an idea to make Aurova better? We'd love to hear it! Email us at <a href="mailto:support@aurovabyaw.com" className="text-rose-500 hover:underline">support@aurovabyaw.com</a> with your suggestions.</p>

          <h2 className="text-3xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-6">Report a Bug</h2>
          <p className="text-gray-700 mb-3">Found a bug? Please email us at <a href="mailto:support@aurovabyaw.com" className="text-rose-500 hover:underline">support@aurovabyaw.com</a> with:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
            <li>A description of the issue</li>
            <li>Steps to reproduce it</li>
            <li>Your device type (iPhone, Android, etc.)</li>
            <li>App version (found in Settings)</li>
            <li>Screenshots if applicable</li>
          </ul>

          <h2 className="text-3xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-6">Privacy & Security</h2>
          <p className="text-gray-700 leading-relaxed mb-6">Your privacy is important to us. Review our <a href="/privacy" className="text-rose-500 hover:underline">Privacy Policy</a> to learn how we protect your data.</p>

          <h2 className="text-3xl font-bold text-rose-500 border-b-2 border-rose-500 pb-2 mb-6">Terms of Service</h2>
          <p className="text-gray-700 leading-relaxed mb-6">By using Aurova, you agree to our <a href="/terms" className="text-rose-500 hover:underline">Terms of Service</a>. Contact us for more information.</p>

          <div className="mt-10 p-6 bg-[#FFF7F8] rounded-xl text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h3>
            <p className="text-gray-700 mb-2">We're here for you! Reach out to us at:</p>
            <p className="text-lg font-bold"><a href="mailto:support@aurovabyaw.com" className="text-rose-500 hover:underline">support@aurovabyaw.com</a></p>
          </div>
        </div>
      </div>

      <WWSFooter />
    </div>
  );
};

export default Support;
