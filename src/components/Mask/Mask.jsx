import React, {PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';

import {primary, primary1} from 'variables';

const MaskWrapper = styled.div`
  position: absolute;;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${primary1} !important;
  color: white;
  display: flex;
  font-size: 3rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MessageWrapper = styled.div`
  color: ${primary};
`;

const Progress = styled(CircularProgress)`
  color: ${primary};
`;

const Mask = ({message}) => {
  return (
    <MaskWrapper>
      <MessageWrapper>
        <h5>{message}</h5>
        <Progress size={100} thickness={5} />
      </MessageWrapper>
    </MaskWrapper>
  );
};
Mask.muiName = 'Mask';

Mask.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Mask;
