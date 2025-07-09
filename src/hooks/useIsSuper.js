import { useAuth } from 'contexts/AuthContext'

export default function useIsSuper() {
  const { roles = [] } = useAuth()
  return roles.includes('super')
}
