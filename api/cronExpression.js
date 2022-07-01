import { BACKEND_STATUS } from '@/utils/enums'

export default axios => ({

  async validateCronExpression (exp) {
    try {
      const result = await axios.post('/expression/validate', null, { params: { expression: exp } })
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
