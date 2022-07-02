import { BACKEND_STATUS } from '@/utils/enums'

const URL_PREFIX = '/scheduled-task'

export default axios => ({

  async find ({ name, url }) {
    try {
      const result = await axios.get(URL_PREFIX + '/find', { params: { name, url } })
      return result.data
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  },
  async findAll () {
    try {
      const result = await axios.get(URL_PREFIX + '/find/all')
      return result.data
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  },
  async update (updatedTask) {
    try {
      const result = await axios.post(URL_PREFIX + '/update', updatedTask)
      return result.data
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  },
  async create (newTask) {
    try {
      const result = await axios.put(URL_PREFIX + '/create', newTask)
      return result.data
    } catch (error) {
      if (error.response) {
        return BACKEND_STATUS.ERROR
      } else if (error.request) {
        return BACKEND_STATUS.UNREACHABLE
      }
    }
  },
  async delete (taskName) {
    try {
      const result = await axios.put(URL_PREFIX + '/delete', taskName)
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