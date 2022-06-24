import {
  UPLOAD_IMAGE_PRODUCT,
  DELETE_IMAGE_PRODUCT
} from "../_actions/types";

export default function(state={}, action) {
  switch (action.type) {
    case UPLOAD_IMAGE_PRODUCT :
      return {
        ...state,
        imageUpload : action.payload
      }
      break;
    case DELETE_IMAGE_PRODUCT :
      return {
        ...state,
        imageDelete : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}