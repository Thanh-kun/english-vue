import adminHost from '@/services/host/server'

class CommonApi {
  getPart(headers) {
    let url = '/part'
    return adminHost.get(url, headers)
  }
  getLesson(partId, headers) {
    let url = '/lesson/' + partId
    return adminHost.get(url, headers)
  }
  getTest(partId, headers) {
    let url = '/test/all/' + partId
    return adminHost.get(url, headers)
  }
  getMiniTest(data = {}, headers) {
    const { partId = 1, limit = 50 } = data
    let url = '/exam/mini-test?' + `part_id=${partId}&limit=${limit}`
    return adminHost.get(url, headers);
  }
}

const commonApi = new CommonApi()
export default commonApi
