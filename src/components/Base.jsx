import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Base = ({
  children
}) => (
  <div className="page">
    <div className="container">
      <div className="top-bar clearfix">
        <div className="logo">
          <Link to="/"><img alt="Ear Mentor" src="/img/logo.png" /></Link>
        </div>

        <nav className="main-nav">
          <ul>
            <li><Link to="/rating">Rating</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </div>

    {children}

    <footer className="footer">
      <div className="container clearfix">
        <div className="footer__copyright">
          <p>
            &copy; {new Date().getFullYear()} Created by <a href="http://vladimirponomarev.com">Vladimir Ponomarev</a>&nbsp;
            (<a href="https://twitter.com/vldmrponomarev">@vldmrponomarev</a>).&nbsp;
            The application licenced under MIT Licence.
          </p>
        </div>

        <div className="footer__nav">
          <ul>
            <li><a href="https://github.com/vladimirponomarev/ear-mentor-react-redux-socket.io-node">Source code</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
