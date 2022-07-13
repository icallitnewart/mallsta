import {
  UPLOAD_IMAGE_PRODUCT,
  DELETE_IMAGE_PRODUCT,
  REGISTER_PRODUCT,
  GETINFO_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
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
    case REGISTER_PRODUCT :
      return {
        ...state,
        register : action.payload
      }
      break;
    case GETINFO_PRODUCT :
      return {
        ...state,
        productInfo : action.payload
      }
      break;
    case DELETE_PRODUCT :
      return {
        ...state,
        delete : action.payload
      }
      break;
    case EDIT_PRODUCT :
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