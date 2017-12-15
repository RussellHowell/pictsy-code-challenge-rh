import React from 'react';
import PropTypes from 'prop-types';

const imageCard = (props) => (

  <div onClick={props.onClick.bind(null, props.albumId)}>
    <img src={props.src}/>
  </div>
  );

  imageCard.propTypes = {
    src: PropTypes.string.isRequired
  };

export default imageCard;
