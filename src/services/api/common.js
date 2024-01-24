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
    const { page = 1, size = 10, username = '', fullname = '' } = data
    let url =
      '/admin/user?' +
      `page=${page}` +
      `&size=${size}` +
      `&username=${username}` +
      `&fullname=${fullname}`
    return adminHost.get(url, headers)
  }
  getQuestions(data = {}, headers) {
    const { page = 1, size = 10, partId, type } = data
    let url = '/admin/question?' + `page=${page}` + `&size=${size}`
    if (partId) url += `&part_id=${partId}`
    if (type) url += `&type=${type}`
    return adminHost.get(url, headers)
  }
  getTests(data = {}, headers) {
    const { page = 1, size = 10, partId } = data
    let url = '/admin/test?' + `page=${page}` + `&size=${size}`
    if (partId) url += `&part_id=${partId}`
    return adminHost.get(url, headers)
  }
  submitTest(data = {}, headers) {
    const { testId, correct = 0 } = data
    let url = '/test/submit'
    return adminHost.post(url, { test_id: testId, correct }, headers)
  }
  addPart(data, headers) {
    let url = '/admin/part'
    let { name, subname, description, thumbnail, type } = data
    return adminHost.post(url, { name, sub_name: subname, description, thumbnail, type }, headers)
  }
  editPart(data, headers) {
    let url = '/admin/part/' + data.id
    let { name, subname, description, thumbnail, type } = data
    return adminHost.post(url, { name, sub_name: subname, description, thumbnail, type }, headers)
  }
  addLesson(data, headers) {
    let url = '/admin/lesson'
    let { name, content, partId } = data
    return adminHost.post(url, { name, content, part_id: partId }, headers)
  }
  editLesson(data, headers) {
    let url = '/admin/lesson/' + data.id
    let { name, content, partId } = data
    return adminHost.post(url, { name, content, part_id: partId }, headers)
  }
  deleteLesson(data, headers) {
    let url = '/admin/lesson/' + data.id
    return adminHost.delete(url, headers)
  }
  addQuestion(data, headers) {
    let url = '/admin/question'
    let { image, audio, content, name, answers, trueAnswer, type, partId } = data

    var formData = new FormData()

    console.log(audio)
    formData.append('name', name)
    formData.append('content', content)
    formData.append('answers', answers)
    formData.append('type', type)
    formData.append('part_id', partId)
    formData.append('true_answer', trueAnswer)
    formData.append('image', image)
    formData.append('audio', audio)
    return adminHost.post(url, formData, { ...headers, 'Content-Type': 'multipart/form-data' })
  }
  deleteQuestion(data, headers) {
    let url = '/admin/question/' + data.id
    return adminHost.delete(url, headers)
  }
  addTest(data, headers) {
    let url = '/admin/test'
    let { name, partId } = data
    return adminHost.post(url, { name, part_id: partId }, headers)
  }
  editTest(data, headers) {
    let url = '/admin/test/' + data.id
    let { name, partId } = data
    return adminHost.post(url, { name, part_id: partId }, headers)
  }
  deleteTest(data, headers) {
    let url = '/admin/test/' + data.id
    return adminHost.delete(url, headers)
  }
  addQuestionToTest(data = {}, headers) {
    let url = '/admin/test-question'
    let { testId, questionId } = data
    return adminHost.post(url, { test_id: testId, question_id: questionId }, headers)
  }
}

const commonApi = new CommonApi()
export default commonApi
