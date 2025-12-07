import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import WWSFooter from "./WWSFooter";

const Feedback: React.FC = () => {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID"); // Replace with your Formspree form ID
  const [issueType, setIssueType] = useState("bug");

  if (state.succeeded) {
    return (
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto px-6 py-12 flex-grow flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold text-rose-500 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-700 mb-8">
              We've received your feedback and appreciate you taking the time to help us improve Aurova.
            </p>
            <a
              href="/"
              className="inline-block bg-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
        <WWSFooter />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-rose-500 mb-2">Feedback & Support</h1>
        <p className="text-gray-600 mb-8">
          Help us make Aurova better! Share your issues, suggestions, or integration ideas.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Type Selection */}
          <div>
            <label htmlFor="issue-type" className="block text-sm font-semibold text-gray-700 mb-2">
              What type of feedback are you providing?
            </label>
            <select
              id="issue-type"
              name="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="bug">Bug Report / Issue</option>
              <option value="feature">Feature Request</option>
              <option value="integration">Integration Idea</option>
              <option value="general">General Feedback</option>
            </select>
            <ValidationError prefix="Issue Type" field="issueType" errors={state.errors} />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Your name"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          {/* Account Email/Phone */}
          <div>
            <label htmlFor="account" className="block text-sm font-semibold text-gray-700 mb-2">
              Account Email or Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              id="account"
              type="text"
              name="account"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Email or phone number you used to sign up"
            />
            <ValidationError prefix="Account" field="account" errors={state.errors} />
            <p className="text-sm text-gray-500 mt-1">
              Please use the same email or phone number you registered with
            </p>
          </div>

          {/* Subject/Title */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder={
                issueType === "bug"
                  ? "Brief description of the issue"
                  : issueType === "integration"
                  ? "Integration you'd like to see"
                  : "Brief summary of your feedback"
              }
            />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} />
          </div>

          {/* Message/Details */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              {issueType === "bug" ? "Issue Details" : "Comments & Suggestions"}{" "}
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-y"
              placeholder={
                issueType === "bug"
                  ? "Please describe the issue in detail. Include:\n• What you were trying to do\n• What happened instead\n• Device/OS version (if relevant)\n• Steps to reproduce"
                  : issueType === "integration"
                  ? "Tell us about the integration or third-party app you'd like to see connected to Aurova. How would this help your habit tracking?"
                  : "Share your thoughts, suggestions, or ideas for future updates. We'd love to hear from you!"
              }
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
            <p className="text-sm text-gray-500 mt-2">
              {issueType === "bug"
                ? "The more details you provide, the faster we can fix the issue."
                : issueType === "integration"
                ? "Examples: Notion, Todoist, Whoop, Oura Ring, etc."
                : "Your feedback helps us build a better Aurova."}
            </p>
          </div>

          {/* Device/Platform Info (for bugs) */}
          {issueType === "bug" && (
            <div>
              <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 mb-2">
                Platform/Device (Optional)
              </label>
              <input
                id="platform"
                type="text"
                name="platform"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="e.g., iPhone 14 Pro, iOS 17.2"
              />
              <ValidationError prefix="Platform" field="platform" errors={state.errors} />
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-rose-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Submit Feedback"}
            </button>
          </div>

          {/* Error Message */}
          {state.errors && state.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">
                Oops! Something went wrong. Please try again.
              </p>
            </div>
          )}
        </form>

        {/* Additional Help Section */}
        <div className="mt-12 p-6 bg-rose-50 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Need immediate help?</h2>
          <p className="text-gray-700 mb-4">
            For urgent issues or direct support, you can also reach us at:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:ariel@wellwaltstudios.com" className="text-rose-500 hover:underline">
                ariel@wellwaltstudios.com
              </a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a
                href="https://www.wellwaltstudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-500 hover:underline"
              >
                https://www.wellwaltstudios.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <WWSFooter />
    </div>
  );
};

export default Feedback;
