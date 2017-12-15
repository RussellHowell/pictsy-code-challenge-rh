import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Album extends Component{

state = {
  comments: this.props.comments
}

  render( ){

    const submitCommentHandler = (event) => {
      event.preventDefault();
        //TODO - ADD VALIDATION
        //TODO - cannot pass referrence to comment obj or else it overwrites in parent state - make this less ugly
      this.props.comments.push({username: newComment.username, text: newComment.text});
      this.setState({
        comments: this.props.comments
      })
    }

    let newComment = {
      username: "",
      text: ""
    }

    const updateUsername = (event) => newComment.username = event.target.value;

    const updateComment = (event) =>  newComment.text = event.target.value;

    //TODO - add key to comments
    return(
      <div>
        <Paper  elevation={4}>
          <Typography type="headline" component="h3">
            <ul>
              {
                 this.state.comments.map((comment) => {
                  return <li><h4>{comment.username}</h4> <p>{comment.text}</p></li>
                })
              }
            </ul>
          </Typography>
          <form onSubmit={submitCommentHandler}>
          <TextField
                 label="Username"
                 id="myField"
                 helperText="required field"
                 onChange={updateUsername}
               />
           <TextField
                  label="Comment"
                  id="margin-none"
                  helperText="required field"
                  multiline={true}
                  rows={3}
                  onChange={updateComment}
                />
                <Button type="submit">Comment</Button>
            </form>
        </Paper>
      </div>
    );
  }
}

Album.propTypes = {
  comments: PropTypes.array.isRequired
};

export default (Album);
