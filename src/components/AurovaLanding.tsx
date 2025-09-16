// src/components/AurovaLanding.tsx
import React from "react";
import ScreenshotCarousel from "./ScreenshotCarousel";
import WWSFooter from "./WWSFooter";
import aurovaLogo from  "../assets/aurova-logo.svg";
import WaitlistModal from "./WaitlistModal";

const AurovaLanding: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 flex flex-col min-h-screen">
      {/* Coming soon banner */}
      <div className="bg-amber-100 text-black text-center py-2 font-semibold">
        🚀 Aurova is coming soon — join the waitlist and be first to try it! ✨
      </div>

      {/* Hero */}
      <section className="hero-bg text-white text-center py-24 px-6">
        <img src={aurovaLogo} alt="Aurova logo" className="mx-auto mb-6 h-16 md:h-20" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm mb-4">Build better habits, one day at a time 💪</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 drop-shadow-sm mb-8">
          Aurova makes habit-building simple and human. Track progress, celebrate milestones, and get helpful nudges that keep you moving forward — without the judgment.
        </p>
        {/* Waitlist Modal */}
<WaitlistModal />
      </section>

      {/* Carousel */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">A Quick Look 👀</h2>
        <div className="max-w-5xl mx-auto">
          <ScreenshotCarousel />
        </div>
      </section>

      {/* Features (different bg color) */}
      <section className="bg-rose-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Features You’ll Love ❤️</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Track any challenge 📊</h3>
              <p className="text-gray-600">Create a custom challenge and watch your progress build day by day.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Milestone messages 🎉</h3>
              <p className="text-gray-600">Small celebrations that keep you motivated when you hit milestones.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Streak tracking 🔥</h3>
              <p className="text-gray-600">See your streaks at a glance and protect the momentum you’ve built.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Reminder nudges ⏰</h3>
              <p className="text-gray-600">Gentle reminders that make consistency automatic, not a chore.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Save your progress 💾</h3>
              <p className="text-gray-600">Pause, come back, and pick up right where you left off—your data is safe.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Reset & restart 🔄</h3>
              <p className="text-gray-600">Want a fresh start? Reset anytime and begin a new challenge with confidence.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Visual dashboard 🖥️</h3>
              <p className="text-gray-600">A clear view of streaks, milestones, and trends so you can learn what works.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Build real change 🔧</h3>
              <p className="text-gray-600">Tools designed to turn habits into routines that stick.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Transform your life ✨</h3>
              <p className="text-gray-600">Small, consistent wins that add up to meaningful change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <WWSFooter />
    </div>
  );
};

export default AurovaLanding;
