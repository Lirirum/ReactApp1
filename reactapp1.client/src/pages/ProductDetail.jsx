import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

import { openCommentMenu } from '../store/actions';
import ButtonBuy from '../components/Menu/ButtonBuy.jsx';
import CommentFormModal from '../components/Forms/CommentForm.jsx';
import ProductImagesSlider from '../components/Sliders/ProductImagesSlider.jsx';

import ScalesLogo from '../assets/svg/img-scales.svg?react';
import iconReviews from '../assets/svg/productInfo/img-reviews.svg';
import binancelogo from "../assets/svg/productInfo/payment/binance.svg";
import aplepaylogo from "../assets/svg/productInfo/payment/icon-apple-pa.svg";
import googlepaylogo from "../assets/svg/productInfo/payment/icon-google-pay.svg";
import mastercardlogo from "../assets/svg/productInfo/payment/icon-mastercard.svg";
import visalogo from "../assets/svg/productInfo/payment/icon-visa.svg";
import productRating from "../assets/svg/productInfo/img-product-rating.svg";
import productWarranty from "../assets/svg/productInfo/product-warranty-info.svg";

import '../assets/styles/productDetail.css';

const ProductDetail = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const product = location.state;
    const productComments = useSelector(state => state.cart.productComments);

    return (
        <div className='container'>
            <CommentFormModal productId={product.productItemId} ></CommentFormModal>
            <div className='product__row'>
                <div className='product__col'>

                    <div className='product__slider'>
                        <ProductImagesSlider images={product.imagesUrl} />
                    </div>

                    <div className="product__specs">
                        <p className="product__specs-title">Характеристики</p>
                        <div className="product__specs-table">
                            <table cellSpacing="0" cellPadding="0">
                                <tbody>
                                    {Object.entries(product.characteristics).map(([key, value]) => (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <div className='product__col'>

                    <div className='product__info'>

                        <div className="product__heading d-none d-lg-flex">
                            <h1 className="product__title text-uppercase">{product.name}</h1>
                            <p className="product__id">Код:  116876FR </p>
                        </div>

                        <div className="product__subheading product__subheading--pc">
                            <div className="product__status product__status_in-stock">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11">
                                    <g clipPath="url(.aasdasd21dasd21e1asda12e)">
                                        <path fill="#068650" d="M10.744 1.798a.872.872 0 0 0-1.233 0L3.958 7.352 1.49 4.884A.873.873 0 1 0 .256 6.118L3.34 9.203a.87.87 0 0 0 1.234 0l6.17-6.17a.872.872 0 0 0 0-1.235Z"></path>
                                    </g>
                                    <defs>
                                        <clipPath className="aasdasd21dasd21e1asda12e">
                                            <path fill="#fff" d="M0 0h11v11H0z"></path>
                                        </clipPath>
                                    </defs>
                                </svg>
                                В наявності
                            </div>
                            <p className="product__warranty-info">
                                <img src={productWarranty} alt="reviews" />
                                Гарантія: 6міс.
                            </p>
                            <div className="product-subheading__rating">
                                <img src={productRating} alt="reviews" />
                            </div>
                            <div className="product-subheading__reviews">
                                <span className="product-subheading__reviews-icon">
                                    <img src={iconReviews} alt="reviews" />
                                </span>
                                <span>2</span>
                            </div>
                        </div>

                        <div className="product__buy">
                            <div className="product-price-wrapper">
                                <p className="product__price">
                                    <span>{product.price}₴</span>
                                </p>
                            </div>

                            <div className='product__buttons'>
                                <div className='product__buttons-head'>
                                    <ButtonBuy product={product} ></ButtonBuy>
                                    <div className='product__basket-item'>
                                        <FavoriteBorderIcon className='product__buttons-logo' />
                                        <ScalesLogo className='product__buttons-logo' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-block">
                            <h2 className="product-block__title">Оплата</h2>
                            <div className="product-block--payment">
                                <div>
                                    <span style={{ fontSize: "16px" }}>Оплата під час отримання товару, Оплата карткою у відділенні, Google Pay, Картою онлайн, Безготівковими для юридичних осіб, -5% знижки при оплаті від 500 грн карткою Mastercard Універсальна/Універсальна Gold від ПриватБанк, Безготівковий для фізичних осіб, Apple Pay, Оплатити онлайн картою "єПідтримка", Visa, Mastercard </span><a href="/oplata/"><span style={{ fontSize: "16px" }}>Детальніше</span></a>
                                </div>
                                <div className='product__payment-logo'>
                                    <span>
                                        <img src={binancelogo} alt="binance" />
                                    </span>
                                    <span>
                                        <img src={aplepaylogo} alt="whitepay" />
                                    </span>
                                    <span>
                                        <img src={googlepaylogo} alt="gpay" />
                                    </span>
                                    <span>
                                        <img src={visalogo} alt="visa" />
                                    </span>
                                    <span>
                                        <img src={mastercardlogo} alt="mastercard" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="product-block">
                            <h2 className="product-block__title">Гарантія</h2>
                            <div className="product-block__description product-block__description--garanty">
                                <span >Обмін/повернення товару належної якості протягом </span>
                                <b><span >14 днів</span></b><span >.</span>
                                <span >Весь наш товар має гарантію. </span>
                                <a href="/obmen-i-vozvrat/"><span >Детальніше</span></a>
                            </div>
                        </div>

                        <div className="products-reviews products-reviews--pc">
                            <div className="products-reviews__header">
                                <button type="button" onClick={() => {
                                    dispatch(openCommentMenu())
                                }} className="btn btn_seventh product__button-online products-reviews__btn" data-toggle="modal" data-target="#us-review-modal--pc">Залишити відгук</button>

                                <div className="modal" id="us-review-modal--pc" tabIndex="-1" role="dialog" aria-labelledby="us-review" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ justifycontent: 'center' }} >
                                    </div>
                                </div>

                                <div className="modal modal-answer-review" tabIndex="-1" role="dialog" aria-labelledby="us-review" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ justifycontent: 'center' }}>
                                        <div className="modal-content popup-review">
                                            <div className="popup-review-header"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="products-reviews__body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
