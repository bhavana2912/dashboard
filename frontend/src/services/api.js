// All calls to the Flask backend live here. Vite proxies /api -> http://127.0.0.1:5000
export const getToken = () => localStorage.getItem('satya_token')
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('satya_user')) } catch { return null }
}
export const logout = () => { localStorage.removeItem('satya_token'); localStorage.removeItem('satya_user') }

async function post(path, body) {
  let res
  try {
    res = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Cannot reach the server. Please start the Flask backend.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export async function login(username, password) {
  const data = await post('/auth/login', { username, password })
  localStorage.setItem('satya_token', data.token)
  localStorage.setItem('satya_user', JSON.stringify(data.user))
  return data
}
export const forgotPassword = (identifier) => post('/auth/forgot-password', { identifier })
