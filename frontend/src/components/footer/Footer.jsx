import { assets } from '../../assets/assets/frontend_assets/assets';
import './footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="content left">
                <img src={assets.logo} alt="" />
                <p>lorem text</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="content center">
                <h2>Company</h2>
                <ul>
                    <li>home</li>
                    <li>about us</li>
                    <li>delivery</li>
                    <li>privacy policy</li>
                </ul>
            </div>
            <div className="content right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+1-234-567-8900</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copy-right">Copyright 2026 &copy; Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
