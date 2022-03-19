import React from 'react';
import { Link } from 'react-router-dom';

import './Location.scss';

function Location({ language, coupon }) {
  const { company } = coupon;
  return (
    <>
      {company && (
        <div className="Location">
          <img src={`../assets/images/location.svg`} />

          <Link to={`/${language}/company/${company._id}`}>
            <p className="p-small">{company.name}</p>
          </Link>
        </div>
      )}
    </>
  );
}

export default Location;
