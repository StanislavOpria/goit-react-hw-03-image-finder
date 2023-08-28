import { Component } from 'react';
import { getImages, getAdditionalImages } from 'services/serviceAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Buttom';
import { Audio } from 'react-loader-spinner';

export class App extends Component {
  state = {
    searchTerm: '',
    collection: [],
    page: 0,
    error: null,
    status: 'idle',
  };

  handleSubmit = async searchTerm => {
    this.setState({ status: 'loading' });
    try {
      const collection = await getImages(searchTerm, 1);
      if (collection instanceof Error) {
        throw collection;
      }
      if (collection.length === 0) {
        return alert(`No images found for request "${this.state.searchTerm}"`);
      }
      this.setState({
        searchTerm,
        collection,
        page: 1,
        status: 'resolved',
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  addImages = async () => {
    const { searchTerm, page } = this.state;
    this.setState({ status: 'loading' });
    try {
      const additionalСollection = await getImages(searchTerm, page + 1);
      if (additionalСollection instanceof Error) {
        throw additionalСollection;
      }
      this.setState(prevState => ({
        collection: [...prevState.collection, ...additionalСollection],
        page: prevState.page + 1,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { collection } = this.state;
    if (this.state.status === 'loading') {
      return (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      );
    }
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery collection={collection} />
        <Button onClick={this.addImages} />
      </div>
    );
  }
}
