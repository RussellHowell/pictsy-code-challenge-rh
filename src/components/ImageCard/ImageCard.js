import React from 'react';
import PropTypes from 'prop-types';

import styleClasses from './ImageCard.css';

import { Paper, Badge, withStyles } from 'material-ui';
import { Comment } from 'material-ui-icons';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';

const styles = theme => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    marginRight: 5
  },
});

const imageCard = ({ onClick, album }) => {

const {src, height, width}  = album.images[0]

//calculate new image height based off of column width;
let resHeight = (height*500)/width;

const handleClick = () => {
    onClick(album.id);
}

return (
    <Paper onClick={handleClick} className={styleClasses.container}  elevation={4}>
      <img className={styleClasses.image} style={{height: resHeight}} src={src}/>
      <div className={styleClasses.albumInfo}>
        <span className={styleClasses.albumTitle}>{album.title}</span>
        <span className={styleClasses.commentInfo}>
        <Badge className={styles.badge} badgeContent={album.comments.length} color="primary">
          <Comment/>
        </Badge>
        </span>
      </div>
    </Paper>
  );
}

  imageCard.propTypes = {
    album: PropTypes.object.isRequired,
  };

export default withStyles(styles)(imageCard);
