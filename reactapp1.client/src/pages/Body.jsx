import React, { useEffect } from 'react';


import myImage from '../assets/img/comp.png';
import ProductList from '../components/Product/ProductList.jsx';

import '../assets/styles/body.css';


const Body = () => {


  

  return (
    <div className='container'>

        <div className='wrapper_container'>      
            <img id="main_wrapper" src={myImage}/>  
        </div>            
         
  
      <div className='body__category__tittle'>
     
      </div>
          <div className="arrivals__heading">
              <h2 className="arrivals__heading-title title">Хіт продажів</h2>
            
          </div>
      <div className='list_contaier'>
      <ProductList />
      </div>
    </div> 




  );
};

export default Body;