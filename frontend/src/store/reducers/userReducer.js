import {
   LOGIN_USER,
   AUTH_USER,
   LOGOUT_USER,
   UPDATE_ME,
   USER_FLAG,
} from '../actions/types'

export default (state = {}, action) => {
   switch (action.type) {
      case LOGIN_USER:
         return { ...state, user: action.payload }
      case AUTH_USER:
         return { ...state, user: action.payload }
      case LOGOUT_USER:
         return { ...state, user: action.payload }
      case UPDATE_ME:
         return { ...state, user: action.payload }
      case USER_FLAG:
         return { ...state, flag: action.payload }
      default:
         return state
   }
}
