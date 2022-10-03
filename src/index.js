// Importing React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

// Importing other libraries
import axios from 'axios';

// Importing modules
import './css/index.css';

// Importing other things
import "./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.woff";
import "./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.woff2";
import "./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Medium.woff";
import "./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Medium.woff2";
import "./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.woff";
import "./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.woff2";

import Bo_listing from "./back-office.js";

function Header(){
  return(
    <header>
      <img src={"./Logo1.svg"} />
      <nav>
        <a className="black1" href=""><h4>Home</h4></a>
        <a className="black0" href=""><h4>Back-office</h4></a>
        <a className="black1" href=""><h4>Profile</h4></a>
        <a className="black2" href=""><h4>Companies</h4></a>
        <a className="black3" href=""><h4>Offers</h4></a>
      </nav>
    </header>
  )
}

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [user_pwd, setUser_pwd] = useState("");
  const [user_email, setUser_email] = useState("");

  // const handleSubmitGET = async (event) => {
  //   event.preventDefault();
  //   const url = "http://localhost:3001/api/v1/user";
  //   await axios.get(url).then(function(response) {
  //     console.log(response.data);
  //   });
  // }

  const handleSubmitPOST = async (new_state) => {
    const url = "http://localhost:3001/api/v1/user";
    new_state.preventDefault();
    const data = new FormData(new_state.target);
    const form_json = Object.fromEntries(data);

    const res = await axios.post(url, form_json)
    console.log(res.data);
  }

  return (
    <form onSubmit={(e) => handleSubmitPOST(e)}>
      <label htmlFor="firstname">Firstname</label> <br />
      <input type="text" name="firstname" id="firstname" placeholder="firstname" value={firstname}
          onChange={e => setFirstname(e.target.value)}/> <br />
      <label htmlFor="lastname">Lastname</label> <br />
      <input type="text" name="lastname" id="lastname" placeholder="lastname" value={lastname}
          onChange={e => setLastname(e.target.value)}/> <br />
      <label htmlFor="user_email">Email address</label> <br />
      <input type="text" name="user_email" id="user_email" placeholder="user_email" value={user_email}
          onChange={e => setUser_email(e.target.value)}/> <br />
      <label htmlFor="user_pwd">Password</label> <br />
      <input type="text" name="user_pwd" id="user_pwd" placeholder="user_pwd" value={user_pwd}
          onChange={e => setUser_pwd(e.target.value)}/> <br />
      <button>Register</button>
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Header/>
    <Bo_listing/>
    <Register/>
  </React.Fragment>
)