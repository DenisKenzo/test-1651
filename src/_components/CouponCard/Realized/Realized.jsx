import React from 'react';
import { TRANSLATIONS } from '../../../_constants';

function Realized({ coupon, language }) {
  const { redemptions } = coupon;

  return (
    <>
      {redemptions !== 0 && (
      <div className="Realized">
        <p className="text-primary">
          {`${redemptions} ${(redemptions) === 1
					  ? TRANSLATIONS[language].realized_card_one
					  : TRANSLATIONS[language].realized_card}`}
        </p>
      </div>
      )}
    </>
  );
}

export default Realized;
