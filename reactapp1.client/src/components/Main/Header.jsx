import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import IconButton from '@mui/material/IconButton';

import { openCartMenu, openLoginMenu } from '../../store/actions';
import PopupMenu from '../Menu/PopupMenu';

import  ScalesLogo  from '@/assets/svg/img-scales.svg?react';
import  TeleLogo  from '@/assets/svg/img-telephone.svg?react'
import userlogo from "../../assets/svg/user.svg"

import '../../assets/styles/body.css'
import '../../assets/styles/header.css';







const Header = ({    }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useSelector(state => state.cart.cartItems);

  const [cartItemsCount, setItemsCount] = useState(cartItems.length);
  useEffect(() => {
    setItemsCount(cartItems.length)
  }, [cartItems])

  const dispatch = useDispatch();

  

  
  return (
    <header>
    <div className ='top-box'>
    <div className='header__logo'>
    <a href="/">
    SunWay
    </a>

    </div>
      
      <ul className = "header__nav">
        <li className = "header__nav-item"  > <a href="/" className = "header__nav-link" >Головна</a></li>
        <li className = "header__nav-item" href="" ><a  href="about-us" className = "header__nav-link">Про нас</a></li>
        <li className = "header__nav-item" href="" ><a className = "header__nav-link">Контакти</a></li>
        <li className = "header__nav-item" href="" ><a className = "header__nav-link">Оплата і доставка</a></li>
        <li className = "header__nav-item" href="" ><a className = "header__nav-link">Гарантія</a></li>
        <li className = "header__nav-item" href="" ><a className = "header__nav-link">Техпідтримка</a></li>      
      

        
      
     
     </ul>

        
    </div >


    <div className='header__bottom' >
 
    <div className='container header__bottom-box'>
    <div className='header__bottom-left'>
      
    <div className='header_menu'>
    <PopupMenu/>
    </div>
    <form className="header__search"  method="GET" >
                    <input type="text" placeholder="Шукати" className="search-input" name="search" />

                    <div className="header__search__loader" >
                        <span className=""></span>
                    </div>



                   
                    <button className="btn_search" type="button" >Знайти</button>
                  
                 
    </form>
   


   
    </div>

    <div className='header__bottom-right'>
      <div className='header__phones' 
      
      onMouseEnter={()=>{setIsHovered(true);
      
      }}
      onMouseLeave={()=>{setIsHovered(false)}}
      >
      <TeleLogo></TeleLogo>
      <a href="tel:0975231242" className="header__phones-active js-change-view-mobile-number">
                        <span className="number" data-hero="true">097 523 1242</span>
                       
                    </a>
      <ul className="header__phones-list" style={ {  visibility:isHovered?"visible":"hidden", opacity:isHovered?1:0 }} >

                       <li><a href="tel:0975231242">0975231242</a></li> 
                        <li>
                            <a href="tel:0975231242" className="js-change-view-mobile-number">
                                <span className="__number">0975231242</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:0975231242" className="js-change-view-mobile-number">
                                <span className="__number">0975231242</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:0975231242" className="js-change-view-mobile-number">
                                <span className="__number">0975231242</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:0975231242" className="js-change-view-mobile-number">
                                <span className="__number">0975231242</span>
                            </a>
                        </li>
                        <li className="paymant">
                            <span className="header__phones-paymant">Згідно з тарифами вашого оператора</span>
                        </li>

                    </ul>

      </div>



    <div className='header__basket-list'>
    <div className='header__basket-item'>
    <IconButton onClick={()=>{ dispatch(openLoginMenu())}}>

                <img src={userlogo} alt="Описание изображения"/>                
          
</IconButton>
</div>

        <div className='header__basket-item'>
      <IconButton>

        <FavoriteBorderIcon></FavoriteBorderIcon>
      </IconButton>
      </div>


      <div className='header__basket-item'>

      <IconButton   >
      <ScalesLogo>        
      </ScalesLogo>
      </IconButton>

  
   


      </div>


      <div className='header__basket-item'>
      <IconButton onClick={()=>{
  
        dispatch(openCartMenu());
      }} >

        <LocalGroceryStoreOutlinedIcon></LocalGroceryStoreOutlinedIcon>
      </IconButton>
      <span className='header__basket-item_count' style={{
    visibility : cartItemsCount ?'visible' : 'hidden',

  }}>
          {cartItemsCount}
        </span>
      
      </div>

      </div>




    </div>

    </div>
    </div>  
    
    </header>
    
  );
};

export default Header;