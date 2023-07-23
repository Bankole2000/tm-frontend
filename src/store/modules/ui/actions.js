export default {
  toggleSideBar(context, { show }) {
    return new Promise(resolve => {
      context.commit('toggleSideBar', show);
      // console.log({ show });
      resolve();
    })
  },
  showToast(context, { show, sclass = "", message = "", timeout = 1000 }) {
    return new Promise(resolve => {
      context.commit("showToast", { show, sclass, message, timeout });
      resolve(timeout);
    });
  },
}