import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TranslationContainer from '../../../_components/TranslationContainer';

import './BaseInfo.scss';

function BaseInfo({ coupon, language }) {
  return (
    <div className="BaseInfo">
      <div className="BaseInfo-Title">{coupon.name}</div>

      <div className="BaseInfo-PriceWrap">
        {coupon.company
                && (
                <div className="BaseInfo-PriceWrap__Company">
                  <TranslationContainer translationKey="company_name" />
                  {' '}
&nbsp;
                  <Link to={`/${language}/company/${coupon.company._id}`}>
                    {coupon.company.name}
                  </Link>
                </div>
                )}
        <div className="BaseInfo-PriceWrap__Discount">
          <TranslationContainer translationKey="priceBeforeDiscount" />
          : &nbsp;
          <div className="Discount-Description">
            <span className="Discount-Description__Currency">₪</span>
            {coupon.priceBeforeDiscount}
          </div>
        </div>
      </div>

      <div className="BaseInfo-Descriptions">
        {coupon.description}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(BaseInfo);
