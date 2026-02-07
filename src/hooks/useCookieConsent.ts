'use client';

import { useState, useEffect } from 'react';

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'poppy-cookie-consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('[Cookie] Hook mounted, showBanner:', showBanner);
    // Load consent from localStorage
    const stored = localStorage.getItem(CONSENT_KEY);
    console.log('[Cookie] localStorage:', stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConsent(parsed);
        setShowBanner(false);
        console.log('[Cookie] Found consent, hiding');
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
        setShowBanner(true);
        console.log('[Cookie] Parse error, showing');
      }
    } else {
      setShowBanner(true);
      console.log('[Cookie] No consent, SHOWING BANNER');
    }
  }, []);

  const acceptAll = () => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setShowBanner(false);

    // Reload page to enable analytics if accepted
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const rejectAll = () => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setShowBanner(false);
  };

  const savePreferences = (preferences: CookieConsent) => {
    const newConsent = {
      ...preferences,
      necessary: true, // Always true
    };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setShowBanner(false);

    // Reload page to apply changes
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(null);
    setShowBanner(true);
  };

  return {
    consent,
    showBanner,
    mounted,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  };
}
