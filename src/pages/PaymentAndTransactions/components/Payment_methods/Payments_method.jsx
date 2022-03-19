import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { bindActionCreators } from 'redux';
import { object, string } from 'yup';
import { getUserPaymentCard, createUserPaymentCard } from '../../../../_actions';
import { TRANSLATIONS } from '../../../../_constants';
import CreditCardForm from '../../../../_forms/CreditCardForm';
import TranslationContainer from '../../../../_components/TranslationContainer';
import ToggleWrapper from '../../../../_components/ToggleWrapper';
import './Payments_method.scss';
import TransactionsModal from '../../../../_modals/TransactionsModal';
// import photo from '../../.././images/visa.svg';
import EditCard from './EditCard/EditCard';

class PaymentsMethod extends React.Component {
  state = {
    open: false,
    type: 'credit_card',
    saveAddress: false,
    defaultCard: false,
    edit: false,
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.location.pathname !== this.props.match.params.activeTab) {
  //     return true
  //   }
  // }

  data = [
    {
      id: '1',
      // img: photo,
      title: 'VISA(734) | NIS',
      cardNumber: 'XXXXXXXXXXXXX-734',
    },
    {
      id: '2',
      // img: photo,
      title: 'VISA(734) | NIS',
      cardNumber: 'XXXXXXXXXXXXX-734',
    },
  ];

  componentDidMount() {
    const { getUserPaymentCard } = this.props;

    getUserPaymentCard();
  }

  render() {
    const { language, userDetails, paymentsCards } = this.props;
    const schema = object().shape(
      this.state.type === 'credit_card' && {
        cardHolder: string().required(TRANSLATIONS[language].cardHolder_req),
        cardNumber: string().required(TRANSLATIONS[language].cardNumber_req),
        expires: string().required(TRANSLATIONS[language].expires_req),
        cvv: string().required(TRANSLATIONS[language].cvv_req),
        fullName: string().required(TRANSLATIONS[language].fullName_req),

        streetAddress: string().required(
          TRANSLATIONS[language].streetAddress_req,
        ),
        city: string().required(TRANSLATIONS[language].city_req),
        state: string().required(TRANSLATIONS[language].state_req),
        zipCode: string().required(TRANSLATIONS[language].zipCode_req),
      },
    );
    const initialVal = {
      cardHolder: userDetails.clientPayments?.credit_card?.cardHolder || '',
      cardNumber: userDetails.clientPayments?.credit_card?.cardNumber || '',
      expires: userDetails.clientPayments?.credit_card?.expires || '',
      cvv: userDetails.clientPayments?.credit_card?.cvv || '',
      saveAddress: false,
      fullName: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      state: '',
      closeHandler: this.handleClose,
    };
    const cards = (
      <div className="wrapMethod">
        <div className="d-flex renderCard">
          {this.data.map((d) => (
            <div className="cardWrapper mr-4 mt-7 align-items-center">
              <div onClick={this.editHandler} className="paymentsDetails">
                <div className="photo">
                  <img src={d.img} />
                </div>
                <div className="ssss">
                  <div className="cardTitle">{d.title}</div>
                  <div className="d-flex flex-column">
                    <span className="cardNumber">Card Number</span>
                    {d.cardNumber}
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex footerCard justify-content-between ">
                <div className="mt-2 text">Default Card</div>
                <ToggleWrapper
                  classElement="input-flex  mb-4"
                  label=""
                  opt1=""
                  opt2="defaultCard"
                  name="defaultCard"
                  checked={this?.state.defaultCard === d.id}
                  onToggle={() => this.handleToggleDefault(d.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex  cardAddNewWrapper  mt-7">
          <div className="flex-column">
            <div onClick={this.handleOpen} className="d-flex sadsdasad">
              <div className="photoAddNew">
                <img
                  src={`../assets/images/plus_circle.svg`}
                />
              </div>
              <div className="addNew">Add new payment method</div>
            </div>
            <hr />
            <div className="footerAddPayment">
              You can add 3 more paiment methods
            </div>
          </div>
        </div>
      </div>
    );
    const noCards = (
      <div>
        <div className="no_transactions_wrapper">
          <div className="d-flex justify-content-center">
            <img src={`../assets/images/not-payments.svg`} />
          </div>
          <div className="mt-2 d-flex justify-content-center ">
            <p className="no_transactions text-uppercase">
              <TranslationContainer translationKey="no_payments" />
            </p>
          </div>
          <div className="mt-2 d-flex justify-content-center">
            <p className="transactions_message">
              <TranslationContainer translationKey="payments_message" />
            </p>
          </div>
          <button
            onClick={this.handleOpen}
            className="btn btn-primary btn-lg wid-30 mt-4"
          >
            <TranslationContainer translationKey="add_payment" />
          </button>
        </div>
      </div>
    );
    const createCard = (
      <div>
        <div className="mt-2 d-flex justify-content-start">
          <div className="add-payment-message">
            <div className="mr-3 mb-1">
              <img
                src={`../assets/images/plus_circle.svg`}
              />
            </div>
            <p className="payment-text">
              <TranslationContainer translationKey="add_payment_message" />
            </p>
          </div>
        </div>
        <Formik
          component={CreditCardForm}
          validationSchema={schema}
          initialValues={initialVal}
          onSubmit={(values) => {
            const requestData = {
              clientPayments: values,
            };
            this.props.createUserPaymentCard(requestData, language);
            TransactionsModal.confirm({
              language,
              history: this.props.history,
              onClose: this.handleClose,
            });
          }}
          validateOnChange
          validateOnBlur={false}
        />
      </div>
    );
    return (
      <>
        {this.props.location.pathname.split('/')[4] === 'createCard'
          ? this.state.open && createCard
          : this.props.location.pathname.split('/')[4] === 'editCard'
            ? this.state.edit && (
            <div>
              <EditCard />
            </div>
            )
            : this.data
              ? cards
              : noCards}
      </>
    );
  }

  editHandler = () => {
    this.setState({ edit: true });
    this.props.history.push(
      `/${
        this.props.language
      }/payment-transactions`
        + '/payment_methods'
        + '/editCard',
    );
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.history.push(
      `/${
        this.props.language
      }/payment-transactions`
        + '/payment_methods'
        + '/createCard',
    );
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push(
      `/${this.props.language}/payment-transactions` + '/payment_methods',
    );
    this.props.getUserPaymentCard();
  };

  handleToggleDefault = (id) => {
    if (this.state.defaultCard === id) {
      this.setState({ defaultCard: '' });
    } else {
      this.setState({ defaultCard: id });
    }
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  userDetails: state.auth.user,
  paymentsCards: state.userReducer.paymentsCards,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserPaymentCard, createUserPaymentCard }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentsMethod),
);
