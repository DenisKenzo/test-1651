import React, { useCallback, useMemo } from 'react';
import PaymentCard from 'react-payment-card-component';
import '../assets/_creditCard.scss';

const CreditCard = React.memo(({ values, flipped }) => {
  const brands = useMemo(
    () => ({
      amex: new RegExp('^3[47][0-9]{13}$'),
      visa: new RegExp('^4[0-9]{12}(?:[0-9]{3})?$'),
      china_union_pay:
        new RegExp('^62[0-9]{14}[0-9]*$') || new RegExp('^81[0-9]{14}[0-9]*$'),
      mastercard:
        new RegExp('^5[1-5][0-9]{14}$') || new RegExp('^2[2-7][0-9]{14}$'),
      discover:
        new RegExp('^6011[0-9]{12}[0-9]*$')
        || new RegExp('^62[24568][0-9]{13}[0-9]*$')
        || new RegExp('^6[45][0-9]{14}[0-9]*$'),
      diners: new RegExp('^3[0689][0-9]{12}[0-9]*$'),
      jcb: new RegExp('^35[0-9]{14}[0-9]*$'),
    }),
    [],
  );

  const creditCardType = useCallback(() => {
    const bin = values.cardNumber.split('-').join('');
    return (
      Object.keys(brands).find((item) => brands[item].test(bin)) || 'default'
    );
  }, [values.cardNumber]);

  return (
    <div className="col-md-5 mt-3 creditCard ">
      <PaymentCard
        bank="default"
        model="personnalite"
        type="black"
        brand={creditCardType()}
        number={values.cardNumber.split('-').join('')}
        cvv={values.cvv}
        holderName={values.cardHolder}
        expiration={values.expires}
        flipped={flipped}
      />
    </div>
  );
});

export default CreditCard;
