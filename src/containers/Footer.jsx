import React from 'react';

const Header = (props) => {

    let tmp_social_img = `/images/temp/footer-social.png`;
    let tmp_footer_img = `/images/temp/footer-links.png`;


    return (
        <section className="footer">
            <div className="footer__social">
                <div className="container">
                    <img src={tmp_social_img} alt="social media" />
                </div>    
            </div>
            <div className="footer__links">
                <div className="container">
                    <img src={tmp_footer_img} alt="various links" />
                </div>
            </div>
        </section>
    );
}

export default Header;