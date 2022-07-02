import { BACKEND_STATUS } from '@/utils/enums'

const URL_PREFIX = '/pool'

export default axios => ({

  async reload () {
    try {
      const result = await axios.get(URL_PREFIX + '/reload')
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
