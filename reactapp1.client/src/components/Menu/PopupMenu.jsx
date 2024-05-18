import React, { useState, useEffect } from 'react';

import desktoplogo from "../../assets/svg/img-desktop.svg"
import laptoplogo from "../../assets/svg/img-laptop.svg"
import monitorlogo from "../../assets/svg/img-monitor.svg"
import videologo from "../../assets/svg/img-video.svg"
import keyboardlogo from "../../assets/svg/img-keyboard.svg"
import gamepadlogo from "../../assets/svg/img-gamepad.svg"

import '../../assets/styles/body.css';
import '../../assets/styles/popupMenu.css'; 




const PopupMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  

    const handleDocumentClick = (event) => {
      if (isOpen && !event.target.closest('.dropdown-menu')) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
     
      document.addEventListener('click', handleDocumentClick);

      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, [isOpen]);
  

  return (
    <div className="dropdown-menu">
      <button  id="catalog_btn" onClick={toggleMenu} type='button'>Каталог товарів</button>
      {isOpen && (
        <div className="dropdown-content">
          <ul className="dropdown-menu__list">
            <li className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="">
              <figure>
                <img src={desktoplogo} alt="Описание изображения"/>                
              </figure>
                Настільні комп'ютери
              </a> </li>
            <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={laptoplogo} alt="Описание изображения"/>                
              </figure>
                Ноутбуки
              </a></li>
            <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={monitorlogo} alt="Описание изображения"/>                
              </figure>
                Монітори
              </a></li>
            <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={videologo} alt="Описание изображения"/>                
              </figure>
                Комплетующі
              </a></li>  

              <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={keyboardlogo} alt="Описание изображения"/>                
              </figure>
                Периферія
              </a></li>

              <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={gamepadlogo} alt="Описание изображения"/>                
              </figure>
                Для геймерів
              </a></li>

              <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={videologo} alt="Описание изображения"/>                
              </figure>
                Комплетующі
              </a></li>

              <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={videologo} alt="Описание изображения"/>                
              </figure>
                Комплетующі
              </a></li>

              <li  className='dropdown-menu__item' >
              <a className='dropdown-menu__link' href="ProductDetail">
              <figure>
                <img src={videologo} alt="Описание изображения"/>                
              </figure>
                Комплетующі
              </a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;