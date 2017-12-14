import React from 'react';
import { Route, Link } from 'react-router-dom';

const imageCard = (props) => (

  <div onClick={props.onClick.bind(null, props.albumId)}>
    <img src={props.link}/>
  </div>
  );

export default imageCard;
