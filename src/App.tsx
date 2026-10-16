/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsMatrix } from './components/SkillsMatrix';
import { BlogSection } from './components/BlogSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { ProfileCustomizerModal } from './components/ProfileCustomizerModal';
import { initialProfile, projectsData, blogPostsData } from './data/portfolioData';
import { ProfileData } from './types/portfolio';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('richard_portfolio_profile');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isProfileCustomizerOpen, setIsProfileCustomizerOpen] = useState(false);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('richard_portfolio_profile', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save profile to localStorage', e);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-body selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Top Bar Contract Compliant Header */}
      <Navbar
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenProfileCustomizer={() => setIsProfileCustomizerOpen(true)}
        authorName={profile.name}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Split Hero Section with Architecture Sandbox & Full-Width KPI strip */}
        <Hero
          profile={profile}
          onOpenCustomizer={() => setIsProfileCustomizerOpen(true)}
          onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        />

        {/* Project Gallery with Bento Grid & Case Studies */}
        <ProjectGallery projects={projectsData} />

        {/* Technical Stack & Systems Competencies */}
        <SkillsMatrix />

        {/* Engineering Blog Section with In-Depth Reader */}
        <BlogSection posts={blogPostsData} />

        {/* Professional Experience & Career Track Record */}
        <ExperienceSection />

        {/* Real Contact Consultation Form */}
        <ContactSection email={profile.email} />

      </main>

      {/* Quiet Editorial Footer */}
      <Footer
        profile={profile}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* GitHub Deployment Helper Modal */}
      <GitHubDeployModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* Profile Bio & Links Customizer Modal */}
      <ProfileCustomizerModal
        isOpen={isProfileCustomizerOpen}
        onClose={() => setIsProfileCustomizerOpen(false)}
        currentProfile={profile}
        onSaveProfile={handleSaveProfile}
      />

    </div>
  );
}
