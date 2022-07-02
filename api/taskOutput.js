import { BACKEND_STATUS } from '@/utils/enums'

const URL_PREFIX = '/scheduled-task-output'

export default axios => ({

  async find ({ name }) {
    try {
      const result = await axios.get(URL_PREFIX + '/list', { params: { taskName: name } })
      return result.data
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  },
  async flush ({ name, date}) {
    try {
      const result = await axios.delete(URL_PREFIX + '/flush', { params: { name, date } } )
      return result.data
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  }
})
