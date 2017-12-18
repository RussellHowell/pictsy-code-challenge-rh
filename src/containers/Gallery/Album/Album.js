import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styleClasses from './Album.css';

import { Typography, TextField, Button, Drawer, Paper, List, ListItem, ListItemText, Avatar} from 'material-ui';
import CommentsDrawer from '../../../components/CommentsDrawer/CommentsDrawer';
import { Comment } from 'material-ui-icons';

class Album extends Component{

state = {
  comments: this.props.album.comments,
  stagedComment: {
   username: '',
   text: ''
 },
  showCommentsDrawer: false
}

toggleDrawer = (open) => () => {
  this.setState({
    showCommentsDrawer: open
  });
}

commentSubmittedHandler = (event, comment) => {
  event.preventDefault();
  console.log(this.props.album);
  this.props.onCommentSubmit(this.props.album.id, this.state.stagedComment);

  //TODO - ADD VALIDATION
  this.setState({
    comments: [...this.state.comments, this.state.stagedComment],
    stagedComment: { ...this.state.stagedComment, text: ''}
  });
}

stagedCommentChangedHandler = (event) => {
    this.setState({
      stagedComment:{
        ...this.state.stagedComment,
        [event.target.name]: event.target.value
      }
    });
}

  render( ){
    return(
      <div>
        <Paper  elevation={4}>
          <Typography type="headline" component="h3">

          </Typography>
          <CommentsDrawer drawerToggle={this.toggleDrawer} show={this.state.showCommentsDrawer} comments={this.state.comments} onCommentSubmit={this.commentSubmittedHandler} stagedCommentChanged={this.stagedCommentChangedHandler} stagedComment={this.state.stagedComment}/>
        </Paper>
        <Button fab onClick={this.toggleDrawer(true)} className={styleClasses.fab} color="primary" aria-label="comments">
          <Comment />
       </Button>
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object.isRequired
};

export default (Album);
