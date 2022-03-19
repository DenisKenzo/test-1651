import React from 'react';
import { Link } from 'react-router-dom';
import locationSvg from '../../../assets/images/location.svg';

import './Location.scss';

function Location({ language, coupon }) {
  const { company } = coupon;
  return (
    <>
      {company && (
        <div className="Location">
          <img src={locationSvg} />

          <Link to={`/${language}/company/${company._id}`}>
            <p className="p-small">{company.name}</p>
          </Link>
        </div>
      )}
    </>
  );
}

export default Location;
