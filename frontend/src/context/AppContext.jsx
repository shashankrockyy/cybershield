import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { TRANSLATIONS } from '../data/translations';

const AppContext = createContext(null);

function getOrCreateSessionId() {
  let id = localStorage.getItem('cybershield_session_id');
  if (!id) {
    id = 'cs_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    localStorage.setItem('cybershield_session_id', id);
  }
  return id;
}

export function AppProvider({ children }) {
  const [sessionId] = useState(getOrCreateSessionId);
  const [lang, setLang] = useState(() => localStorage.getItem('cybershield_lang') || 'en');
  const [progress, setProgress] = useState({
    completed_modules: [],
    quiz_attempts: [],
    pre_assessment: null,
    post_assessment: null,
    awareness_improvement: null,
    checklist: {}
  });
  const [backendOnline, setBackendOnline] = useState(true);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const refreshProgress = async () => {
    try {
      const data = await api.getProgress(sessionId);
      setProgress(data);
      setBackendOnline(true);
    } catch (_err) {
      setBackendOnline(false);
    }
  };

  useEffect(() => {
    refreshProgress();
  }, [sessionId]);

  const changeLanguage = async (newLang) => {
    setLang(newLang);
    localStorage.setItem('cybershield_lang', newLang);
    try {
      await api.updatePreferences(sessionId, { preferred_lang: newLang });
    } catch (_err) {
      // Language still works locally even if backend is temporarily offline
    }
  };

  const completeModule = async (slug) => {
    try {
      await api.markModuleComplete(sessionId, slug);
      await refreshProgress();
    } catch (_err) {
      setProgress((prev) => ({
        ...prev,
        completed_modules: Array.from(new Set([...prev.completed_modules, slug]))
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        sessionId,
        lang,
        changeLanguage,
        t,
        progress,
        refreshProgress,
        completeModule,
        backendOnline
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}