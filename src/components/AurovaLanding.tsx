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
  const [state, handleSubmit] = useForm("xdklvjnk"); // Using the same Formspree ID from business site
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Countdown timer
  useEffect(() => {
    const launchDate = new Date("2025-12-18T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
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

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (state.succeeded) {
      setEmail("");
    }
  };

  return (
    <div className="font-body bg-bgWarm text-textDark min-h-screen">
      {/* Countdown Banner */}
      <div className="bg-gradient-pink-purple text-white text-center py-4 font-semibold sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-center gap-8 flex-wrap px-4">
          <span className="text-lg md:text-xl">🚀 Launching Soon!</span>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{timeLeft.days}</div>
              <div className="text-xs uppercase">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs uppercase">Min</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs uppercase">Sec</div>
            </div>
          </div>
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
                <div className="relative">
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 bg-gray-400 text-gray-200 px-6 py-3 rounded-lg shadow cursor-not-allowed font-semibold text-sm opacity-60"
                  >
                    <FaApple size={20} />
                    App Store
                  </button>
                  <span className="absolute -top-2 -right-2 bg-white text-purple text-xs font-bold px-2 py-1 rounded-full shadow">
                    Soon
                  </span>
                </div>
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

      {/* Email Signup Section */}
      <section id="waitlist" className="px-8 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-secondary to-pink-light/30 p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-white">
              Be the first to know when Aurova launches
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join our email list to get early access, launch updates, and exclusive tips for building habits that stick.
            </p>

            {!state.succeeded ? (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full px-6 py-4 rounded-xl border-2 border-pink-light/30 focus:border-purple focus:outline-none transition-colors text-lg"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-pink-purple text-white px-8 py-4 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Joining..." : "Join the Waitlist"}
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-white/90 p-8 rounded-xl">
                <p className="text-xl text-green-600 font-semibold mb-4">
                  You're on the list! 🎉
                </p>
                <p className="text-textGray text-lg">
                  We'll send you updates as we get closer to launch.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <WWSFooter />
    </div>
  );
};

export default AurovaLanding;
