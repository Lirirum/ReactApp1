import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';


import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { closeCartMenu, removeFromCart } from '../../store/actions';

import '../../assets/styles/cartmenu.css'




const CartMenu = () => {
 


  const menuIsOpen = useSelector(state => state.cart.cartMenu);
  const products = useSelector(state => state.cart.cartItems);
  const productsPrice = useSelector(state => state.cart.cartItemsPrice);

  const dispatch = useDispatch();
  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };
     const enableScroll = () => {
      document.body.style.overflow = '';
    };
    if (menuIsOpen) {
      disableScroll();    }

    return () => {
      enableScroll();
    };
  }, [menuIsOpen]);





  return (
    <div>
   
 
          <CSSTransition
      in={menuIsOpen  }
      timeout={500}
      classNames={{
        enter: 'modal-enter',      
        exit: 'modal-exit',

      }}
      unmountOnExit

    >
    <div  className='modal__container'>
    <div className="modal__windows">
        <div className='modal__header'>
          
            <p className='cart-title'>Кошик</p>
            
            <IconButton onClick={()=>{
              dispatch(closeCartMenu())
            }}>
              <CloseIcon>

              </CloseIcon>
            </IconButton>


        </div>

    <div className='modal__content'>
    <div className='modal__content-container'>
    <ul className='cart-list'>
        {products.map((item, index) =>  

        <li >
        <div className='cart-item'>
            <div className='cart-product_body'>
            <div className='cart-item__img__container'>
            <img  className='cart-item__img' src={item.imageUrl}></img>
            
            </div>
          <div className='cart-product__main'>
            <div className='cart-product__title'>
            <p >{item.name}</p>
            </div>

            
            <div className='cart-product__price'>
              <span>{item.price}</span>
              <div className='cart-product__trash' >
              <IconButton onClick={()=>{
                       dispatch(removeFromCart(item.id))
              }} >
              <DeleteForeverIcon>

              </DeleteForeverIcon>
              </IconButton>
              </div>
              </div>
           </div>


            </div>
        </div>
    </li>)
}
   

    </ul>
    </div>
    <div className='cart-footer'>
      <div className='cart-price'>
        
        <span>Разом:</span>
        <span>{ productsPrice}₴</span>
         </div>
      <div className='cart__buttons'>
    <button   className='cont-buy__btn' onClick={()=>{
              dispatch(closeCartMenu())
            }}>Продовжити  покупки</button>
    <button  className='cart-buy__btn'>Оформити замволення</button>
    </div>
    </div>

    </div>
      
   
    </div>
    </div>
    </CSSTransition>
    </div>
  
   
  );
  
};

export default CartMenu;