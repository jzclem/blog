import request from '@/utils/request'

export default {
  list: function (query) {
    return request({
      url: `/article/list?pageindex=${query.page}&pagesize=${query.pageSize}`
    })
  },
  single: function (id) {
    return request({
      url: '/article/detail?id=' + id
    })
  },
  create: function (form) {
    let files = {}
    files[form.title] = { content: form.content }
    return request({
      url: '/gists',
      method: 'post',
      data: {
        'description': form.description,
        'public': true,
        'files': files
      }
    })
  },
  edit: function (form) {
    let files = {}
    files[form.title] = { content: form.content }
    return request({
      url: '/gists/' + form.id,
      method: 'PATCH',
      data: {
        'description': form.description,
        'public': true,
        'files': files
      }
    })
  },
  delete: function (id) {
    return request({
      url: '/gists/' + id,
      method: 'DELETE'
    })
  }
}
