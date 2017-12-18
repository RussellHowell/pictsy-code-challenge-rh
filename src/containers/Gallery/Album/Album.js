import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styleClasses from './Album.css';

import { Typography, TextField, Button, Drawer, Paper, List, ListItem, ListItemText, Avatar} from 'material-ui';
import { Comment, PermIdentity } from 'material-ui-icons';

class Album extends Component{

state = {
  comments: this.props.comments,
  newCommentUser: "",
  newCommentText: "",
  showCommentsDrawer: false
}

toggleDrawer = (open) => () => {
  this.setState({
    showCommentsDrawer: open
  });
}

commentSubmittedHandler = (event) => {
  event.preventDefault();
    //TODO - ADD VALIDATION
    //TODO - cannot pass referrence to comment obj or else it overwrites in parent state - make this less ugly
  this.props.comments.push({username: this.state.newCommentUser, text: this.state.newCommentText});
  this.setState({
    comments: this.props.comments,
    newCommentUser: "",
    newCommentText: ""
  });
}

updateUsername = (event) => this.setState({newCommentUser: event.target.value});

updateComment = (event) => this.setState({newCommentText: event.target.value});

  render( ){

    //TODO - quick fix for list key error, fix later
    let commentKey=0;
    return(
      <div>
        <Paper  elevation={4}>
          <Typography type="headline" component="h3">

          </Typography>
          <Drawer keepMounted="true" anchor="right" open={this.state.showCommentsDrawer} onRequestClose={this.toggleDrawer(false)}>
             <div className={styleClasses.commentsHeader}>
               <h1> Comments</h1>
              </div>
               <Paper className={styleClasses.commentsListContainer}levation={3}>
                <List>
                 {
                    this.state.comments.map((comment) => {
                     return (
                      <ListItem button key={["comment_", commentKey++].join()}>
                        <Avatar>
                          <PermIdentity/>
                        </Avatar>
                        <ListItemText primary={comment.username} secondary={comment.text}/>
                     </ListItem>
                    )
                   })
                 }
                 </List>
               </Paper>
              <div className={styleClasses.commentsInputContainer}>
               <form className={styleClasses.commentForm} onSubmit={this.commentSubmittedHandler}>
               <TextField className={styleClasses.commentInput}
                      label="Username"
                      id="myField"
                      onChange={this.updateUsername}
                      value={this.state.newCommentUser}
                    />
                <TextField className={styleClasses.commentInput}
                       label="Comment"
                       id="margin-none"
                       multiline={true}
                       rows={3}
                       onChange={this.updateComment}
                       value={this.state.newCommentText}
                     />
                     <Button className={styleClasses.commentButton} raised={true} type="submit">Comment</Button>
                 </form>
             </div>
           </Drawer>
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
