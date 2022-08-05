import {
  WRITE_REVIEW,
  GETLIST_REVIEW
} from "../_actions/types";

export default function(state={}, action) {
  switch (action.type) {
    case WRITE_REVIEW :
      return {
        ...state,
        reviewUpload : action.payload
      }
      break;
    case GETLIST_REVIEW :
      return {
        ...state,
        reviewList : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}