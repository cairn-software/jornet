import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {isNil} from 'ramda';

const ROOT_PATH = './assets/img';

const Icon = ({img, href}) => {
  return isNil(href) ? (
    <img src={`${ROOT_PATH}/${img}`} />
  ) : (
    <Link to={href}>
      <img src={`${ROOT_PATH}/${img}`} />
    </Link>
  );
};
Icon.propTypes = {
  href: PropTypes.string,
  img: PropTypes.string.isRequired,
};

export default Icon;
