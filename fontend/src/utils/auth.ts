import Cookies from 'js-cookie'
const TOKEN_KEY = 'token'

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY)
}
export function setToken(token: string): string | undefined {
  return Cookies.set(TOKEN_KEY, token, {
    expires: 3 // 单位：天
  })
}
export function removeToken(): void {
  Cookies.remove(TOKEN_KEY)
}
