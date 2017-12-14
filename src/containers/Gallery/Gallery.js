import React, {Component} from 'react';
import axios from 'axios';
import { Route, Switch, Router, Link } from 'react-router-dom';

import keys from '../../keys/keys';

import ImageGrid from '../../components/ImageGrid/ImageGrid';
import ImageCard from '../../components/ImageCard/ImageCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchBar from 'material-ui-search-bar';
import Album from '../../components/Album/Album'



class Gallery extends Component{

//default state
state = {
  query: null,
  albums: {},
  filter: {
    showNsfw: false,
    minViews: 0
  },
  showLoading: false,
  showGallery: false,
};

getAlbum(albumId){
  return this.state.albums[albumId];
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

          //extract necessary data on album's images
          let albumImages = album.is_album ? album.images.map((image) => ({id: image.id, link: image.link})) : [{id: album.id, link: album.link}];
          //chuck rest of data into memory
          albums[album.id] = {id: album.id, cover_img_uri: (album.is_album) ? album.images[0].link : album.link,
            title: album.title, account: album.account_url, is_album: album.is_album, images_count: album.images_count,
            images: albumImages};
      });

      this.setState({
        albums: albums,
        showLoading: false,
        showGallery: true
      });
  });
}

updateFilterHandler = (newFilter) => {
  this.setState({filter: newFilter})
}

albumClickedHandler = (albumId) => {
  //imgur api responds with first 3 images of an album only
  //retrieve remaining album images and navigate to album page/
  if(this.getAlbum(albumId).images_count > 3){
    axios({
      method: 'get',
      url: 'https://api.imgur.com/3/album/' + albumId + '/images',
      headers: {'Authorization': keys.imgur_clientId}
    }).then((res) => {
      //TODO - find a better way of updating specific album in state
      let tmpState = this.state;
      tmpState.albums[albumId].images = res.data.data.map((image) => ({id: image.id, link: image.link}));
      this.setState(tmpState);
    });
  }
}

  render( ) {

    let galleryList =  (Object.keys(this.state.albums).map((albumId) => {
        return <ImageCard onClick={this.albumClickedHandler} link={this.getAlbum(albumId).cover_img_uri} albumId={albumId} key={albumId}/>
      }));

    return(
      <div>
        <h2>Gallery</h2>
        <SearchBar
        onChange={(event) => this.setState({query: event})}
        onRequestSearch= {() => this.apiCallHandler()}
        style={{
        margin: '0 auto',
        maxWidth: 800}}/>

        <Switch>
          <Route exact path="/"  render={() => galleryList }/>
        </Switch>
      </div>
    );
  }
}


// <!-- <FilterPanel onFilterChanged= {this.updateFilterHandler} filterState={this.state.filter}/> -->
//<Route path="/album/:albumId" render = {()=><Album/>}/>
export default Gallery;
