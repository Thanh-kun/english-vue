import adminHost from '@/services/host/server'

class AuthApi {
  getUser(headers) {
    let url = '/user'
    return adminHost.get(url, headers)
  }

  signIn(data, headers) {
    let url = '/auth/login'
    let { username, password } = data
    return adminHost.post(url, { username, password }, headers)
  }

  signUp(data, headers) {
    let url = '/auth/sign-up'
    let { username, password, confirmPassword, fullname } = data
    return adminHost.post(
      url,
      { username, password, confirm_password: confirmPassword, fullname },
      headers
    )
  }
}

const authApi = new AuthApi()
export default authApi
