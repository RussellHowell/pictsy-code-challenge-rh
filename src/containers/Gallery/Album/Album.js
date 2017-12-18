import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styleClasses from './Album.css';

import { Typography, Button, Paper} from 'material-ui';
import CommentsDrawer from '../../../components/CommentsDrawer/CommentsDrawer';
import { Comment } from 'material-ui-icons';
import StackGrid, { transitions } from "react-stack-grid";


class Album extends Component{

state = {
  comments: this.props.album.comments,
  stagedComment: {
   username: '',
   text: ''
 },
  showCommentsDrawer: false,
  showLightBox: false
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
    //Quick key fix
    let imgKey = 0;
    let imageList = this.props.album.images.map((imageObj)=> { return <img className={styleClasses.image} src={imageObj.src} alt={this.props.album.title} key={["img_", imgKey++].join()}/>} );

    return(
      <div>
        <Paper  className={styleClasses.titlePane} levation={4}>
          <Typography align={'center'} type="headline" component="h3">
            {this.props.album.title}
          </Typography>
          <CommentsDrawer drawerToggle={this.toggleDrawer} show={this.state.showCommentsDrawer} comments={this.state.comments} onCommentSubmit={this.commentSubmittedHandler} stagedCommentChanged={this.stagedCommentChangedHandler} stagedComment={this.state.stagedComment}/>
        </Paper>
        <div className={styleClasses.titlePaneClear}>
        </div>
        <StackGrid
         columnWidth={"100%"}
         appear={transitions.appear}
         appeared={transitions.appeared}
         leaved={transitions.leaved}
         monitorImagesLoaded={true}
         >
          {imageList}
      </StackGrid>
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
