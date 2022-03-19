
import { handleResponse } from '../_helpers';
import cookies from '../_helpers/cookies';
import { authHeader } from '../_helpers/auth-header';

export const userService = {
  login,
  getUserDetails,
  getUserDetailsForLoggedIn,
  updateUserDetails,
  updateUserAddress,
  sendDataRecovery,
  getUserTransactions,
  createUserPaymentCard,
  updateUserPaymentCard,
  getUserPaymentCard,
  removeUserPaymentCard,
  checkCode,
  sendNewPassword,
  registerCompany,
  contact,
  sendNumber,
  sendMail,
  aboutContentSite,
  registrationLikeProviderContent,
  upBanner,
  upMobileBanner,
  bottomBanner,
  bottomMobileBanner,
  getUserNotifications,
  clearNotifications,
  makeRead,
  privacySite,
  termsSite,
  getPosNumber,
  getGoogleService,
  setupUserToken,
  contactSubject,
  updateCoord,
  getCoord,
  checkUserPhone,
};

function checkUserPhone(data) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify(data),
  };

  return fetch(`${process.env.REACT_APP_API_URL}checkUserPhone`, requestOptions).then(
    handleResponse,
  );
}

function login(data) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(`${process.env.REACT_APP_API_URL}LogIn`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      cookies.utils.setAuth(user.token);
      return user;
    });
}

function setupUserToken(token) {
  cookies.utils.setAuth(token);

  return new Promise((resolve, reject) => {
    cookies.utils.setAuth(token);
    resolve();
  });
}

function getUserDetails() {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getUserDetails`, requestOptions).then(
    handleResponse,
  );
}

function getUserDetailsForLoggedIn(userID) {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}siteProfile/${userID}`, requestOptions).then(
    handleResponse,
  );
}

function updateUserDetails(values, userId) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}siteProfile/${userId}`, requestOptions).then(
    handleResponse,
  );
}
function updateUserAddress(values, userId) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}location/updateAddress`, requestOptions).then(
    handleResponse,
  );
}

function sendDataRecovery(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}sendRecoveryCode`, requestOptions).then(
    handleResponse,
  );
}

function sendNumber(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}sendCode`, requestOptions).then(handleResponse);
}

function sendMail(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}sendCode`, requestOptions).then(handleResponse);
}

function registerCompany(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}registerCompany`, requestOptions).then(
    handleResponse,
  );
}

function contact(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}contactSupport`, requestOptions).then(
    handleResponse,
  );
}

function checkCode(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}checkCode`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      cookies.utils.setAuth(user.token);
      return user;
    });
}

function sendNewPassword(values) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      ...values,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}restorePassword`, requestOptions).then(
    handleResponse,
  );
}

function aboutContentSite() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}aboutContentSite`, requestOptions).then(
    handleResponse,
  );
}

function privacySite() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}privacyContentSite`, requestOptions).then(
    handleResponse,
  );
}

function termsSite() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}termsContentSite`, requestOptions).then(
    handleResponse,
  );
}

function registrationLikeProviderContent() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}registrationLikeProviderContent`,
    requestOptions,
  ).then(handleResponse);
}

function upBanner() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}upBanner`, requestOptions).then(handleResponse);
}
function upMobileBanner() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}upMobileBanner`, requestOptions).then(
    handleResponse,
  );
}
function bottomBanner() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}bottomBanner`, requestOptions).then(
    handleResponse,
  );
}
function bottomMobileBanner() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}bottomMobileBanner`, requestOptions).then(
    handleResponse,
  );
}
function getUserNotifications() {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getUserNotifications`, requestOptions).then(
    handleResponse,
  );
}

function clearNotifications() {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}notifications/delete`, requestOptions).then(
    handleResponse,
  );
}

function makeRead(id) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      notificationID: id,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}notifications/markAsRead`, requestOptions).then(
    handleResponse,
  );
}

function getUserTransactions(search) {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}getUserTransactions${search ? `?search=${search}` : ''}`,
    requestOptions,
  ).then(handleResponse);
}

function createUserPaymentCard(data) {
  const requestOptions = {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}createUserPaymentCard`, requestOptions).then(
    handleResponse,
  );
}

function updateUserPaymentCard(data) {
  const requestOptions = {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}updateUserPaymentCard`, requestOptions).then(
    handleResponse,
  );
}

function getUserPaymentCard() {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getUserPaymentCard`, requestOptions).then(
    handleResponse,
  );
}

function removeUserPaymentCard(id) {
  const requestOptions = {
    body: JSON.stringify(id),
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}removeUserPaymentCard`, requestOptions).then(
    handleResponse,
  );
}

function getPosNumber() {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}generateOrderTokken`, requestOptions).then(
    handleResponse,
  );
}

function updateCoord(coords) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    crossDomain: true,
    body: JSON.stringify({
      coordinates: coords,
    }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}location/update`, requestOptions).then(
    handleResponse,
  );
}

function getCoord() {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}location/last`, requestOptions).then(
    handleResponse,
  );
}

function contactSubject() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getSubjects`, requestOptions).then(
    handleResponse,
  );
}

function getGoogleService(token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
  };

  return fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
    requestOptions,
  ).then(handleResponse);
}
