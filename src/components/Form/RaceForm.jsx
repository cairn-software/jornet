import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import {createRace, updateRace} from 'state/races';
import {primary} from 'variables';

const Form = styled.form`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const CancelButton = styled(RaisedButton)`
  background-color: ${primary};
`;

class RaceForm extends Component {
  render() {
    const {create, handleSubmit, onCancel, update} = this.props;

    const onSubmit = values => {
      return values.id ? update(values.id, values) : create(values);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field component="input" name="name" placeholder="Name" type="text" />
        <Field component="input" name="type" placeholder="Type" type="text" />
        <Field component="input" name="website" placeholder="Website" type="text" />
        <Field component="input" name="distance" placeholder="Distance" type="text" />
        <Field component="input" name="location" placeholder="Location" type="text" />
        <Field component="input" name="latitude" placeholder="Latitude" type="text" />
        <Field component="input" name="longitude" placeholder="Longitude" type="text" />
        <Field component="input" name="start_date" placeholder="Race Date" type="text" />
        <Buttons>
          <CancelButton label="Cancel" backgroundColor={primary} onClick={onCancel} />
          <RaisedButton label="Submit" type="submit" />
        </Buttons>
      </Form>
    );
  }
}
RaceForm.propTypes = {
  create: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};
RaceForm.defaultProps = {
  disabled: true,
};

const mapDispatchToProps = dispatch => ({
  create: race => dispatch(createRace(race)),
  update: (id, race) => dispatch(updateRace(id, race)),
});

export default connect(null, mapDispatchToProps)(reduxForm({form: 'RaceForm', enableReinitialize: true})(RaceForm));
