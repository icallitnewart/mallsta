import {
  REGISTER_STORE,
  EDIT_STORE
} from "../_actions/types";

export default function(state={}, action) {
  switch (action.type) {
    case REGISTER_STORE :
      return {
        ...state,
        register : action.payload
      }
      break;
    case EDIT_STORE :
      return {
        ...state,
        edit : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}