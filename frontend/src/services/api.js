const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Server error (${response.status})`);
  }
  return data;
}

export const api = {
  getHealth: () => request('/health'),

  getQuizQuestions: ({ difficulty = 'all', quizType = 'practice', lang = 'en' }) =>
    request(`/quiz/questions?difficulty=${difficulty}&quiz_type=${quizType}&lang=${lang}`),

  submitQuiz: (payload) =>
    request('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getScamScenarios: () => request('/scams'),

  checkUrl: (url) =>
    request('/url-check', {
      method: 'POST',
      body: JSON.stringify({ url })
    }),

  getProgress: (sessionId) => request(`/progress/${sessionId}`),

  updatePreferences: (sessionId, payload) =>
    request(`/progress/${sessionId}/preferences`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    }),

  markModuleComplete: (sessionId, moduleSlug) =>
    request('/progress/module', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, module_slug: moduleSlug })
    }),

  saveChecklistItem: (sessionId, itemKey, isChecked) =>
    request('/progress/checklist', {
      method: 'POST',
      body: JSON.stringify({
        session_id: sessionId,
        item_key: itemKey,
        is_checked: isChecked
      })
    }),

  resetProgress: (sessionId) =>
    request(`/progress/${sessionId}`, {
      method: 'DELETE'
    }),

  getFeedback: () => request('/feedback'),

  submitFeedback: (payload) =>
    request('/feedback', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};