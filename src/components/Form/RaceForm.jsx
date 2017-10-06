import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {formValueSelector, reduxForm, Field} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import ConfirmButton from 'components/Button/ConfirmButton';
import styled from 'styled-components';
import {isEmpty, isNil} from 'ramda';
import {createRace, deleteRace, updateRace} from 'state/races';
import {primary, primary2, primary3} from 'variables';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'components/Input/DatePicker';
import {SelectField, TextField} from 'redux-form-material-ui';
import {loadCoordinates} from 'state/maps';

const RaceHref = styled(FontIcon)`color: ${primary3} !important;`;

const Form = styled.form`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const FieldGroup = styled.div`display: flex;`;

const CancelButton = styled(RaisedButton)`background-color: ${primary};`;

class RaceForm extends Component {
  render() {
    const {
      coordinates,
      change,
      create,
      remove,
      generate,
      handleSubmit,
      initialValues,
      raceLocation,
      onClose,
      update,
    } = this.props;

    const onSubmit = values => (values.id ? update(values.id, values, onClose) : create(values, onClose));

    const required = value => (isEmpty(value) ? 'Required' : undefined);

    const setLatLng = newCoordinates => {
      change('latitude', newCoordinates.lat);
      change('longitude', newCoordinates.lng);
    };

    // will check if we already have the coordinates for the given address, and if not, will go out to try to find em
    const generateCoordinates = () =>
      !isNil(coordinates[raceLocation])
        ? setLatLng(coordinates[raceLocation])
        : generate(raceLocation, r => setLatLng(r.results[0].geometry.location));

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field component={TextField} name="name" floatingLabelText="Name" validate={required} />
          <Field name="type" component={SelectField} floatingLabelText="Type">
            <MenuItem value="Trail Run" primaryText="Trail Run" />
            <MenuItem value="Road Run" primaryText="Road Run" />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field component={TextField} name="location" floatingLabelText="Location" />
          <Field name="start_date" component={DatePicker} format={null} floatingLabelText="Race Date" />
        </FieldGroup>
        <FieldGroup>
          <Field component={TextField} name="distance" floatingLabelText="Distance" />
          <Field component={TextField} name="website" floatingLabelText="Website" />
          {initialValues.website && (
            <IconButton target="_blank" href={initialValues.website}>
              <RaceHref className="material-icons"> open_in_new </RaceHref>
            </IconButton>
          )}
        </FieldGroup>
        <FieldGroup>
          <Field component={TextField} name="latitude" floatingLabelText="Latitude" />
          <Field component={TextField} name="longitude" floatingLabelText="Longitude" />
        </FieldGroup>
        <Buttons>
          <div>
            <RaisedButton
              onClick={generateCoordinates}
              backgroundColor={primary2}
              icon={<FontIcon className="material-icons">cached</FontIcon>}
            />
          </div>
          <div>
            <CancelButton label="Cancel" backgroundColor={primary} onClick={onClose} />
            {initialValues.id && <ConfirmButton label="Delete" onClick={() => remove(initialValues.id, onClose)} />}
            <RaisedButton label="Submit" type="submit" />
          </div>
        </Buttons>
      </Form>
    );
  }
}
RaceForm.propTypes = {
  change: PropTypes.func.isRequired,
  coordinates: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  generate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  raceLocation: PropTypes.string,
  initialValues: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};
RaceForm.defaultProps = {
  disabled: true,
};

const selector = formValueSelector('RaceForm');

const mapStateToProps = state => ({
  raceLocation: selector(state, 'location'),
  coordinates: state.maps.coordinates,
});

const mapDispatchToProps = dispatch => ({
  create: (race, cb) => dispatch(createRace(race, cb)),
  update: (id, race, cb) => dispatch(updateRace(id, race, cb)),
  remove: (id, cb) => dispatch(deleteRace(id, cb)),
  generate: (address, cb) => dispatch(loadCoordinates(address, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form: 'RaceForm', enableReinitialize: true})(RaceForm),
);
