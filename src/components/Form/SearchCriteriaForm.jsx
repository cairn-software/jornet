import React, {Component, PropTypes} from 'react';
import {formValueSelector, reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import {primary} from 'variables';
import MenuItem from 'material-ui/MenuItem';
import {SelectField, Slider, TextField} from 'redux-form-material-ui';
import DatePicker from 'components/Input/DatePicker';
import {createSearchCriteria} from 'state/search';
import {loadRaces} from 'state/races';
import {centerMapOnAddress} from 'state/maps';

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const CancelButton = styled(RaisedButton)`background-color: ${primary};`;

const SearchSummary = styled.p``;

const FieldGroup = styled.div`display: flex;`;

class SearchCriteriaForm extends Component {
  render() {
    const {centerMap, handleSubmit, formValues, onClose, searchRaces} = this.props;

    const onSubmit = criteria => {
      if (criteria.location) {
        centerMap(criteria.location);
      }
      const noLocationCriteria = Object.assign({}, criteria);
      delete noLocationCriteria.location;
      return searchRaces(noLocationCriteria);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field component={TextField} name="location" floatingLabelText="Location" />
        <Field name="type" component={SelectField} floatingLabelText="Type">
          <MenuItem value="Trail Run" primaryText="Trail Run" />
          <MenuItem value="Road Run" primaryText="Road Run" />
        </Field>
        <Field name="min_distance" component={Slider} min={0} max={100} step={5} />
        <Field name="max_distance" component={Slider} min={0} max={100} step={5} />
        <SearchSummary>
          {formValues.minDistance} - {formValues.maxDistance} miles
        </SearchSummary>
        <FieldGroup>
          <Field name="min_start_date" component={DatePicker} format={null} floatingLabelText="From Date" />
          <Field name="max_start_date" component={DatePicker} format={null} floatingLabelText="To Date" />
        </FieldGroup>
        <Buttons>
          <div>
            <CancelButton label="Cancel" backgroundColor={primary} onClick={onClose} />
            <RaisedButton label="Search" type="submit" />
          </div>
        </Buttons>
      </Form>
    );
  }
}
SearchCriteriaForm.propTypes = {
  centerMap: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  searchRaces: PropTypes.func.isRequired,
};

const selector = formValueSelector('SearchForm');

const mapStateToProps = state => ({
  initialValues: state.search.criteria,
  formValues: {
    location: selector(state, 'location'),
    type: selector(state, 'type'),
    minDistance: selector(state, 'min_distance'),
    maxDistance: selector(state, 'max_distance'),
  },
});

const mapDispatchToProps = dispatch => ({
  centerMap: address => dispatch(centerMapOnAddress(address)),
  setSearchCriteria: criteria => dispatch(createSearchCriteria(criteria)),
  searchRaces: criteria => dispatch(loadRaces(criteria)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form: 'SearchForm', enableReinitialize: true})(SearchCriteriaForm),
);
