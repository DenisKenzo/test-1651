import React from 'react';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from '../../../_components/TranslationContainer';

import './AdditionalCouponDetails.scss';

function AdditionalCouponDetails({ coupon, language }) {
  const en = language === 'en';
  return (
    <div className="row additional-blocks AdditionalCouponDetails">
      <div className="col-lg-4 col-md-12 mt-sm-4 mt-lg-0">
        <h3>
          {' '}
          <TranslationContainer translationKey="branches" />
          {' '}
        </h3>

        <div className="mt-4">
          <p className="font-weight-bold text-branches">
            <TranslationContainer translationKey="following_branches" />
          </p>
        </div>
        <div className="d-flex mt-3 flex-wrap">
          {coupon && coupon.branches.length > 0 ? (
            coupon.branches.map((branch, index) => (
              <div className="branch mb-2" key={index}>
                {' '}
                <button className="btn btn-primary btn-tag">
                  {branch}
                </button>
                {' '}
              </div>
            ))
          ) : (
            <TranslationContainer translationKey="no_branches" />
          )}
        </div>
      </div>
      <div className="col-lg-4 col-md-12 mt-sm-4 mt-lg-0">
        <h3>
          <TranslationContainer translationKey="fine_print" />
        </h3>

        <div className="mt-4 small-font">
          <p className="pre-line">
            {' '}
            {coupon && coupon.smallLetters}
            {' '}
          </p>
        </div>
      </div>
      <div className="col-lg-4 col-md-12 mt-sm-4 mt-lg-0">
        <h3>
          {' '}
          <TranslationContainer translationKey="terms_of_use" />
          {' '}
        </h3>
        <div className="mt-4 small-font">
          <p className="pre-wrap">{coupon && coupon.termsOfUse}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(AdditionalCouponDetails);
