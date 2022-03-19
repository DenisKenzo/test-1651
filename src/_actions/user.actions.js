import { TRANSLATIONS, userConstants } from '../_constants';
import { history } from '../_helpers';
import { userService } from '../_services/user.service';
import cookies from '../_helpers/cookies';
import { alertCall } from './alerts.actions';

export function loginUser(data, lang) {
  return (dispatch) => {
    dispatch(request());

    userService.login(data).then(
      () => {
        userService.getUserDetails().then(
          (userDetails) => {
            dispatch(success(userDetails));
            history.push(`/${lang}/`);
          },
          (error) => {
            dispatch(failure(error.toString()));
            dispatch(alertCall({ type: 'danger', text: error.toString() }));
          },
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(userDetails) {
    return { type: userConstants.LOGIN_SUCCESS, userDetails };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, payload: { error } };
  }
}

export function updateStoredUserDetails(userDetails) {
  return { type: userConstants.UPDATE_USER_SUCCESS, userDetails };
}

export function loginUserWithToken(token, lang) {
  return (dispatch) => {
    dispatch(request());

    userService.setupUserToken(token).then(
      () => {
        userService.getUserDetails().then(
          (userDetails) => {
            dispatch(success(userDetails));

            if (
              userDetails.firstName
              && userDetails.lastName
              && userDetails.telephone
              && userDetails.birthDate
              && userDetails.address
              && userDetails.agree1
            ) {
              history.push(`/${lang}/`);
            } else {
              history.push(`/${lang}/profile`);
            }
          },
          (error) => {
            dispatch(failure(error.toString()));
            dispatch(alertCall({ type: 'danger', text: error.toString() }));
          },
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(userDetails) {
    return { type: userConstants.LOGIN_SUCCESS, userDetails };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, payload: { error } };
  }
}

export function getUserDetails(userID) {
  return (dispatch) => {
    userService.getUserDetailsForLoggedIn(userID).then(
      (values) => {
        console.log('valuesUser', values);
        dispatch(success(values));
      },
      (error) => {
        // dispatch(success(values));
        // dispatch(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function success(userDetails) {
    return { type: userConstants.UPDATE_USER_SUCCESS, userDetails };
  }
}
export function resetUserUpdate() {
  return (dispatch) => {
    dispatch({
      type: userConstants.UPDATE_USER_FAILURE,
      payload: null,
    });
    dispatch({ type: userConstants.SHOW_MODAL_UPDATE_SUCCESS, payload: false });
  };
}
export function updateUser(values, userId, lang) {
  return (dispatch) => {
    dispatch(request());
    dispatch(failure());
    userService.updateUserDetails(values, userId).then(
      () => {
        dispatch(success(values));

        // dispatch({
        //   type: userConstants.SHOW_MODAL_UPDATE_SUCCESS,
        //   payload: true,
        // })
        dispatch(
          alertCall({
            type: 'success',
            text: TRANSLATIONS[lang].saved_profile,
          }),
        );
      },
      (error) => {
        // dispatch(success(values));
        // cookies.utils.removeAuth();

        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request() {
    return { type: userConstants.UPDATE_USER_REQUEST };
  }
  function success(userDetails) {
    return { type: userConstants.UPDATE_USER_SUCCESS, userDetails };
  }
  function failure(error) {
    return {
      type: userConstants.UPDATE_USER_FAILURE,
      payload: error,
    };
  }
}
export function updateUserAddress(values, userId, lang) {
  return (dispatch) => {
    dispatch(request());
    dispatch(failure());
    userService.updateUserAddress(values, userId).then(
      () => {
        dispatch(success(values.address));

        // dispatch({
        //   type: userConstants.SHOW_MODAL_UPDATE_SUCCESS,
        //   payload: true,
        // })
        dispatch(
          alertCall({
            type: 'success',
            text: TRANSLATIONS[lang].saved_profile,
          }),
        );
      },
      (error) => {
        // dispatch(success(values));
        // cookies.utils.removeAuth();

        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request() {
    return { type: userConstants.UPDATE_USER_ADDRESS_REQUEST };
  }
  function success(address) {
    return { type: userConstants.UPDATE_USER_ADDRESS, address };
  }
  function failure(error) {
    return {
      type: userConstants.UPDATE_USER_ADDRESS_FAILURE,
      payload: error,
    };
  }
}
export function sendDataRecovery(values) {
  return (dispatch) => {
    dispatch(request());

    userService.sendDataRecovery(values).then(
      () => {
        dispatch(success(values));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request() {
    return { type: userConstants.REQUEST_RECOVER_PASSWORD };
  }
  function success(userDetails) {
    return { type: userConstants.SUCCESS_RECOVER_PASSWORD, userDetails };
  }
  function failure(error) {
    return { type: userConstants.FAILURE_RECOVER_PASSWORD, payload: { error } };
  }
}

export function checkCode(values) {
  return (dispatch, state) => {
    dispatch(request());

    userService.checkCode(values).then(
      () => {
        dispatch(success(values));

        userService.getUserDetails().then(
          (userDetails) => {
            dispatch(successLogin(userDetails));

            if (
              userDetails.firstName
              && userDetails.lastName
              && userDetails.telephone
              && userDetails.birthDate
              && userDetails.address
              && userDetails.agree1
            ) {
              history.push(`/${values.lang}/`);
              // } else {
              //   dispatch(update(values))
              // }
            } else {
              history.push(`/${values.lang}/profile`);
            }
          },
          (error) => {
            dispatch(failure(error.toString()));
            dispatch(alertCall({ type: 'danger', text: error.toString() }));
          },
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request() {
    return { type: userConstants.REQUEST_CHECK_CODE };
  }
  function success(userDetails) {
    return { type: userConstants.SUCCESS_CHECK_CODE, userDetails };
  }
  function successLogin(userDetails) {
    return { type: userConstants.LOGIN_SUCCESS, userDetails };
  }
  function update(userDetails) {
    return { type: userConstants.STEP_TO_UPDATE, userDetails };
  }
  function failure(error) {
    return { type: userConstants.FAILURE_CHECK_CODE, payload: { error } };
  }
}

export function hideErrorCode() {
  return (dispatch) => dispatch(
    (function () {
      return { type: userConstants.HIDE_CODE };
    }()),
  );
}

export function sendNewPassword(values) {
  return (dispatch) => {
    dispatch(request());

    userService.sendNewPassword(values).then(
      () => {
        dispatch(success(values));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request() {
    return { type: userConstants.REQUEST_SET_NEW_PASSWORD };
  }
  function success(userDetails) {
    return { type: userConstants.SUCCESS_SET_NEW_PASSWORD, userDetails };
  }
  function failure(error) {
    return { type: userConstants.FAILURE_SET_NEW_PASSWORD, payload: { error } };
  }
}

export function registerCompany(values) {
  return (dispatch) => {
    dispatch(request());

    userService.registerCompany(values).then(
      () => {
        dispatch(success(values));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request() {
    return { type: userConstants.REQUEST_NEW_COMPANY };
  }
  function success(userDetails) {
    return { type: userConstants.SUCCESS_NEW_COMPANY, userDetails };
  }
  function failure(error) {
    return { type: userConstants.FAILURE_NEW_COMPANY, payload: { error } };
  }
}

export function contact(values) {
  return (dispatch) => {
    dispatch(request());

    userService.contact(values).then(
      () => {
        dispatch(success(values));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: userConstants.REQUEST_CONTACT };
  }
  function success(userDetails) {
    return { type: userConstants.SUCCESS_CONTACT, userDetails };
  }
  function failure(error) {
    return { type: userConstants.FAILURE_CONTACT, payload: { error } };
  }
}

export function sendNumber(phone, lang) {
  return (dispatch) => {
    dispatch(request());

    userService.sendNumber(phone, lang).then(
      () => {
        dispatch(success(phone));
      },
      (error) => {
        dispatch(success(phone));

        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: userConstants.LOGIN_SENT_PHONE_REQUEST };
  }
  function success(phone) {
    return { type: userConstants.LOGIN_SENT_PHONE_SUCCESS, phone };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_SENT_PHONE_FAILURE, payload: { error } };
  }
}

export function sendMail(mail, lang) {
  return (dispatch) => {
    dispatch(request());

    userService.sendMail(mail, lang).then(
      () => {
        dispatch(success(mail));
      },
      (error) => {
        dispatch(success(mail));

        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: userConstants.LOGIN_SENT_MAIL_REQUEST };
  }
  function success(phone) {
    return { type: userConstants.LOGIN_SENT_MAIL_SUCCESS, mail };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_SENT_MAIL_FAILURE, payload: { error } };
  }
}

export function setupPreviousStep() {
  return (dispatch) => {
    dispatch(setupPreviousStep());
  };

  function setupPreviousStep() {
    return { type: userConstants.LOGIN_SENT_PHONE_PREVIOUS_STEP };
  }
}

export function closeSuccessWindow() {
  return (dispatch) => {
    dispatch(closeSuccessWindow());
  };
  function closeSuccessWindow() {
    return { type: userConstants.REQUEST_CLOSE_SUCCESS_WINDOW };
  }
}

export function setupStepForgotPass(step) {
  return (dispatch) => {
    dispatch(setup(step));
  };

  function setup(step) {
    return { type: userConstants.SETUP_FORGOT_STEP, step };
  }
}

export function getUserNotifications() {
  return (dispatch) => {
    userService.getUserNotifications().then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: userConstants.GET_NOTIFICATIONS, data };
  }
}

export function clearNotifications() {
  return (dispatch) => {
    userService.clearNotifications().then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success() {
    return { type: userConstants.CLEARED_NOTIFICATIONS };
  }
}

export function getUserTransactions(search) {
  return (dispatch) => {
    userService.getUserTransactions(search).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: userConstants.GET_TRANSACTIONS, data };
  }
}

export function makeRead(id) {
  return (dispatch) => {
    userService.makeRead(id).then(
      () => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(id) {
    return { type: userConstants.MAKE_READ, id };
  }
}

export function getUserPaymentCard() {
  return (dispatch) => {
    userService.getUserPaymentCard().then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: userConstants.GET_PAYMENTS_CARD, data };
  }
}

export function removeUserPaymentCard(id) {
  return (dispatch) => {
    userService.removeUserPaymentCard(id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: userConstants.GET_PAYMENTS_CARD, data };
  }
}
export function createUserPaymentCard(data, language) {
  return (dispatch) => {
    // dispatch(requestStart(userConstants.UPDATE_USER_TRANSACTIONS))

    userService
      .createUserCard(data)
      .then((newUserPaymentCard) => {
        dispatch({
          type: userConstants.CLEARED_NOTIFICATIONS,
          payload: newUserPaymentCard,
        });
        // userService
        //   .getUserDetails()
        //   .then((userTransactions) =>
        //     dispatch(updateStoredUserDetails(userTransactions)),
        //   )
        dispatch(
          alertCall({
            type: 'success',
            text: TRANSLATIONS[language].userTransactions_updated,
          }),
        );
      })
      .catch((error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      });
    // .finally(() => {
    //   dispatch(requestEnd(userConstants.UPDATE_USER_TRANSACTIONS))
    // })
  };
}

export function updateUserPaymentCard(data, language) {
  return (dispatch) => {
    // dispatch(requestStart(userConstants.UPDATE_USER_TRANSACTIONS))

    userService
      .updateUserCard(data)
      .then((updateUserPaymentCard) => {
        dispatch({
          type: userConstants.CLEARED_NOTIFICATIONS,
          payload: updateUserPaymentCard,
        });
        // userService
        //   .getUserDetails()
        //   .then((userTransactions) =>
        //     dispatch(updateStoredUserDetails(userTransactions)),
        //   )
        dispatch(
          alertCall({
            type: 'success',
            text: TRANSLATIONS[language].userTransactions_updated,
          }),
        );
      })
      .catch((error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      });
    // .finally(() => {
    //   dispatch(requestEnd(userConstants.UPDATE_USER_TRANSACTIONS))
    // })
  };
}

export function logout(lang) {
  cookies.utils.removeAuth();
  history.push(`/${lang}/`);
  return { type: userConstants.LOGOUT };
}
