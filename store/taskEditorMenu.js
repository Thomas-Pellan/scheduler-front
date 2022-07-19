export default {

  state () {
    return {
      menuTab: 0,
      tabs: ['Task Search', 'Task Edition', 'Input Search', 'Input Edition']
    }
  },
  getters: {
    MENU_TAB: state => state.menuTab,
    TABS: state => state.tabs
  },
  mutations: {
    SET_MENU_TAB: (state, tab) => {
      state.menuTab = tab
    },
    SET_MENU_TAB_EDITION: (state) => {
      state.menuTab = 1
    }
  }
}
