import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import {primary} from 'variables';

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const CancelButton = styled(RaisedButton)`
  background-color: ${primary};
`;

class RaceForm extends Component {
  constructor(props) {
    super(props);

    console.log(props.race);
    this.state = {
      ...props.race,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, event) {
    console.log(event.target);
    this.setState({[key]: event.target.value});
  }

  handleSubmit(event) {
    console.log(`A name was submitted: ${this.state.name}`);
    event.preventDefault();
  }

  render() {
    const {onCancel} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={e => this.handleChange('name', e)} />
        </label>
        <Buttons>
          <CancelButton label="Cancel" backgroundColor={primary} onClick={onCancel} />
          <RaisedButton label="Submit" type="submit" />
        </Buttons>
      </form>
    );
  }
}
RaceForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  race: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
};
RaceForm.defaultProps = {
  disabled: true,
};

export default RaceForm;
