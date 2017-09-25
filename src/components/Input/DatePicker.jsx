import React, {PropTypes} from 'react';
import {DatePicker as MaterialDatePicker} from 'redux-form-material-ui';

/**
 * Wraps the standard MaterialUI/ReduxForm DatePicker and allows you to pass in a string as the initial value
 */
const DatePicker = props => {
  const toSafeValue = value => {
    if (typeof value === 'string') return new Date(props.input.value);
    if (typeof value === 'object') return value;
    return null;
  };
  return <MaterialDatePicker {...props} value={toSafeValue(props.input.value)} />;
};
DatePicker.propTypes = {
  input: PropTypes.object.isRequired,
};

export default DatePicker;
