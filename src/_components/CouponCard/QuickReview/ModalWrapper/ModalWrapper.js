import React, { useMemo } from 'react';

const ModalWrapper = ({
  open,
  showModal,
  children,
  quickViewData,
  onCloseQR,
}) => {
  const coupon = useMemo(() => quickViewData, [quickViewData]);
  return open ? children({ showModal, coupon }) : onCloseQR;
};

export default React.memo(ModalWrapper);
