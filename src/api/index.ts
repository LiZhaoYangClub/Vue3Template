import { service } from '@/axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (data: any) => {
  return service.post('/api/auth/login', data)
}
