import { useState } from 'react';
import ImagesSlider from '../components/Sliders/ImagesSlider.jsx';

import './styles/aboutus.css';

import './App.css';

const images = require.context('./img/images_slider', true);
const AboutUs = () => {

const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
 
const imagesUrl = images.keys().map(imagePath => images(imagePath));
return (
    <div className="container">


<div className="articles">
<div className="articles__nav">
                        <ul className="articles__nav__list">
                <li className="active"><a href="about-us">Про нас</a>
                </li>
                <li><a href="">Акції</a></li>
                <li><a href="">Новини</a></li>
                <li><a href="">Блог</a></li>
                <li><a href="">Рішення</a></li>
                <li><a href="">Де купити</a></li>
                <li><a href="">Оплата та доставка</a></li>
                <li><a href="">  Драйвера</a></li>
                <li><a href="">Гарантія</a></li>
                <li><a href="">Техпідтримка</a></li>
           
            </ul>
            
                                    <div className="widget-slider js-widget-slider swiper-initialized swiper-horizontal swiper-backface-hidden">
                <div className="swiper-wrapper">
                    
                    
                    
                    
                    
                    
                </div>
                <div className="swiper-button-prev widget-slider__btn swiper-button-disabled swiper-button-lock"></div>
                <div className="swiper-button-next widget-slider__btn swiper-button-disabled swiper-button-lock"></div>
            </div>
   
           
   
   
    </div>

<div className="articles__box">
    <div className=''>
    <div className='swiper-wrapper'>
      <ImagesSlider images={imagesUrl} />
    </div>
    </div>
    </div>
</div>

    </div>
);
};

export default AboutUs;