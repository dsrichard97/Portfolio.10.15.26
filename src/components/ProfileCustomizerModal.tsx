import React, { useState } from 'react';
import { X, User, RotateCcw, Save, Check } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { initialProfile } from '../data/portfolioData';

interface ProfileCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ProfileData;
  onSaveProfile: (updated: ProfileData) => void;
}

export const ProfileCustomizerModal: React.FC<ProfileCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [profile, setProfile] = useState<ProfileData>(currentProfile);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setProfile(initialProfile);
    onSaveProfile(initialProfile);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-display text-neutral-100">
              Personalize Portfolio Bio & Links
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-neutral-400 font-mono">
            Changes are saved to your browser's persistent storage, letting you preview your own custom identity before committing to GitHub.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">Professional Role</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1.5">Short Bio & Engineering Philosophy</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">Contact Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">GitHub Profile URL</label>
              <input
                type="url"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">LinkedIn Profile URL</label>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
            </div>
          </div>

          {/* Metric 1 & Metric 2 */}
          <div className="pt-2 border-t border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 block mb-2">Headline Metrics</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-neutral-500 mb-1">Metric 1 (Value / Label)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.stats[0]?.value || ''}
                    onChange={(e) => {
                      const updated = [...profile.stats];
                      updated[0] = { ...updated[0], value: e.target.value };
                      setProfile({ ...profile, stats: updated });
                    }}
                    className="w-1/2 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-100"
                  />
                  <input
                    type="text"
                    value={profile.stats[0]?.label || ''}
                    onChange={(e) => {
                      const updated = [...profile.stats];
                      updated[0] = { ...updated[0], label: e.target.value };
                      setProfile({ ...profile, stats: updated });
                    }}
                    className="w-1/2 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-500 mb-1">Metric 2 (Value / Label)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.stats[1]?.value || ''}
                    onChange={(e) => {
                      const updated = [...profile.stats];
                      updated[1] = { ...updated[1], value: e.target.value };
                      setProfile({ ...profile, stats: updated });
                    }}
                    className="w-1/2 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-100"
                  />
                  <input
                    type="text"
                    value={profile.stats[1]?.label || ''}
                    onChange={(e) => {
                      const updated = [...profile.stats];
                      updated[1] = { ...updated[1], label: e.target.value };
                      setProfile({ ...profile, stats: updated });
                    }}
                    className="w-1/2 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-neutral-500 hover:text-neutral-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors font-sans flex items-center gap-1.5"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neutral-950" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Apply Updates</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
