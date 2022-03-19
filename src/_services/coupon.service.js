
import { handleResponse } from '../_helpers';
import { authHeader } from '../_helpers/auth-header';

export const couponService = {
  getCoupon,
  getCouponsFooter,
  getFavoriteCoupons,
  addToFavourite,
  removeFromFavourite,
  removeAllCoupons,
  getCoupons,
  searchCoupons,
  getExtraCoupons,
};

function getCoupon(id) {
  const requestOptions = {
    method: 'GET',
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getCouponDetails?couponID[]=${id}`, requestOptions).then(handleResponse);
}

function getCouponsFooter() {
  const requestOptions = {
    method: 'POST',
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}interestingDeals`, requestOptions).then(handleResponse);
}

function getFavoriteCoupons() {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getFavoriteCoupons`, requestOptions).then(handleResponse);
}

function getCoupons(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    crossDomain: true,
    body: JSON.stringify(data),

  };

  return fetch(`${process.env.REACT_APP_API_URL}Coupons`, requestOptions).then(handleResponse);
}

function searchCoupons({ q, filterID, page }) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    crossDomain: true,

  };

  return fetch(`${process.env.REACT_APP_API_URL}search?searchText=${q}&page=${page}&filterID=${filterID}`, requestOptions).then(handleResponse);
}

function getExtraCoupons() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}specialCoupons`, requestOptions).then(handleResponse);
}

function addToFavourite(id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
    body: JSON.stringify({ couponID: id }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}addFavoriteCoupons`, requestOptions).then(handleResponse);
}

function removeFromFavourite(id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
    body: JSON.stringify({ couponID: [id] }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}deleteFavoriteCoupons`, requestOptions).then(handleResponse);
}

function removeAllCoupons(ids) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
    body: JSON.stringify({ couponID: ids }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}deleteFavoriteCoupons`, requestOptions).then(handleResponse);
}
