import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from 'material-ui-search-bar';

import keys from '../../keys/keys';

import ImageCard from '../../components/ImageCard/ImageCard';


class Gallery extends Component{

state = {
  query: null,
  albums: [],
  showLoading: false,
  showGallery: false
  showNsfw: false;
  minViews: 0;

};


//API HANDLER
apiCallHandler = () => {
  //Clear album list
  this.setState({albums: []});
  //Display Loading Here
  axios({
    method: 'get',
    url: 'https://api.imgur.com/3/gallery/search/?q=' + this.state.query,
    headers: {'Authorization': keys.imgur_clientId}
  }).then((res) => {
      //TODO - Handle Request Error

      //Parse response - array of imgur 'albums'
      //Some may not be albums, but rather single gifs or videos
      let resAlbums = res.data.data;
      let albums = resAlbums.map((album) => {
        return {id: album.id, cover_img_uri: (album.is_album) ? album.images[0].link : album.link, title: album.title, account: album.account_url,
          meta: {datetime: album.datetime, nsfw: album.nsfw, viral: album.in_most_viral, views: album.views, is_album: album.is_album}};
      });

      this.setState({
        albums: albums,
        showLoading: false,
        showGallery: true
      });
  });
}

  render( ) {

    let galleryList = (
      this.state.albums.map((album) => {
        return <ImageCard link={album.cover_img_uri} key={album.id}/>
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

        {galleryList}

      </div>
    );
  }
}

export default Gallery;
