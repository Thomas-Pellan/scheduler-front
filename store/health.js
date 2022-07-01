import moment from 'moment'
import { BACKEND_STATUS } from '@/utils/enums'
import { DATE_TIME_FORMAT } from '@/utils/vars'

export default {

  state () {
    return {
      healthStatus: BACKEND_STATUS.UNKOWN,
      lastStatusDate: null,
      statusHistory: []
    }
  },
  getters: {
    HEALTH_STATUS: state => state.healthStatus,
    LAST_STATUS_DATE: state => state.lastStatusDate,
    STATUS_HISTORY: state => state.statusHistory
  },
  mutations: {
    SET_HEALTH_STATUS: (state, healthStatus) => {
      state.healthStatus = healthStatus
    },
    SET_LAST_STATUS_DATE: (state, lastStatusDate) => {
      state.lastStatusDate = lastStatusDate
    },
    SET_STATUS_HISTORY: (state, statusHistory) => {
      state.statusHistory = statusHistory
    }
  },
  actions: {
    async FETCH_HEALTH_STATUS ({ commit, dispatch }) {
      const status = await this.$api.actuator.getHealth()
      commit('SET_HEALTH_STATUS', status)
      commit('SET_LAST_STATUS_DATE', moment(new Date()).format(DATE_TIME_FORMAT))

      dispatch('UPDATE_STATUS_HISTORY')
    },
    UPDATE_STATUS_HISTORY ({ commit, getters }) {
      let currentStatuses = []
      const newStatus = {
        status: getters.HEALTH_STATUS,
        date: getters.LAST_STATUS_DATE
      }
      currentStatuses.push(newStatus)
      currentStatuses = [...currentStatuses, ...getters.STATUS_HISTORY]
      commit('SET_STATUS_HISTORY', currentStatuses)
    }
  }
}
