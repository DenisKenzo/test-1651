import { userConstants } from '../_constants/user.constants';

const INITIAL_STATE = {
  notifications: [],
  transactions: [],
  paymentsCards: [],
  updateSuccess: null,
  updateError: null,
  updateRequest: null,
  showModalSucces: false,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userConstants.SHOW_MODAL_UPDATE_SUCCESS:
      return {
        ...state,
        showModalSucces: action.payload,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateSuccess: action.payload,
        updateError: false,
        mobileStep: 1,
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        updateError: action.payload,
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        updateRequest: null,
      };
    case userConstants.SETUP_FORGOT_STEP:
      return {
        ...state,
        step: action.step,
      };
    case userConstants.REQUEST_RECOVER_PASSWORD:
      return {
        ...state,
        isSentRecoveryCode: true,
      };
    case userConstants.SUCCESS_RECOVER_PASSWORD:
      return {
        ...state,
        isSentRecoveryCode: false,
        step: 2,
      };
    case userConstants.FAILURE_RECOVER_PASSWORD:
      return {
        ...state,
        isSentRecoveryCode: false,
      };
    case userConstants.REQUEST_SET_NEW_PASSWORD:
      return {
        ...state,
        isSentNewPassword: true,
      };
    case userConstants.SUCCESS_SET_NEW_PASSWORD:
      return {
        ...state,
        isSentNewPassword: false,
        step: 4,
      };
    case userConstants.FAILURE_SET_NEW_PASSWORD:
      return {
        ...state,
        isSentNewPassword: false,
      };
    case userConstants.REQUEST_CHECK_CODE:
      return {
        ...state,
        isSentCheckingCode: true,
      };
    case userConstants.SUCCESS_CHECK_CODE:
      return {
        ...state,
        isSentCheckingCode: false,
        mobileStep: 1,
      };
    case userConstants.STEP_TO_UPDATE:
      return {
        ...state,
        isSentCheckingCode: false,
        mobileStep: 3,
      };
    case userConstants.FAILURE_CHECK_CODE:
      return {
        ...state,
        isSentCheckingCode: false,
        wrongCode: true,
      };
    case userConstants.HIDE_CODE:
      return {
        ...state,
        wrongCode: false,
      };
    case userConstants.REQUEST_NEW_COMPANY:
      return {
        ...state,
        isSentRequestToRegisterCompany: true,
      };
    case userConstants.SUCCESS_NEW_COMPANY:
      return {
        ...state,
        isSentRequestToRegisterCompany: false,
        sentRequestToRegisterCompany: true,
      };
    case userConstants.REQUEST_CONTACT:
      return {
        ...state,
        isSentRequestToContact: true,
      };

    case userConstants.SUCCESS_CONTACT:
      return {
        ...state,
        isSentRequestToContact: false,
        sentRequestToContact: true,
      };
    case userConstants.REQUEST_CLOSE_SUCCESS_WINDOW:
      return {
        ...state,
        sentRequestToRegisterCompany: false,
        sentRequestToContact: false,
      };
    case userConstants.FAILURE_NEW_COMPANY:
      return {
        ...state,
        isSentRequestToRegisterCompany: false,
      };
    case userConstants.LOGIN_SENT_PHONE_REQUEST:
      return {
        ...state,
        isSendingPhone: true,
      };
    case userConstants.LOGIN_SENT_PHONE_SUCCESS:
      return {
        ...state,
        isSendingPhone: false,
        mobileStep: 2,
      };
    case userConstants.LOGIN_SENT_MAIL_REQUEST:
      return {
        ...state,
        isSendingPhone: true,
      };
    case userConstants.LOGIN_SENT_MAIL_SUCCESS:
      return {
        ...state,
        isSendingPhone: false,
        mobileStep: 2,
      };
    case userConstants.LOGIN_SENT_PHONE_PREVIOUS_STEP:
      return {
        ...state,
        isSendingPhone: false,
        mobileStep: 1,
      };
    case userConstants.LOGIN_SENT_PHONE_FAILURE:
      return {
        ...state,
        isSendingPhone: false,
      };
    case userConstants.CLEARED_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    case userConstants.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.data,
      };

    case userConstants.GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.data,
      };

    case userConstants.GET_PAYMENTS_CARD:
      return {
        ...state,
        paymentsCards: action.data,
      };

    case userConstants.MAKE_READ:
      return {
        ...state,
        notifications: state.notifications.map((notification) => (notification.notificationID === action.id
          ? Object.assign(notification, ...[{ readAt: 'read' }])
          : notification)),
      };
    default:
      return state;
  }
}
