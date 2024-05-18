import { useState, useEffect}  from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import '../../assets/styles/slider.css'

const ProductImagesSlider = props => {
    const [activeThumb, setActiveThumb] = useState()
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(
                props.images.map(async (item) => {
                    try {
                        const response = await fetch(`/images/${item}`);
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        const blob = await response.blob();
                        return URL.createObjectURL(blob);
                    } catch (error) {
                        console.error('Error fetching image: ', error);
                        return null;
                    }
                })
            );
            setImageUrls(urls.filter((url) => url !== null));
        };

        fetchImages();
    }, [props.images]);

    return (<>
        <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
            className='product-images-slider'
        >
            {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <img src={url} alt="product images" />
                </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
            onSwiper={setActiveThumb}

            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className='product-images-slider-thumbs'
        >
            {
                imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            <img src={url} alt="product images" />
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </>);
}

ProductImagesSlider.propTypes = {
    images: PropTypes.array.isRequired
}

export default ProductImagesSlider