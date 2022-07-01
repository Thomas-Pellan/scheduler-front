import { BACKEND_STATUS } from '@/utils/enums'

export default {

  state () {
    return {
      healthStatus: BACKEND_STATUS.UNKOWN
    }
  },
  getters: {
    HEALTH_STATUS: state => state.healthStatus
  },
  mutations: {
    SET_HEALTH_STATUS: (state, healthStatus) => {
      state.healthStatus = healthStatus
    }
  },
  actions: {
    async FETCH_HEALTH_STATUS ({ commit }) {
      commit('SET_HEALTH_STATUS', await this.$api.actuator.getHealth())
    }
  }
}
