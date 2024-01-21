import adminHost from '@/services/host/server'

class AuthApi {
  getUser(headers) {
    let url = '/user'
    return adminHost.get(url, headers)
  }

  updateUser(data, headers) {
    let url = '/user'
    let { fullname, birthday, tel } = data
    return adminHost.post(url, { fullname, birthday, tel }, headers)
  }

  changePassword(data, headers) {
    let url = '/user/change-password'
    let { oldPassword, newPassword } = data
    return adminHost.post(
      url,
      { 'old-password': oldPassword, 'new-password': newPassword },
      headers
    )
  }

  checkAuth(headers) {
    let url = '/user/check-auth'
    return adminHost.get(url, headers)
  }

  resetPassword(data, headers) {
    let url = '/user/reset-password'
    let { password } = data
    return adminHost.post(url, { password: password }, headers)
  }
  formatPassword(data, headers) {
    let url = '/auth/forgot-password'
    let { email } = data
    return adminHost.post(url, { username: email }, headers)
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
