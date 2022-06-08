import {
  LOGIN_USER,
  REGISTER_USER,
  CHECK_EMAIL_USER,
  CHECK_USERNAME_USER
} from "../_actions/types";

export default function(state={}, action) {
  switch (action.type) {
    case LOGIN_USER :
      return {
        ...state,
        loginSuccess : action.payload
      }
      break;
    case REGISTER_USER :
      return {
        ...state,
        register : action.payload
      }
      break;
    case CHECK_USERNAME_USER :
      return {
        ...state,
        checkUsername : action.payload
      }
      break;
    case CHECK_EMAIL_USER :
      return {
        ...state,
        checkEmail : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}