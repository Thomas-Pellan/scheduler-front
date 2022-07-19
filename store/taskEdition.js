export default {

  state () {
    return {
      task: {}
    }
  },
  getters: {
    TASK: state => state.task
  },
  mutations: {
    SET_TASK: (state, task) => {
      state.task = task
    },
    NEW_TASK: (state) => {
      state.task = {}
    }
  },
  actions: {
    DUPLICATE_TASK ({ commit }, model) {
      const newTask = { ...model }
      newTask.id = null
      commit('SET_TASK', newTask)
    }
  }
}
