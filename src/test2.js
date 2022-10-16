// Importing React
import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Buffer } from "buffer";

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

import { render } from '@testing-library/react';
import { json } from 'mathjs';

// axios.defaults.headers.common['ngrok-skip-browser-warning'] = '';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
  const [resume, setResume] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [preview_pp, setPreviewpp] = useState("");
  const [preview_resume, setPreviewresume] = useState("");
  const [get_resume, setGet_resume] = useState("");
  let val;

  const convert_base64 = (hex) => {
    return Buffer.from(hex).toString("base64");
  }

  const refresh_header = () => {
    return {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem("token"),
      }
    }
  }

  let header = refresh_header()

  const handleSubmitGET = async (event) => {
    event.preventDefault();
    const url_variables = new URLSearchParams({
      firstname: "ogm",
      lastname: "ogm",
      location: "Earth",
      newsletter: "false",
      user_type: "USR",
      age_min: "0",
      age_max: "100",
      reg_date_min: "2021-01-01",
      reg_date_max: "2023-01-01"
    });
    const url_query = url_variables.toString();

    const url = "http://localhost:3001/api/users/?" + url_query;
    const res = await axios.get(url, header);

    const buffer = res.data[0].resume.data;

    return buffer;
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

    localStorage.setItem("token", res.data.token);
    header = refresh_header();
  }

  // Add
  const addCompanies = async (new_state) => {
    const url = "http://localhost:3001/api/information/";
    new_state.preventDefault();
    const form_json = {
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
    const comp_id = "bc8dbf2d-a0aa-43c5-a397-58edb52ac245";
    const url = "http://localhost:3001/api/users/" + comp_id;
    new_state.preventDefault();

    var formData = new FormData();
    var imagefile = document.querySelector("#image");
    formData.append("profile_pic", imagefile.files[0]);
    var imagefile = document.querySelector("#resume");
    formData.append("resume", imagefile.files[0]);

    const form_json = {
      "firstname": "Frogman_95",
      "lastname": "Figaro",
      "age": "99",
      "newsletter": false,
      "location": "Earth",
      "user_email": "Drag_monster95@gmail.com",
      "user_phone": "0629102332",
      "user_website": "Francis-Lemont.org",
      "user_linkedin": "https://linkedin.com/Francis-Lemont",
      "user_social": "",
      "user_pwd": "azertyuiop",
    }
    for (const item in form_json) {
      formData.append(item, form_json[item]);
    }

    const res = await axios.put(url, formData, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(res.data);

  }

  const preview_image = (event) => {
    const test = URL.createObjectURL(event.target.files[0])
    return test
  }

  const load_image = async (event) => {
    event.preventDefault();

    var formData = new FormData();
    var imagefile = document.querySelector("#" + event.target.id);
    formData.append("image", imagefile.files[0]);

    const api = "http://localhost:3001/test";
    const res = await axios.post(api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const buffer = res.data;

    return buffer;
  }

  // // How to send files / images to the back.
  // const see_files = async (event) => {
  //   event.preventDefault();

  //   var formData = new FormData();
  //   var imagefile = document.querySelector("#image");
  //   formData.append("image", imagefile.files[0]);
  //   var imagefile = document.querySelector("#resume");
  //   formData.append("resume", imagefile.files[0]);
  //   formData.append("firstname", "test");

  //   const api = "http://localhost:3001/test2";
  //   const res = await axios.post(api, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });

  //   console.log(res.data);

  // }

  return (
    <section>
      <form onSubmit={async e => handleSubmitPOST(e)}>
        <label htmlFor="user_email">User email</label> <br />
        <input type="text" name="user_email" id="user_email" placeholder="email" value={email}
          onChange={e => setEmail(e.target.value)} /> <br />
        <label htmlFor="user_pwd">Lastname</label> <br />
        <input type="text" name="user_pwd" id="user_pwd" placeholder="password" value={password}
          onChange={e => setPassword(e.target.value)} /> <br />
        <button>Register</button>
      </form>

      <form onSubmit={async e => {
        setGet_resume(await handleSubmitGET(e));
      }}>
        <button>Get</button>
      </form>
      <embed src={`data:application/pdf;base64,${convert_base64(get_resume)}`} width="500px" height="400px" />

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


      <form>
        <h1>UPLOAD RESUME</h1>
        <input type="file" name="resume" id="resume" onChange={async e => {
          setResume(await load_image(e));
          setPreviewresume(preview_image(e))
        }} /> <br />
        {/* <embed src={`data:application/pdf;base64,${convert_base64(preview_resume)}`} width="500px" height="400px" /> */}
        <embed src={preview_resume} width="500px" height="400px" />

        <h1>UPLOAD image</h1>
        <input type="file" name="image" id="image" onChange={async e => {
          setProfile_pic(await load_image(e));
          setPreviewpp(preview_image(e))
        }} /> <br />
        {/* <img src={`data:image/png;base64,${convert_base64(profile_pic)}`} alt="profile_pic" /> <br /> */}
        <img src={preview_pp} />
      </form>

    </section>

  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Header />
    <Register />
  </React.Fragment>
)