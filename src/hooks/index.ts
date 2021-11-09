import { useContext } from 'react';
import { AuthContext } from '../contexts';

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
