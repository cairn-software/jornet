import React, {PropTypes} from 'react';
import {DatePicker as MaterialDatePicker} from 'redux-form-material-ui';

/**
 * Wraps the standard MaterialUI/ReduxForm DatePicker and allows you to pass in a string as the initial value
 */
const DatePicker = props => {
  const shouldCastToDate = props.input.value && typeof props.input.value === 'string';
  return <MaterialDatePicker {...props} value={shouldCastToDate ? new Date(props.input.value) : null} />;
};
DatePicker.propTypes = {
  input: PropTypes.object.isRequired,
};

export default DatePicker;
