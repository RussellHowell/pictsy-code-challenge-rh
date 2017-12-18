import React from 'react';
import styleClasses from './CommentsDrawer.css'
import { PermIdentity } from 'material-ui-icons';
import { Typography, TextField, Button, Drawer, List, ListItem, ListItemText, Avatar, Toolbar} from 'material-ui';

const commentsDrawer = ({drawerToggle, show, comments, onCommentSubmit, stagedCommentChanged, stagedComment}) => {

  //TODO - quick fix for list key error, more robust soln needed
  let commentKey=0;

  return(
    <Drawer keepMounted={true} anchor="right" open={show} onClose={drawerToggle(false)}>
       <Toolbar className={styleClasses.commentsHeader}>
         <Typography type='subheading' color='inherit'>
           Comments
         </Typography>
        </Toolbar>
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
        <div className={styleClasses.commentsInputContainer}>
         <form className={styleClasses.commentForm} onSubmit={onCommentSubmit}>
         <TextField className={styleClasses.commentInput}
                label="Username"
                name="username"
                value={stagedComment.username}
                onChange={stagedCommentChanged}
              />
          <TextField className={styleClasses.commentInput}
                 label="Comment"
                 name="text"
                 multiline={true}
                 rows={3}
                 value={stagedComment.text}
                 onChange={stagedCommentChanged}
               />
               <Button className={styleClasses.commentButton} raised={true} type="submit">Comment</Button>
           </form>
       </div>
     </Drawer>

  );
}

export default commentsDrawer;
