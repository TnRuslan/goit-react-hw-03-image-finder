import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=31826070-5147e993357879bd9f8310722&image_type=photo&orientation=horizontal&page=${this.state.pageNumber}&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({
            images: data.hits,
            pageNumber: 2,
          });
        });
    }
  }

  onLoadMore = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=31826070-5147e993357879bd9f8310722&image_type=photo&orientation=horizontal&page=${this.state.pageNumber}&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            pageNumber: (prevState.pageNumber += 1),
          };
        });
      });
  };

  onClickImage = e => {
    console.log(e.target.src);
  };

  render() {
    return (
      <>
        <ul className={css.ImageGallery} onClick={this.props.openModal}>
          {this.state.images.map(image => {
            return (
              <ImageGalleryItem
                src={image.largeImageURL}
                key={image.id}
                alt={image.tags}
              />
            );
          })}
        </ul>
        <Button onLoadMore={this.onLoadMore} />
      </>
    );
  }
}
