import React from 'react';
import TranslationContainer from '../../TranslationContainer';

import './Ribbon.scss';
import moment from 'moment';

function Ribbon({ coupon }) {
  const endDate = coupon && moment(coupon.expired_at);
  const currDate = coupon && moment().startOf('day').toDate();
  const daysToExpiry = coupon && Math.round(moment.duration(endDate.diff(currDate)).asDays());

  return (
    <div className="Ribbon">
      <span className="Ribbon-Wrap">
        {daysToExpiry === 0
          ? <TranslationContainer translationKey="ending_today" />
          : (
            <TranslationContainer
              translationKey="day_left"
              variableBlock={['num1']}
              valueBlock={[daysToExpiry]}
            />
          )}
      </span>
    </div>
  );
}

export default Ribbon;
