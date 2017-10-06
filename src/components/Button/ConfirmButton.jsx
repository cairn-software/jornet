import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {equals} from 'ramda';

class ConfirmButton extends Component {
  constructor(props) {
    super(props);
    this.state = {confirm: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equals(this.state, nextState) || !equals(this.props, nextProps);
  }

  toggle = () => this.setState({confirm: !this.state.confirm});

  toggleOff = () => this.setState({confirm: false});

  render() {
    const {onClick} = this.props;

    const onClickWrapper = () => {
      this.toggle();
      onClick();
    };

    return (
      <RaisedButton
        type="button"
        disabled={this.props.disabled}
        label={this.state.confirm ? 'Are you sure?' : this.props.label}
        onClick={this.state.confirm ? onClickWrapper : this.toggle}
        onMouseLeave={this.toggleOff}
        backgroundColor={'red'}
      />
    );
  }
}
ConfirmButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  flat: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ConfirmButton;
