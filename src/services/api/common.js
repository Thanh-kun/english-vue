import adminHost from '@/services/host/server'

class CommonApi {
  getPart(header) {
    let url = '/part'
    return adminHost.get(url, header)
  }
}

const commonApi = new CommonApi()
export default commonApi
