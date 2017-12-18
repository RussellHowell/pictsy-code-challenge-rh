import React from 'react';
import PropTypes from 'prop-types';
import styleClasses from './CommentsDrawer.css'
import { Comment, PermIdentity } from 'material-ui-icons';
import { Typography, TextField, Button, Drawer, Paper, List, ListItem, ListItemText, Avatar} from 'material-ui';



const commentsDrawer = ({drawerToggle, show, comments, onCommentSubmit, stagedCommentChanged}) => {

  //TODO - quick fix for list key error, fix later
  let commentKey=0;

  return(
    <Drawer keepMounted="true" anchor="right" open={show} onRequestClose={drawerToggle(false)}>
       <div className={styleClasses.commentsHeader}>
         <h1> Comments</h1>
        </div>
         <Paper className={styleClasses.commentsListContainer} elevation={3}>
          <List>
           {
              comments.map((comment) => {
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
         <form className={styleClasses.commentForm} onSubmit={onCommentSubmit}>
         <TextField className={styleClasses.commentInput}
                label="Username"
                name="username"
                onChange={stagedCommentChanged}
              />
          <TextField className={styleClasses.commentInput}
                 label="Comment"
                 name="text"
                 multiline={true}
                 rows={3}
                 onChange={stagedCommentChanged}
               />
               <Button className={styleClasses.commentButton} raised={true} type="submit">Comment</Button>
           </form>
       </div>
     </Drawer>

  );
}

export default commentsDrawer;
