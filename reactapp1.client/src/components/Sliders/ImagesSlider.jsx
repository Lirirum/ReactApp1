import React, { useState } from 'react'

import '../../assets/styles/slider.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'

import './styles/main-slider.css'

const ImagesSlider = props => {
    const [activeThumb, setActiveThumb] = useState()

    return <>
        <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}   
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
            className='images-slider'
        >
            {
                props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} alt="product images" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
      
    </>
}

ImagesSlider.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImagesSlider