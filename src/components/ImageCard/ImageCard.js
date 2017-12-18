import React from 'react';
import PropTypes from 'prop-types';

import styleClasses from './ImageCard.css';

import { Badge, withStyles, Typography} from 'material-ui';
import { Comment } from 'material-ui-icons';
import Img from 'react-image';

const styles = theme => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    marginRight: 5
  },
});

const imageCard = ({ onClick, album }) => {

const {src, height, width}  = album.images[0];

//calculate new image height based off of column width;
let resHeight = (height*500)/width;

const handleClick = () => {
    onClick(album.id);
}

return (
    <div onClick={handleClick} className={styleClasses.container}  >
      <img className={styleClasses.image} style={{height: resHeight}} src={src}/>
      <div className={styleClasses.albumInfo}>
      <Typography type='body2' noWrap={true} >
        <span className={styleClasses.albumTitle}>{album.title}</span>
      </Typography>
        <div className={styleClasses.commentInfo}>
        <Badge className={styles.badge} badgeContent={album.comments.length} color='primary'>
          <Comment/>
        </Badge>

        </div>
      </div>
    </div>
  );
}

  imageCard.propTypes = {
    album: PropTypes.object.isRequired,
  };

export default withStyles(styles)(imageCard);
