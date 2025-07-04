// src/pages/LandingPage.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCard";

export default function LandingPage() {
  return (
    <main className="container-fluid p-0">
      <HeroSection />
      <FeatureCards />
    </main>
  );
}

