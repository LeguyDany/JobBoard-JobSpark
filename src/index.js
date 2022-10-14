// JS and React modules import
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';

// Render page functions import
import {
  Register,
  Login,
  Recovery,
  ResetPass,
  Verify,
  Logout,
} from "./connection";
import {
  Bo_listing,
  See_more,
  Edit,
  Remove,
} from './back-office';
import JobOffers from './job-listing';

// Logo and stuff
import Logo from './Logo1.svg';
import LogoWhite from './Logo1w.svg';
import Instagram from './assets/icons/instagram-line.svg';
import LinkedIn from './assets/icons/linkedin-fill.svg';
import Twitter from './assets/icons/twitter-fill.svg';
import Youtube from './assets/icons/youtube-line.svg';

// URL to the DB, as a global variable so only needs to be changed once
const dburl = "https://a635-2a02-8440-3440-5136-c0c5-1b61-64e0-ce05.eu.ngrok.io/";
export default dburl;

// ignore ngrock warnings
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true;

function Header() {

  const [header_content, setHeadercontent] = useState({
    content: [["Home", "black0"], ["Login", "black1"], ["Register", "black2"], ["Companies", "black3"], ["Offers", "black4"]]
  });

  const checkUserType = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem("token");
    const url = dburl + "auth/user_type";
    const res = await axios.get(url);
    return res.data;
  }

  const designHeader = (user_type) => {
    switch (user_type) {
      case "ADM":
        setHeadercontent({
          "content": [["Logout", "black0"], ["Profile", "black1"], ["Companies", "black2"], ["Offers", "black3"], ["Back-office", "black4"]]
        });
        break
      case "USR":
        setHeadercontent({
          "content": [["Home", "black0"], ["Profile", "black1"], ["Companies", "black2"], ["Offers", "black3"], ["Logout", "black4"]]
        });
        break;
      case "RCT":
        setHeadercontent({
          "content": [["Home", "black0"], ["Profile", "black1"], ["Companies", "black2"], ["Offers", "black3"], ["Logout", "black4"]]
        });
        break;
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const user = await checkUserType();
      designHeader(user);
    }
    loadData()
  }, [])

  return (
    <header>
      <img src={Logo} />
      <nav>
        {header_content.content.map((page) => (
          <a key={page} className={page[1]} href={"/" + page[0]} > <h4>{page[0]}</h4></a>
        ))}
      </nav>
    </header>
  )
}

// à refaire: Footer (parceque c'est pas aligné)
function Footer() {
  return (
    <footer>
      <div className="footer black0">
        <div className="row">
          <div className='col-footer'>
            <img className='img-center' width="50%" src={LogoWhite} />
            <h3>About</h3>
            <hr className="jsyellow"></hr>
            <a className="whitelink" href="/offers">Job Offers</a>
            <a className="whitelink" href="">Internship Offers</a>
            <a className="whitelink" href="/login">Login</a>
            <a className="whitelink" href="/register">Register</a>
          </div>
          <div className='col-footer'>
            <div className='center'>
              <a href="https://www.instagram.com/"><img className='img-center img-footer' width="20%" src={Instagram} /></a>
              <a href="https://www.linkedin.com/"><img className='img-center img-footer' width="20%" src={LinkedIn} /></a>
              <a href="https://www.twitter.com/"><img className='img-center img-footer' width="20%" src={Twitter} /></a>
              <a href="https://www.youtube.com/"><img className='img-center img-footer' width="20%" src={Youtube} /></a>
            </div>
            <h4>Contact us</h4>
            <hr className="jsyellow"></hr>
            <a className="whitelink" href="mailto:Contact@jobspark.com">Contact@jobspark.com</a>
            <a className="whitelink" href="telto:+330110101010">01 10 10 10 10</a>
            <a className="whitelink" href="">55 Rue du Faubourg Saint-Honoré, 75008 Paris</a>
          </div>
          <div className='col-footer'>
            <h4>Subscribe to our Newsletter</h4>
            <hr className="jsyellow"></hr>
            <p className="footertext">
              You'll receive fake job offers, constant spam, stuff you generally don't want, death threats, and more!
              also we hide the 'unsubscribe' in the weirdest place so good luck with that.
            </p>
            <input className="newsletter-input" type="text" name="newsletter_mail" id="newsletter_mail" placeholder="Email"></input>
            <button className="newsletter-button" type="button">Send</button>
          </div>
        </div>
        <div className='col-copyright'>
          <hr className="jswhite"></hr>
          <p className="footertext">
            Copyright @ Job Spark 2022 - Career guidance website
          </p>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>wip</p>
    </div>
  )
}

function Error404() {
  return (
    <div className="errorbox">
      <h2 className="errorh2">OwO what's this?</h2>
      <h1>ERROR</h1>
      <h1 className="errorh1">404</h1>
      <p>Oh no! we encountewed a pwobwem whiwe woading youw page. Check if you'we on the cowwect page ow contact a website administwatow.</p>
    </div>
  )
}

function ShowPage() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Recovery/" element={<Recovery />} />
        <Route path="/Reset_pass/:token" element={<ResetPass />} />
        <Route path="/Verify/:token" element={<Verify />} />
        <Route path="/Back-office" element={<Bo_listing />} />
        <Route path="/See_more/:id/:table" element={<See_more />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/Remove/:id" element={<Remove />} />
        <Route path="/Offers" element={<JobOffers />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Header />
    <ShowPage />
    <Footer />
  </React.Fragment>
); 