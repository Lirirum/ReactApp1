import React from 'react'
import 'bootstrap/';
import "../../assets/styles/footer.css"
import footer_logo from "../../assets/svg/footer_logo.png"

const Footer = ({ selectedCount }) => {
  return (
    
    <footer className="footer-distributed">

			<div className="footer-left">

				<div className='footer__logo'>
				<img src={footer_logo}/>


				</div>

				<p className="footer-links">
					<a href="#" className="link-1">Про нас</a>
					
					<a href="#">Блог</a>
				
					<a href="#">Доставка та оплата</a>
				
					<a href="#">Гарантія</a>
					
					<a href="#">Контакти</a>
					
					<a href="#">Усі категорії</a>
				</p>

				<p className="footer-company-name">SunWay © 2023</p>
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>вулиця 68 Десантників</span>Центральний район, Миколаїв</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+380.97.523.1242</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">sunway102@gmail.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>Про компанію</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div className="footer-icons">

					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-github"></i></a>

				</div>

			</div>

		</footer>
  );
};

export default Footer;