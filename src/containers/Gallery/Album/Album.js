import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styleClasses from './Album.css';

import { Typography, TextField, Button, Drawer, Paper, List, ListItem, ListItemText, Avatar} from 'material-ui';
import CommentsDrawer from '../../../components/CommentsDrawer/CommentsDrawer';
import { Comment } from 'material-ui-icons';

class Album extends Component{

state = {
  comments: this.props.comments,
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
  console.log(this.state.stagedComment);
    //TODO - ADD VALIDATION
  this.setState({
    comments: [...this.state.comments, this.state.stagedComment],
    stagedComment: {username: '', text: ''}
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
          <CommentsDrawer drawerToggle={this.toggleDrawer} show={this.state.showCommentsDrawer} comments={this.state.comments} onCommentSubmit={this.commentSubmittedHandler} stagedCommentChanged={this.stagedCommentChangedHandler}/>
        </Paper>
        <Button fab onClick={this.toggleDrawer(true)} className={styleClasses.fab} color="primary" aria-label="comments">
          <Comment />
       </Button>
      </div>
    );
  }
}

Album.propTypes = {
  comments: PropTypes.array.isRequired
};

export default (Album);
