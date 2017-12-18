import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter, Redirect } from 'react-router-dom';

import keys from '../../keys/keys';

import ImageCard from '../../components/ImageCard/ImageCard';
import FilterModal from '../../components/FilterModal/FilterModal';
import AlbumGallery from 'react-photo-gallery';
import StackGrid, { transitions } from "react-stack-grid";
import Album from './Album/Album';
import Measure from 'react-measure';
import Auxillary from '../../hoc/Auxillary';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { Sort }from 'material-ui-icons';
import { Button } from 'material-ui';
import styleClasses from './Gallery.css';


class Gallery extends Component{

//default state
state = {
  clickedAlbum: "",
  albums: {},
  filter: {
    section: 'hot',
    sort: 'viral',
    window: 'day',
    viral:true,
    mature:false
  },
  showLoading: false,
  showFilterModal: false,
  showGallery: false,
  albumsRendered: 10
};

//constants
RENDER_STEP_SIZE = 10; //how many album ImageCards to request at a time
GRID_COL_WIDTH = 300; //Size of grid columns

componentDidMount(){
  this.apiCallHandler();
}

getAlbum(albumId){
  return this.state.albums[albumId];
}

getComments(albumId){
  return this.state.albums[albumId].comments;
}

//API HANDLER
apiCallHandler = () => {
  //resovle filters
  let filters = this.state.filter;
  let filterString = [filters.section, "/", filters.sort, '/',
    (filters.section === 'top') ? [filters.window, '/'].join('')  : '' ,
     '1?showViral=', filters.viral, '&mature=', filters.mature].join('');
  console.log('https://api.imgur.com/3/gallery/' + filterString);
  axios({
    method: 'get',
    url: 'https://api.imgur.com/3/gallery/' + filterString,
    headers: {'Authorization': keys.imgur_clientId}
  }).then((res) => {
      //TODO - Handle Request Error
      //Parse response - array of imgur 'albums'
      //Some may not be albums, but rather single gifs or videos
      let resAlbums = res.data.data;
      // console.log(resAlbums[0].images);
      let albums = {}
      resAlbums.forEach((album) => {

        //prevent videos from being loaded - maybe support later
        if(album.type !== 'video/mp4')
        {
          //extract multiple images from albums
          let albumImages = [];
          if(album.is_album){
            albumImages = album.images.map((image) => ({
              id: image.id,
              src: image.link,
              height: image.height,
              width: image.width
            }));
          }
          else{
          albumImages = [{
              id: album.id,
              src: album.link,
              height: album.height,
              width: album.width
            }];
          }
          //chuck rest of data into memory
          albums[album.id] = {id: album.id,
            cover_img_src: (album.is_album) ? album.images[0].link : album.link,
            title: album.title,
            account: album.account_url,
            is_album: album.is_album,
            images_count: album.images_count,
            images: albumImages,
            comments:[]};
          }
      });

      this.setState({
        albums: albums,
        showLoading: false,
        showGallery: true
      }, () => console.log(this.state));

  });

}

updateFilterHandler = (newFilter) => {
  this.setState({filter: newFilter})
}

albumClickedHandler = (albumId) => {
    let tmpState = this.state;
    tmpState.clickedAlbum = albumId;
    //imgur api responds with first 3 images of an album only
    //retrieve remaining album images and navigate to album page
    if(this.getAlbum(albumId).images_count > 3){
      axios({
        method: 'get',
        url: 'https://api.imgur.com/3/album/' + albumId + '/images',
        headers: {'Authorization': keys.imgur_clientId}
      }).then((res) => {
        //TODO - find a better way of updating specific album in state
        let tmpState = this.state;
        tmpState.albums[albumId].images = res.data.data.map((image) =>
          ({
              id: image.id,
              src: image.link,
              height: image.height,
              width: image.width
            }));
            this.setState(tmpState, () => {
              this.props.history.push({
                pathname: '/album',
                hash: albumId
              });
            });
        console.log(this.getAlbum(albumId));
      });
    }else{
      this.setState(tmpState, () => {
        this.props.history.push({
          pathname: '/album',
          hash: albumId
        });
      });
    }
  }


galleryBottomReachedHandler(){
  //retrieve more albums
  let renderCount = this.state.albumsRendered;
  let albumCount = Object.keys(this.state.albums).length;
  //update render count - prevent array out-of-bounds execption
  renderCount = (renderCount + this.RENDER_STEP_SIZE > albumCount) ? albumCount : renderCount+this.RENDER_STEP_SIZE;
  this.setState({albumsRendered: renderCount});
}

toggleFilterHandler = (open) => () => {
  console.log('modal toggle');
  this.setState({
    showFilterModal: open
  });
}

filterChangeHandler = (field, value) => {
    this.setState({
      filter: {...this.state.filter, [field]: value}
    });
}

filterRequestHandler = () => {
  this.setState({showFilterModal: false});
  this.apiCallHandler();
}


  render( ) {

    //TODO - prevents applicaiton form loading "/album" route with no albums availiable - (make this cleaner)
    let redirect = null;
    if(this.state.clickedAlbum === "" && this.props.location.pathname !== "/"){
      redirect = <Redirect to="/"/>;
    }else {
      redirect = (
        //TODO - Change this so that the "/album" route is simply passed the entire album
        <Auxillary>
          <Route path="/album" render= {() => <Album comments={this.state.albums[this.state.clickedAlbum].comments}/>}/>
          <Route path="/album" render= {() => <AlbumGallery photos={this.getAlbum(this.state.clickedAlbum).images}/>}/>
        </Auxillary>
      )
    }


        let galleryList = [<div></div>];
        if(this.state.albums !== undefined){
          galleryList =  (Object.keys(this.state.albums).map((albumId) => {
            return <ImageCard onClick={this.albumClickedHandler} album={this.getAlbum(albumId)} albumId={albumId} key={albumId}/>
          }));
        }

    return(
      <div>
        <h2>Gallery</h2>
        <Route exact path="/" render={() =>
          <BottomScrollListener offset={200} onBottom={this.galleryBottomReachedHandler.bind(this)}>
          <Auxillary>
            <StackGrid
             columnWidth={500}
             gutterWidth={10}
             gutterWidth={10}
             appear={transitions.appear}
             appeared={transitions.appeared}
             leaved={transitions.leaved}
             >
              {galleryList.slice(0, this.state.albumsRendered)}
          </StackGrid>
          <Button fab onClick={this.toggleFilterHandler(true)} className={styleClasses.fab} color="primary" aria-label="filter">
            <Sort />
          </Button>
          <FilterModal show={this.state.showFilterModal} modalToggle={this.toggleFilterHandler} filterState={this.state.filter} filterChanged={this.filterChangeHandler} onFilterRequest={this.filterRequestHandler}/>
          </Auxillary>
        </BottomScrollListener>
        }/>
        {redirect}
      </div>
    );
  }
}

export default withRouter(Gallery);
