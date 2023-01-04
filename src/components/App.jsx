import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Oval } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchName: null,
    shovModal: false,
    modalImg: '',
  };

  hendlerFormSubmit = name => {
    console.log(name);
    this.setState({ searchName: name });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { shovModal: !prevState.shovModal };
    });
  };

  openModal = e => {
    const src = e.target.src;
    console.log(e.target.src);
    this.toggleModal();
    this.setState({ modalImg: src });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.hendlerFormSubmit} />
        <ImageGallery
          searchName={this.state.searchName}
          openModal={this.openModal}
        />
        <Oval
          height={40}
          width={40}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        {this.state.shovModal && (
          <Modal
            src={this.state.modalImg}
            alt={'cat'}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
