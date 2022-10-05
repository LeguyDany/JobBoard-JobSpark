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




function Header() {
  return (
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
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [newsletter, setNewsletter] = useState();
  const [dateMin, setDateMin] = useState(20);

  const handleSubmitGET = async (event) => {
    const url_variables = new URLSearchParams({
      firstname: firstname,
      lastname: lastname,
      location: location,
      age: age,
      newsletter: newsletter,
      userType : "USR",
      date_min : dateMin,
    });
    const url_query = url_variables.toString();

    event.preventDefault();
    const url = "http://localhost:3001/api/users/?" + url_query;
    await axios.get(url).then(function (response) {
      console.log(response.data);
    });
  }

  // const handleSubmitPOST = async (new_state) => {
  //   const url = "http://localhost:3001/api/v1/user";
  //   new_state.preventDefault();
  //   const data = new FormData(new_state.target);
  //   const form_json = Object.fromEntries(data);

  //   const res = await axios.post(url, form_json)
  //   console.log(res.data);
  // }

  return (
    <form onSubmit={handleSubmitGET}>
      <label htmlFor="firstname">Firstname</label> <br />
      <input type="text" name="firstname" id="firstname" placeholder="firstname" value={firstname}
        onChange={e => setFirstname(e.target.value)} /> <br />
      <label htmlFor="lastname">Lastname</label> <br />
      <input type="text" name="lastname" id="lastname" placeholder="lastname" value={lastname}
        onChange={e => setLastname(e.target.value)} /> <br />
      <label htmlFor="age">Age</label> <br />
      <input type="number" name="age" id="age" placeholder="age" value={age}
        onChange={e => setAge(e.target.value)} /> <br />
      <label htmlFor="location">Location</label> <br />
      <input type="text" name="location" id="location" placeholder="location" value={location}
        onChange={e => setLocation(e.target.value)} /> <br />
      <label htmlFor="newsletter">Newsletter</label> <br />
      <input type="checkbox" name="newsletter" id="newsletter" placeholder="newsletter"
        onChange={e => setNewsletter(e.target.value)} /> <br />
      <label htmlFor="dateMin">Date min</label> <br />
      <input type="range" min="1" max="100" step="5" name="dateMin" id="dateMin" placeholder="dateMin" value={dateMin}
        onChange={e => setDateMin(e.target.value) } /> <br />
      <button>Register</button>
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Header />
    <Bo_listing />
    <Register />
  </React.Fragment>
)