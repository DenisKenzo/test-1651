import React from 'react';
import connect from 'react-redux/es/connect/connect'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import Table from '../../../../_components/ReactTable';
import { TRANSLATIONS } from '../../../../_constants';
import { getUserTransactions } from '../../../../_actions';
import TranslationContainer from '../../../../_components/TranslationContainer';
import '../../../../assets/table.scss';
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css';
import './Transactions_history.scss';

import '../../../../assets/material.scss';

class TransactionsHistory extends React.Component {
  state = {
    searchTerm: '',
    startDate: '',
    endDate: '',
    focusedInput: false,
  };

  render() {
    const { language, transaction } = this.props;
    const { searchTerm } = this.state;
    const resize = window.innerWidth <= 428;
    const columns = [
      {
        Header: TRANSLATIONS[language].company,
        accessor: 'company',
        Cell: ({ value }) => <p className="company-transactions">{value}</p>,
      },
      {
        Header: TRANSLATIONS[language].purchase_date,
        accessor: 'purchaseDate',
        Cell: ({ value }) => <p className="purchase">{value}</p>,
      },
      {
        Header: TRANSLATIONS[language].payment_amount,
        accessor: 'amount',
        Cell: ({ value }) => (
          <div className="d-flex">
            <div className="currency-transactions">₪</div>
            <p className="amount">{value}</p>
          </div>
        ),
      },

      {
        Header: TRANSLATIONS[language].payment_method,
        accessor: 'paymentMethod',
        Cell: ({ value }) => <p className="paymentMethod">{value}</p>,
      },
      {
        Header: TRANSLATIONS[language].status,
        accessor: 'status',
        Cell: ({ value }) => (
          <div className="d-flex">
            <div className="mr-2 mt-1">
              <img
                src={
                    value === 'Success'
                      ? `../assets/images/success_transactions.svg`
                      : `../assets/images/cancel_transactions.svg`
                  }
              />
            </div>
            <p
              className={
                  value === 'Success' ? 'success-status' : 'canceled-status'
                }
            >
              {value}
            </p>
          </div>
        ),
      },
    ];

    return (
      <>
        {transaction.length ? (
          <div className="flex-column">
            <div className="inputWrap">
              <div className="d-flex input-search-transaction white-transaction align-items-start">
                <input
                  type="text"
                  placeholder={TRANSLATIONS[language].search_transaction}
                  value={searchTerm}
                  onChange={(e) => this.handleChange(e.target.value)}
                />
                <span className="zoom-transaction" />
              </div>

              <div className="d-flex">
                {resize ? (
                  <>
                    <div
                      className={
                        this.state.focusedInput ? 'modal-backdrop' : ''
                      }
                    />

                    <DateRangePicker
                      initialSettings={{
                        ranges: this.ranges,
                        locale: {
                          format: 'MMM/DD',
                        },
                        alwaysShowCalendars: true,
                      }}
                      onCancel={this.changeTextCancel}
                      onHide={this.changeTextCancel}
                      onApply={this.changeTextCancel}
                    >
                      <input
                        className="dateRangePickerWrapper"
                        onClick={this.changeText}
                      />
                    </DateRangePicker>
                  </>
                ) : (
                  <DateRangePicker
                    initialSettings={{
                      ranges: this.ranges,
                      locale: {
                        format: 'MMM/DD',
                      },
                      alwaysShowCalendars: true,
                    }}
                  >
                    <input id="foo" className="dateRangePickerWrapper" />
                  </DateRangePicker>
                )}
                <img
                  id="foo"
                  src={`../assets/images/Calendar.svg`}
                  className="img-calendar"
                />
              </div>
            </div>
            <Table manual data={transaction} columns={columns} />
          </div>
        ) : (
          <div className="no_transactions_wrapper">
            <div className="d-flex justify-content-center">
              <img
                src={`../assets/images/not-transactions.svg`}
              />
            </div>
            <div className="mt-2 d-flex justify-content-center ">
              <p className="no_transactions text-uppercase">
                <TranslationContainer translationKey="no_transactions" />
              </p>
            </div>
            <div className="mt-2 d-flex justify-content-center">
              <p className="transactions_message">
                <TranslationContainer translationKey="transactions_message" />
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  changeText = () => {
    this.setState({ focusedInput: true });
  };

  changeTextCancel = () => {
    this.setState({ focusedInput: false });
  };

  ranges = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'This week': [moment().startOf('week'), moment()],
    'Last week': [
      moment().subtract(1, 'week').startOf('week'),
      moment().subtract(1, 'week').endOf('week'),
    ],
    'Past two weeks': [
      moment().subtract(2, 'week').startOf('week'),
      moment().subtract(2, 'week').endOf('week'),
    ],
    'This month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'This Year': [moment().startOf('year'), moment()],
    'Last Year': [moment().subtract(1, 'year').add(1, 'day'), moment()],
  };

  handleChange = (value) => {
    this.setState({ searchTerm: value });
  };

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      const { getUserTransactions } = this.props;
      const { searchTerm } = this.state;
      getUserTransactions(searchTerm);
    }
  };

  handleSearchClick = () => {
    const { history, language, getUserTransactions } = this.props;
    const { searchTerm } = this.state;
    getUserTransactions(searchTerm);
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  transaction: state.userReducer.transactions,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserTransactions,
    },
    dispatch,
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory),
);
