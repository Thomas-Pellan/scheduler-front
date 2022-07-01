import { BACKEND_STATUS } from '@/utils/enums'

export default axios => ({

  async getHealth () {
    try {
      await axios.get('http://localhost:8080/actuator/health')
      return BACKEND_STATUS.UP
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  }
})
