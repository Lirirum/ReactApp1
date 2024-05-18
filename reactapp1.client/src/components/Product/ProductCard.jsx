import React,{useState,Button,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { addToCart } from '../../store/actions';

import '../../assets/styles/product.css';





const ProductCard = ({ product }) => {

    const [imageUrl, setImagesUrl] = useState();
    useEffect(() => {
        getImage(product.imageUrl)
    }, []);
    async function getImage(imgUrl) {

        try {

            const response = await fetch(`/images/${imgUrl}`);
            if (!(response.ok)) {
                throw new Error(response.statusText);
            } 

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImagesUrl(url);

        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    }

  


    const cartItems = useSelector(state => state.cart.cartItems);

    const isInCart = !!cartItems && cartItems.some(item => item.id === product.id);

    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false);
    const svgHeartStyle = {  
      fontSize:'25px',
      fill: favorite ? 'red' : '#196bc9', 
  
    };

    const svgStoreStyle = {
      fontSize: '25px',
    ...(isInCart
        ? {
        
            fill: '#196bc9',
          }
        : {
      
          fill: '#196bc9',
        }),
    };





  return (
    <div className="product-item" >
      <div className = "product-img">
      <Link to={`/product/${product.productItemId}`}  state={ product } >
                  <img className='my_img' src={(imageUrl)} alt={product.name}  />
      </Link>
      </div>
 
      <div className="product-item__title">{product.name}</div>
      <div className='product-item__footer'>
      <div className="product-item__price">{product.price}</div>
      <div className='product-item__btn' >
      <IconButton  className="product-item__btn__fav"  >
        <FavoriteBorderIcon  style={svgHeartStyle}   ></FavoriteBorderIcon>
      </IconButton>


      <IconButton onClick={()=>{
        dispatch(addToCart(product))
      }} > 
      {isInCart&&(<CheckCircleIcon  className='check-mark'>

      </CheckCircleIcon>)}
      <LocalGroceryStoreOutlinedIcon style={svgStoreStyle} >   
 
    </LocalGroceryStoreOutlinedIcon> 
    
    </IconButton>

      </div>
     </div>
   
 
 
    </div>
  );
};

export default ProductCard;