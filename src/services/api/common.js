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
  getTestById(testId, headers) {
    let url = '/test/' + testId
    return adminHost.get(url, headers)
  }
  getAnswerByIds(ids, headers) {
    let url = '/question/answers'
    if (ids.length > 0) {
      let query = '?'
      for (let id of ids) {
        query += 'question_ids=' + id + '&'
      }
      url += query.slice(0, query.length - 1)
    }
    return adminHost.get(url, headers)
  }
  getMiniTest(data = {}, headers) {
    const { partId = 1, limit = 50 } = data
    let url = '/exam/mini-test?' + `part_id=${partId}&limit=${limit}`
    return adminHost.get(url, headers)
  }
  getFullTest(data = {}, headers) {
    const { limit = 100 } = data
    let url = '/exam/full-test?' + `limit=${limit}`
    return adminHost.get(url, headers)
  }
  getUsers(data = {}, headers) {
    const { page = 1, size = 10 } = data
    let url = '/admin/user?' + `page=${page}` + `&size=${size}`;
    return adminHost.get(url, headers)
  }
  getQuestions(data = {}, headers) {
    const { page = 1, size = 10, partId, type } = data
    let url = '/admin/question?' + `page=${page}` + `&size=${size}`;
    if (partId) url += `&part_id=${partId}`
    if (type) url += `&type=${type}`
    return adminHost.get(url, headers)
  }
  getTests(data = {}, headers) {
    const { page = 1, size = 10, partId } = data
    let url = '/admin/test?' + `page=${page}` + `&size=${size}`;
    if (partId) url += `&part_id=${partId}`
    return adminHost.get(url, headers)
  }
}

const commonApi = new CommonApi()
export default commonApi
