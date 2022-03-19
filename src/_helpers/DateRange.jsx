import React, { Component } from 'react';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
// import './react_dates_overrides.css';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { updateUser } from '../_actions';
import { TRANSLATIONS } from '../_constants';

class DateRange extends Component {
  state = {
    focused: false,
  };

  handleChange = (initialDate) => {
    const { onChange, initialDateId } = this.props;

    onChange(initialDateId, initialDate);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.language !== state.language) {
      moment.locale(props.language);
    }

    return null;
  }

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    let i;
    const years = [];
    for (i = moment().year(); i >= moment().year() - 100; i--) {
      years.push(
        <option value={i} key={`year-${i}`}>
          {i}
        </option>,
      );
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="year">
          <select
            value={month.year()}
            onChange={(e) => onYearSelect(month, e.target.value)}
          >
            {years}
          </select>
        </div>
        <div className="month">
          <select
            value={month.month()}
            onChange={(e) => onMonthSelect(month, e.target.value)}
          >
            {moment.months().map((label, value) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  render() {
    const { initialDate, initialDateId, language } = this.props;

    return (
      <SingleDatePicker
        showDefaultInputIcon
        renderMonthElement={this.renderMonthElement}
        // anchorDirection="right"
        // isRTL
        displayFormat={() => 'DD.MM.YYYY'}
        small
        openDirection="up"
        readOnly
        placeholder={TRANSLATIONS[language].date_of_birth}
        date={initialDate ? moment(initialDate, 'YYYY-MM-DD') : null}
        onDateChange={(date) => this.handleChange(date)}
        numberOfMonths={1}
        focused={this.state.focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
        id={initialDateId}
        maxDate={moment()}
        isOutsideRange={(day) => moment(day) >= moment()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(DateRange);
