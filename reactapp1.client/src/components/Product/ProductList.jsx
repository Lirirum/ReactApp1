import  { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Lottie from 'react-lottie';

import ProductCard from './ProductCard.jsx';
import animationData from '@/assets/lotties/Loading';

import '../../assets/styles/body.css';
import '../../assets/styles/product.css';
 

    
const ProductList = () => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        getProductListData(10);

    }, []);


    async function getProductListData(quantity) {  
  
        const response = await fetch(`/product/top/${quantity}`, {
            headers: {
                Accept: "application/json"
            }

        }); 
        if (response.ok) { 
            const data = await response.json();
            setProductList(data);
            setLoading(false)
        } else {
            console.log( response.status);
        }
      
             
        
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    return (
      

        <div className='product-grid'>       
            {loading ? (<Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />):( productList.map((product, index) => (      
        <ProductCard key={index} product={product} />
         )))}          
        </div>
    );

    };

    export default ProductList;