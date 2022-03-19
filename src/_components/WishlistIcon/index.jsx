import React from 'react';
import '../../assets/components/WishListIcon.scss';

function WishlistIcon(props) {
  const { isInWishlist, onClick } = props;
  return (
    <div className="wishlist-icon" onClick={(e) => onClick(e)}>
      <img src={`../assets/images/heart-32${isInWishlist ? '-fill' : ''}.svg`} />
    </div>
  );
}

export { WishlistIcon };
