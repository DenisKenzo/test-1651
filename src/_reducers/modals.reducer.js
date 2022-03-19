import { modalsConstants } from '../_constants';

const INITIAL_STATE = {
  agree: true,
  agreeModal: false,

  quickView: false, // QUICK VIEW MODAL FOR COUPON CARD
  quickViewData: {}, // GET DATA FOR EACH DATA COUPON

  qrModal: false,
  previewModal: true,
  age: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalsConstants.SHOW_QUICKVIEW_MODAL:
      return {
        ...state,
        previewModal: true,
      };
    case modalsConstants.HIDE_QUICKVIEW_MODAL:
      return {
        ...state,
        previewModal: false,
      };

    case modalsConstants.AGREE_MODAL_LOGIN_IN:
      return {
        ...state,
        agree: action.agree,
        agreeModal: action.agreeModal,
      };

    case modalsConstants.SHOW_QUICK_VIEW:
      return {
        ...state,
        quickView: true,
      };
    case modalsConstants.HIDE_QUICK_VIEW:
      return {
        ...state,
        quickView: false,
      };

    case modalsConstants.SET_RESPONSE_QUICK_VIEW_DATA:
      return {
        ...state,
        quickViewData: action.data,
      };

    case modalsConstants.SHOW_QR_MODAL:
      return {
        ...state,
        qrModal: true,
      };
    case modalsConstants.HIDE_QR_MODAL:
      return {
        ...state,
        qrModal: false,
      };

    default:
      return state;
  }
};

export default modalReducer;
