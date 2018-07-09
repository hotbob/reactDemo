const common_userinfo = (common_userinfo = {}, action) => {
  if ("/common/login" === action.type) {
    let newUserInfo = { ...action };
    return newUserInfo;
  } else {
    return common_userinfo;
  }
}
const common_prestate = (common_prestate = {}, action) => {
  if ("/common/savestate" === action.type) {
    let preState = {...common_prestate}
    preState[action.prestate.url]=action.prestate;
    return preState;
  } else {
    return common_prestate;
  }
}
export default { common_userinfo, common_prestate }