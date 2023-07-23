export default {
  showToast(state, payload) {
    for (const key in payload) {
      state.toast[key] = payload[key];
    }
    state.toast.icon = payload.sclass ? state.toast.icons[payload.sclass] : "";
  },
  showGlobalLoader(state, payload) {
    for (const key in payload) {
      state.loader[key] = payload[key];
    }
  },
  showGlobalAlert(state, payload) {
    for (const key in payload) {
      state.globalAlert[key] = payload[key];
    }
  },
  toggleSideBar(state, payload) {
    // console.log({ payload });
    state.sideBar.show = payload
  },
  togglePageNav(state, payload) {
    state.pageNav.show = payload;
  },
  toggleAppNav(state, payload) {
    state.appNav.show = payload;
  }
};