import React, { Component } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";

class PhotoGallery extends Component {
  flickrApiKey = process.env.REACT_APP_FLICKR_API_KEY;
  photosPerPage = 24;

  constructor() {
    super();
    this.state = { photos: [] };
  }

  componentDidMount() {
    const search = this.props.match.params.search;

    this._getPhotos(search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      const search = this.props.match.params.search;
      this._getPhotos(search);
    }
  }

  _getPhotos(searchString) {
    if (!searchString) {
      this.setState({ photos: [] });
    } else {
      this.loading = true;
      this._retrievePhotoData(searchString).then(photos => {
        this.loading = false;
        this.setState({ photos });
      });
    }
  }

  /**
   * Gets photo data from the flickr api, filtered by the provided search string.
   *
   * @param {string} searchString - Filters photo data.
   * @private
   *
   * @returns (Promise|Array)
   */
  async _retrievePhotoData(searchString) {
    const flickrRoute = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.flickrApiKey}&content_type=&per_page=${this.photosPerPage}&tags=${searchString}&format=json&nojsoncallback=1`;

    try {
      const response = await fetch(flickrRoute);
      const myJson = await response.json();
      return this._makePhotoUrls(myJson.photos.photo);
    } catch {
      return [];
    }
  }

  async _makePhotoUrls(photoJson) {
    const photos = [];

    for (let item of photoJson) {
      let photoUrl = {
        id: item.id,
        url: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
        title: item.title
      };
      photos.push(photoUrl);
    }

    return photos;
  }

  photoGalleryHtml() {
    return !this.loading ? (
      <ul>
        {this.state.photos.map(photo => {
          return (
            <li key={photo.id}>
              <img src={photo.url} alt={photo.title} />
            </li>
          );
        })}
      </ul>
    ) : (
      <Loading></Loading>
    );
  }

  render() {
    return this.state.photos.length ? (
      this.photoGalleryHtml()
    ) : (
      <NotFound></NotFound>
    );
  }
}

export default PhotoGallery;
