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
      state.searchMsg = searchMsg
    },
    SET_IS_LOADING: (state, isLoading) => {
      state.isLoading = isLoading
    },
    UPDATE_TASK_STATUS: (state, task) => {
      state.tasksFound.forEach((item) => {
        if (item.id === task.id) {
          item.lastExecution = task.lastExecution
          item.lastResult = task.lastResult
        }
      })
    },
    DELETE_TASK: (state, task) => {
      const tasks = []
      state.tasksFound.forEach((item) => {
        if (item.id !== task.id) {
          tasks.push(item)
        }
      })
      state.tasksFound = tasks
    },
    UPDATE_TASK: (state, task) => {
      const tasks = []
      state.tasksFound.forEach((item) => {
        if (item.id !== task.id) {
          tasks.push(item)
        } else {
          tasks.push(task)
        }
      })
      state.tasksFound = tasks
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
        commit('SET_SEARCH_MSG', 'Server error : ' + tasks)
        return
      }

      commit('SET_TASKS_FOUND', tasks)
    },
    async UPDATE_TASK_EXECUTION ({ commit, getters }) {
      commit('SET_IS_LOADING', true)
      commit('SET_SEARCH_MSG', null)

      const task = await this.$api.task.findById(getters.QUERY.id)

      commit('SET_IS_LOADING', false)
      if (task === BACKEND_STATUS.ERROR || task === BACKEND_STATUS.UNREACHABLE) {
        commit('SET_SEARCH_MSG', 'Server error : ' + task)
        return
      }

      if (getters.TASKS_FOUND === []) {
        return
      }

      commit('UPDATE_TASK_STATUS', task)
    },
    async FETCH_ALL_TASKS ({ commit }) {
      commit('SET_IS_LOADING', true)
      commit('SET_SEARCH_MSG', null)
      commit('SET_TASKS_FOUND', [])
      const tasks = await this.$api.task.findAll()

      commit('SET_IS_LOADING', false)
      if (tasks === BACKEND_STATUS.ERROR || tasks === BACKEND_STATUS.UNREACHABLE) {
        commit('SET_SEARCH_MSG', 'Server error : ' + tasks)
        return
      }

      commit('SET_TASKS_FOUND', tasks)
    }
  }
}
