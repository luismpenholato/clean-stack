const TOKEN_KEY = 'boilerplate.access_token';

export const authToken = {
  get(): string | null {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};
