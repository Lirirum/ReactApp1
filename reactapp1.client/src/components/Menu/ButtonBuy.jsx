import React,{useState,Button,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/styles/product.css';
import { addToCart } from '../../store/actions';


const ButtonBuy = ({ product }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
  
    const isInCart = !!cartItems && cartItems.some(item => item.id === product.id);
  

 
    const handleAddToCart = () => {      
      if (!isInCart) {        
        dispatch(addToCart(product));     
    }
    };
  


  return (


    

    <button onClick={handleAddToCart} className='btn product__button-buy'>
    <span>{ isInCart ?("Уже в корзині"):("Купити")}</span>
    </button>

  );
};

export default ButtonBuy;