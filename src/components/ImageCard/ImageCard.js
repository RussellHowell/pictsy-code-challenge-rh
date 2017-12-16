import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import styleClasses from './ImageCard.css';
import { Comment } from 'material-ui-icons';

const imageCard = ({ index, onClick, photo, margin }) => {

return (
    <Paper className={styleClasses.container} style={{margin: margin}} elevation={4}>
      <img className={styleClasses.image} {...photo}/>
      <div className={styleClasses.albumInfo}>
        <span className={styleClasses.albumTitle}>Image title</span>
        <span className={styleClasses.commentInfo}>  <Comment/> <p></p> </span>
      </div>
    </Paper>
  );
}

  imageCard.propTypes = {
    src: PropTypes.string.isRequired
  };

export default imageCard;
