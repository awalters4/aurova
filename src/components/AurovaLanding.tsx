import React, { useState, useEffect } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";
import WWSFooter from "./WWSFooter";
import aurovaLogo from "../assets/aurova-logo.svg";
import screenshot1 from "../assets/screenshot1.jpg";
import screenshot2 from "../assets/screenshot2.jpg";
import screenshot3 from "../assets/screenshot3.PNG";
import screenshot4 from "../assets/screenshot4.PNG";
import screenshot5 from "../assets/screenshot5.PNG";
import screenshot6 from "../assets/screenshot6.PNG";
import screenshot7 from "../assets/screenshot7.PNG";
import screenshot8 from "../assets/screenshot8.jpg";

const AurovaLanding: React.FC = () => {
  const [state, handleSubmit] = useForm("xpqawboe");
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [issueType, setIssueType] = useState("general");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // App screenshots
  const screenshots = [
    { id: 1, src: screenshot1, alt: "Aurova Dashboard" },
    { id: 2, src: screenshot2, alt: "Aurova Habit Tracking" },
    { id: 3, src: screenshot3, alt: "Aurova Streak View" },
    { id: 4, src: screenshot4, alt: "Aurova Daily Check-in" },
    { id: 5, src: screenshot5, alt: "Aurova Progress Calendar" },
    { id: 6, src: screenshot6, alt: "Aurova Analytics" },
    { id: 7, src: screenshot7, alt: "Aurova Settings" },
    { id: 8, src: screenshot8, alt: "Aurova Profile" },
  ];

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <div className="font-body bg-bgWarm text-textDark min-h-screen">
      {/* Launch Banner */}
      <div className="bg-gradient-pink-purple text-white text-center py-4 font-semibold sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-center gap-3 flex-wrap px-4">
          <span className="text-lg md:text-xl">🚀 Now Available!</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-pink-light/30 px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <img
                src={aurovaLogo}
                alt="Aurova App"
                className="mx-auto md:mx-0 mb-6 rounded-3xl w-40 md:w-48 shadow-2xl animate-float"
              />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight text-white">
                Build better habits, one day at a time 💪
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                The most intuitive habit tracker that helps you build lasting positive habits through visual progress tracking, streak celebrations, and personalized reminders.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
                <a
                  href="https://apps.apple.com/us/app/aurova/id6756036236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 hover:scale-105 transition-all font-semibold text-sm"
                >
                  <FaApple size={20} />
                  App Store
                </a>
                <div className="relative">
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 bg-gray-400 text-gray-200 px-6 py-3 rounded-lg shadow cursor-not-allowed font-semibold text-sm opacity-60"
                  >
                    <FaGooglePlay size={16} />
                    Google Play
                  </button>
                  <span className="absolute -top-2 -right-2 bg-white text-purple text-xs font-bold px-2 py-1 rounded-full shadow">
                    Soon
                  </span>
                </div>
              </div>

            </div>

            {/* Screenshot Carousel */}
            <div className="md:w-1/2">
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-pink-light/30">
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-4">
                    {screenshots.map((screenshot) => (
                      <div
                        key={screenshot.id}
                        className="flex-shrink-0 w-64 aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden shadow-lg"
                      >
                        <img
                          src={screenshot.src}
                          alt={screenshot.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Link - Full Width Centered */}
          <div className="mt-12 text-center">
            <a
              href="https://www.wellwaltstudios.com/behind-the-build/why-i-built-aurova"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-purple bg-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-lg border-2 border-purple/20"
            >
              <span className="text-2xl">📖</span>
              Why I Built Aurova
            </a>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
            Build habits that last
          </h2>
          <p className="text-xl text-textGray leading-relaxed">
            Aurova is designed to help you monitor habits, mood, and personal challenges with a clean, intuitive interface.
            Track your daily check-ins, celebrate milestones, and visualize your progress over time — all while staying motivated
            with streak tracking and personalized reminders.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center bg-gradient-pink-gold bg-clip-text text-transparent">
          Features You'll Love
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Habit Tracking */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Habit Tracking
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Create unlimited habits with custom emoji support. Check in daily and watch your progress grow with visual calendars and completion stats.
            </p>
          </div>

          {/* Streak System */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Streak Celebrations
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Stay motivated with automatic streak tracking, milestone celebrations, and visual progress indicators. Hit 7, 30, 100+ days and celebrate your wins!
            </p>
          </div>

          {/* Social Features */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Social Features
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Share your progress and connect with friends. Build accountability and celebrate wins together.
            </p>
          </div>

          {/* Integrations */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Integrations
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Connect with Apple Health, Google Fit, and more to sync your fitness and wellness data seamlessly.
            </p>
          </div>

          {/* Smart Reminders */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Smart Reminders
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Set custom reminder times for each habit. Get gentle nudges when it's time to check in, helping you stay consistent without feeling overwhelmed.
            </p>
          </div>

          {/* Daily Reflections */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Daily Notes
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Capture thoughts, reflections, and wins with daily notes. Look back on your journey and see how far you've come.
            </p>
          </div>

          {/* Custom Themes */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🌈</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Custom Themes
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Personalize your experience with custom color themes and visual styles that match your vibe.
            </p>
          </div>

          {/* Wearable Support */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">⌚</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Wearable Support
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Track habits on the go with Apple Watch and Wear OS apps, bringing your habits to your wrist.
            </p>
          </div>

          {/* Advanced Analytics */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Advanced Analytics
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Get deep insights into your habit patterns with detailed analytics, completion trends, and progress reports.
            </p>
          </div>

          {/* Achievement Badges */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Achievement Badges
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Earn badges and celebrate milestones as you complete challenges and build consistent habits.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-secondary to-pink-light/30 p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-white">
              We'd Love to Hear From You
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Have comments, concerns, suggestions for features or integrations? Leave it here and we'll get back to you.
            </p>
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="bg-white text-purple px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold text-lg"
            >
              Share Feedback
            </button>
          </div>
        </div>
      </section>

      {/* Legal Links */}
      <div className="px-8 py-6 bg-bgWarm text-center">
        <div className="flex gap-6 justify-center text-sm text-textGray flex-wrap">
          <a href="/privacy" className="hover:text-purple transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-purple transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="/feedback" className="hover:text-purple transition-colors">Feedback</a>
          <span>•</span>
          <a href="/support" className="hover:text-purple transition-colors">Support</a>
        </div>
      </div>

      <WWSFooter />

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
            >
              ✕
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-heading font-bold text-purple mb-2">Feedback & Support</h2>
              <p className="text-gray-600 mb-6">
                Help us make Aurova better! Share your issues, suggestions, or integration ideas.
              </p>

              {!state.succeeded ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report / Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="integration">Integration Idea</option>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="Your name"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  {/* Account Email */}
                  <div>
                    <label htmlFor="account" className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Email <span className="text-purple">*</span>
                    </label>
                    <input
                      id="account"
                      type="email"
                      name="account"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="Email you used to sign up"
                    />
                    <ValidationError prefix="Account" field="account" errors={state.errors} />
                  </div>

                  {/* Subject/Title */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-purple">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
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
                      <span className="text-purple">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent resize-y"
                      placeholder={
                        issueType === "bug"
                          ? "Please describe the issue in detail..."
                          : issueType === "integration"
                          ? "Tell us about the integration you'd like to see..."
                          : "Share your thoughts, suggestions, or ideas..."
                      }
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
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
                      className="w-full bg-gradient-pink-purple text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state.submitting ? "Sending..." : "Submit Feedback"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-purple mb-4">Thank You!</h3>
                  <p className="text-xl text-gray-700 mb-6">
                    We've received your feedback and appreciate you taking the time to help us improve Aurova.
                  </p>
                  <button
                    onClick={() => {
                      setIsFeedbackModalOpen(false);
                      window.location.reload();
                    }}
                    className="bg-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple/90 transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AurovaLanding;
