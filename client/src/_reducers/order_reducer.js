import {
  PLACE_ORDER
} from "../_actions/types";

export default function(state={}, action) {
  switch (action.type) {
    case PLACE_ORDER :
      return {
        ...state,
        order : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}