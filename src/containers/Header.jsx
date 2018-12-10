import React from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {

    return (
        <section className="header">
            <div className="header__filters">
                <div className="container">
                    <div className="row">
                        <Link to="/">
                            <img src="/images/temp/header-search-en.png" alt="tmp" />
                        </Link>    
                    </div>
                </div>
            </div>
            {/* <div className="header__banner">
                &nbsp;
    </div> */ }
        </section>
    );
}

export default Header;