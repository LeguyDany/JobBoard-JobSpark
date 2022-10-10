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

// axios.defaults.headers.common['ngrok-skip-browser-warning'] = '';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


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
  const [email, setEmail] = useState("dany.leguy@epitech.eu");
  const [password, setPassword] = useState("123654789");



  const refresh_header = () => {
    return {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem("token")
      }
    }
  }

  let header = refresh_header()

  const handleSubmitGET = async (event) => {
    // const url_variables = new URLSearchParams({
    //   firstname: firstname,
    //   lastname: lastname,
    //   location: location,
    //   age: age,
    //   newsletter: newsletter,
    //   userType : "USR",
    //   date_min : dateMin,
    // });
    // const url_query = url_variables.toString();

    event.preventDefault();
    const url = "http://localhost:3001/api/users/all";
    const request = await axios.get(url, header);
    console.log(request.data);
  }

  // Logout
  const logout = async (event) => {
    event.preventDefault();
    localStorage.clear();
  }

  // Connection
  const handleSubmitPOST = async (new_state) => {
    const url = "http://localhost:3001/auth/login";
    new_state.preventDefault();
    const data = new FormData(new_state.target);
    const form_json = Object.fromEntries(data);

    const res = await axios.post(url, form_json);
    console.log(res.data);

    localStorage.setItem("token", res.data.token)
    header = refresh_header();
  }

  // Add
  const addCompanies = async (new_state) => {
    const url = "http://localhost:3001/api/information/";
    new_state.preventDefault();
    const form_json =     {
      "ad_id": "c4e54341-0a51-42f8-9cee-1f39719b4a6b",
      "user_id": "6da6242d-d001-4662-a59c-19225047d23a"
  }

    const res = await axios.post(url, form_json, header);
    console.log(res.data)
  }

  // Delete
  const delCompanies = async (new_state) => {
    const comp_id = "0345972a-ef67-48c7-8670-0a8fd86c937e";
    const url = "http://localhost:3001/api/information/" + comp_id;
    new_state.preventDefault();

    const res = await axios.delete(url, header);
    console.log(res.data)
  }

  // Update
  const updateCompanies = async (new_state) => {
    const comp_id = "f0f88fe3-4ee3-40c6-8d7e-679fe648397f";
    const url = "http://localhost:3001/api/information/" + comp_id;
    new_state.preventDefault();

    const form_json =     {
      "offer_name": "Magician",
      "offer_location": "Paris",
      "contract_type": "Part-time",
      "salary_min": 9999,
      "work_duration": 1,
      "experience_years": 50,
      "offer_language": "English",
      "offer_desc" : "Magic tricks. EXPERTS ONLY, NO JOKE.",
      "offer_profile_desc": "Knows how to teleport, cast fire balls and fly.",
      "remote_work": false,
      "company_id": "91e7bb21-7e5a-433f-b577-bb45e6488ddd",
      "starting_date": "2023-01-01"
  }

    const res = await axios.put(url, form_json, header);
    console.log(res.data)
  }

  return (
    <section>
      <form onSubmit={e => handleSubmitPOST(e)}>
        <label htmlFor="user_email">User email</label> <br />
        <input type="text" name="user_email" id="user_email" placeholder="email" value={email}
          onChange={e => setEmail(e.target.value)} /> <br />
        <label htmlFor="user_pwd">Lastname</label> <br />
        <input type="text" name="user_pwd" id="user_pwd" placeholder="password" value={password}
          onChange={e => setPassword(e.target.value)} /> <br />
        <button>Register</button>
      </form>

      <form onSubmit={handleSubmitGET}>
        <button>Get</button>
      </form>

      <form onSubmit={logout}>
        <button>Delete tokens / logout</button>
      </form>

      <form onSubmit={addCompanies}>
        <button>Add</button>
      </form>

      <form onSubmit={delCompanies}>
        <button>Delete</button>
      </form>

      <form onSubmit={updateCompanies}>
        <button>Update</button>
      </form>
    </section>

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