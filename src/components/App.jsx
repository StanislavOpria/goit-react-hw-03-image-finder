import { Component } from 'react';
import { getImages, getAdditionalImages } from 'services/serviceAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Buttom';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { AppWraper } from './App.styled';

export class App extends Component {
  state = {
    searchTerm: '',
    collection: [],
    page: 0,
    error: null,
    status: 'idle',
    isOpenModal: false,
    image: '',
  };

  handleSubmit = async searchTerm => {
    if (searchTerm.trim() !== '') {
      this.setState({ status: 'loading' });
      try {
        const collection = await getImages(searchTerm, 1);
        if (collection instanceof Error) {
          throw collection;
        }
        if (collection.length === 0) {
          this.setState(
            {
              status: 'idle',
              collection,
            },
            () => alert(`No images found for your request "${searchTerm}"`)
          );
          return;
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
    } else {
      return alert('Tap somthing for request');
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

  handleModal = image => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      image,
    }));
  };

  render() {
    const { collection, status, isOpenModal, image } = this.state;
    return (
      <AppWraper>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery collection={collection} openModal={this.handleModal} />
        {status === 'loading' && <Loader />}
        {status === 'resolved' && <Button onClick={this.addImages} />}
        {status === 'rejected' && <p>Somthing goes wrong... Try againe.</p>}
        {isOpenModal && <Modal image={image} closeModal={this.handleModal} />}
      </AppWraper>
    );
  }
}
