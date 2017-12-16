import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter, Redirect } from 'react-router-dom';

import keys from '../../keys/keys';

import ImageCard from '../../components/ImageCard/ImageCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import AlbumGallery from 'react-photo-gallery';
import Album from './Album/Album';
import Measure from 'react-measure';
import Auxillary from '../../hoc/Auxillary';


class Gallery extends Component{
constructor(){
  super();
  this.state = { width: -1 };
}
//default state
state = {
  query: null,
  clickedAlbum: "",
  albums: {},
  filter: {
    showNsfw: false,
    minViews: 0
  },
  showLoading: false,
  showGallery: false,
};

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
  //Clear album list
  this.setState({albums: []});
  //Display Loading Here
  axios({
    method: 'get',
    url: 'https://api.imgur.com/3/gallery/hot/viral/year/1?&showViral=true&mature=true&album_previews=true',
    headers: {'Authorization': keys.imgur_clientId}
  }).then((res) => {
      //TODO - Handle Request Error
      //Parse response - array of imgur 'albums'
      //Some may not be albums, but rather single gifs or videos
      let resAlbums = res.data.data;
      // console.log(resAlbums[0].images);
      let albums = {}
      resAlbums.forEach((album) => {
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
      this.setState(tmpState);
      console.log(this.getAlbum(albumId));
    });
  }

  this.setState({clickedAlbum: albumId}, () => {
    this.props.history.push({
      pathname: '/album',
      hash: albumId
    });
  });
}
  render( ) {
    const width = this.state.width;

    // let galleryList =  (Object.keys(this.state.albums).map((albumId) => {
    //     return <ImageCard onClick={this.albumClickedHandler} photo={this.getAlbum(albumId).images[0]} albumId={albumId} key={albumId}/>
    //   }));

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

    return(
      <div>
        <h2>Gallery</h2>

        <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
        ({measureRef}) => {
          if (width < 1 ){
            return <div ref={measureRef}></div>;
          }
          let columns = 1;
          if (width >= 600){
            columns = 2;
          }
          if (width >= 1024){
            columns = 3;
          }
          if (width >= 1824){
            columns = 4;
          }
          return <Route exact path="/"  render= {() => { return <div ref={measureRef}><AlbumGallery
            ImageComponent={ImageCard}

            photos={Object.keys(this.state.albums).map((key) => this.state.albums[key].images[0])}
            columns={columns}
            margin={5}
            />
            </div>
          }}/>
        }
        }
        </Measure>
        {redirect}
      </div>
    );
  }
}



export default withRouter(Gallery);
