import { useMemo } from 'react';

export function useAuth() {
  return useMemo(
    () => ({
      user: {
        id: 'farmer-1',
        name: 'Ravi Nair',
        role: 'farmer',
      },
      isAuthenticated: true,
    }),
    []
  );
}
