import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      console.log(e.code);
      if (e.code === 'Escape') {
        this.props.toggleModal();
      }
    });
  }

  render() {
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
