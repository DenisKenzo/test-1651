import React from 'react';
import TranslationContainer from '../../../_components/TranslationContainer';
import moment from 'moment';

import './LimitedInfo.scss';
import { connect } from 'react-redux';

function LimitedInfo({ coupon, language }) {
  const endDate = coupon && coupon && moment(coupon.expired_at);
  const currDate = coupon && moment().startOf('day').toDate();
  const daysToExpiry = coupon
    && coupon
    && Math.round(moment.duration(endDate.diff(currDate)).asDays());
  const hebrew = language === 'he';
  const ru = language === 'ru';
  return (
    <div className={ru ? 'LimitedInfoRu' : 'LimitedInfo'}>
      <div className={ru ? 'LimitedInfo-ItemRu' : 'LimitedInfo-Item'}>
        <img src={`../assets/images/Check-circle.svg`} />
        <div className="wrapRealized">
          {coupon.redemptions > 0 && (
            <div className="Desc">{coupon.redemptions}</div>
          )}
          <div className="Title">
            <TranslationContainer translationKey="realized" />
          </div>
        </div>
      </div>
      <div className={ru ? 'LimitedInfo-ItemRu' : 'LimitedInfo-Item'}>
        <img src={`../assets/images/Calendar.svg`} />
        <div className="wrapRealized">
          <div className="Desc">
            {hebrew ? `בעוד ${daysToExpiry}` : daysToExpiry}

            {daysToExpiry > 1 ? (
              <>
                {' '}
                <TranslationContainer translationKey="days" />
              </>
            ) : (
              <>
                {' '}
                <TranslationContainer translationKey="day" />
              </>
            )}
          </div>
          <div className="Title">
            <TranslationContainer translationKey="deals_end" />
          </div>
        </div>
      </div>
      <div className={ru ? 'LimitedInfo-ItemRu' : 'LimitedInfo-Item'}>
        <img src={`../assets/images/time.svg`} />
        <div className="wrapRealized">
          <div className="Desc">
            <TranslationContainer translationKey="limited_time_desc" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
  isLogged: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(LimitedInfo);
