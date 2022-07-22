import {
  LOGIN_USER,
  REGISTER_USER,
  GETINFO_USER,
  CHECK_EMAIL_USER,
  CHECK_USERNAME_USER,
  AUTH_USER,
  EDIT_USER,
  UPLOAD_USER,
  DELETE_UPLOAD_USER,
  WISHLIST_USER,
  ADD_TO_CART_USER
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
    case GETINFO_USER :
      return {
        ...state,
        userInfo : action.payload
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
    case AUTH_USER :
      return {
        ...state,
        userData : action.payload
      }
      break;
    case EDIT_USER :
      return {
        ...state,
        edit : action.payload
      }
      break;
    case UPLOAD_USER :
      return {
        ...state,
        upload : action.payload
      }
      break;
    case DELETE_UPLOAD_USER :
      return {
        ...state,
        deleteUpload : action.payload
      }
      break;
    case WISHLIST_USER :
      return {
        ...state,
        wishlist : action.payload
      }
      break;
    case ADD_TO_CART_USER :
      return {
        ...state,
        cart : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}