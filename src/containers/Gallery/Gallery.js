import React, {Component} from 'react';
import axios from 'axios';
import keys from '../../keys/keys';

import ImageCard from '../../components/ImageCard/ImageCard';

class Gallery extends Component{

state = {
  albums: [],
  showLoading: false,
  showGallery: false
};


//API HANDLER
apiCallHandler = () => {
  //Display Loading Here
  axios({
    method: 'get',
    url: 'https://api.imgur.com/3/gallery/search/?q=cars', //TODO - GENERALIZE
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
      console.log(this.state); //TODO - remove log
  });
}

  render( ) {

    let galleryList = (
      this.state.albums.map((album) => {
        return <ImageCard link={album.cover_img_uri} key={album.id}/>
      }));

      console.log(galleryList);

    return(
      <div>
        <h2>Gallery</h2>
        <button onClick={this.apiCallHandler}>Make Api Call</button>
        <hr/>
        {galleryList}
      </div>
    );
  }
}

export default Gallery;
