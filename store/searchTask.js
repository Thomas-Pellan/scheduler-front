import { BACKEND_STATUS } from '@/utils/enums'

export default {

  state () {
    return {
      query: null,
      tasksFound: [],
      isLoading: false,
      searchMsg: null
    }
  },
  getters: {
    QUERY: state => state.query,
    TASKS_FOUND: state => state.tasksFound,
    SEARCH_MSG: state => state.searchMsg,
    IS_LOADING: state => state.isLoading
  },
  mutations: {
    SET_QUERY: (state, query) => {
      state.query = query
    },
    SET_TASKS_FOUND: (state, tasksFound) => {
      state.tasksFound = tasksFound
    },
    SET_SEARCH_MSG: (state, searchMsg) => {
      state.tasksFound = searchMsg
    },
    SET_IS_LOADING: (state, isLoading) => {
      state.isLoading = isLoading
    }
  },
  actions: {
    async FETCH_TASKS ({ commit, getters }) {
      commit('SET_IS_LOADING', true)
      commit('SET_SEARCH_MSG', null)
      commit('SET_TASKS_FOUND', [])
      const tasks = await this.$api.task.find({ name: getters.QUERY.name, url: getters.QUERY.url })

      commit('SET_IS_LOADING', false)
      if (tasks === BACKEND_STATUS.ERROR || tasks === BACKEND_STATUS.UNREACHABLE) {
        commit('SET_SEARCH_MSG', 'Server error :' + tasks)
        return
      }

      commit('SET_TASKS_FOUND', tasks)
    },
    async FETCH_ALL_TASKS ({ commit }) {
      commit('SET_IS_LOADING', true)
      commit('SET_SEARCH_MSG', null)
      commit('SET_TASKS_FOUND', [])
      const tasks = await this.$api.task.findAll()

      commit('SET_IS_LOADING', false)
      if (tasks === BACKEND_STATUS.ERROR || tasks === BACKEND_STATUS.UNREACHABLE) {
        commit('SET_SEARCH_MSG', 'Server error :' + tasks)
        return
      }

      commit('SET_TASKS_FOUND', tasks)
    }
  }
}
