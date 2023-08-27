import { Component } from 'react';
import { getImages, getAdditionalImages } from 'services/serviceAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Buttom';

export class App extends Component {
  state = {
    searchTerm: '',
    collection: [],
    page: 1,
  };

  handleSubmit = async searchTerm => {
    const collection = await getImages(searchTerm);
    if (collection.length === 0) {
      return alert(`No images found for request "${this.state.searchTerm}"`);
    }
    this.setState(prevState => ({
      searchTerm,
      collection,
      page: prevState.page + 1,
    }));
  };

  addImages = async () => {
    const { searchTerm, collection, page } = this.state;
    const additionalСollection = await getAdditionalImages(searchTerm, page);
    this.setState(prevState => ({
      collection: [...prevState.collection, ...additionalСollection],
      page: prevState.page + 1,
    }));
  };

  render() {
    const { collection } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery collection={collection} />
        <Button onClick={this.addImages}>Load more</Button>
      </div>
    );
  }
}
