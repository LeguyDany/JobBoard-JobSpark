import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';
import axios from 'axios';

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

// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstname: "",
//       lastname: "",
//       user_pwd: "",
//       user_email: "",
//     }

//   }

//   handleChanges(event) {
//     this.setState({
//       firstname: event.state.firstname.value,
//       lastname: event.state.lastname.value,
//       user_pwd: event.state.user_pwd.value,
//       user_email: event.state.user_email.value,
//     });
//   }

//   async handleSubmitGET(event) {
//     event.preventDefault();
//     const url = "http://localhost:3001/api/v1/user";
//     const res = await fetch(url, { method: "GET" });
//     const data = await res.json();
//     console.log(data);
//   }

//   async handleSubmitPOST(event) {
//     event.prenventDefault();
//     const url = "http://localhost:3001/api/v1/user";
//     console.log(event);

//     //   try{
//     //     const res = await fetch(url, {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: event.JSON.stringify(),
//     //   })
//     //     console.log(res);
//     //  } catch (error) {
//     //     console.log("ERROR: " + error);
//     //   }

//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmitPOST}>
//         <label htmlFor="firstname">Firstname</label> <br />
//         <input type="text" name="firstname" id="firstname" placeholder="firstname" value={this.state.firstname} onChange={this.handleChanges} /> <br />
//         <label htmlFor="lastname">Lastname</label> <br />
//         <input type="text" name="lastname" id="lastname" placeholder="lastname" onChange={this.handleChanges} /> <br />
//         <label htmlFor="user_email">Email address</label> <br />
//         <input type="text" name="user_email" id="user_email" placeholder="user_email" onChange={this.handleChanges} /> <br />
//         <label htmlFor="user_pwd">Password</label> <br />
//         <input type="text" name="user_pwd" id="user_pwd" placeholder="user_pwd" onChange={this.handleChanges} /> <br />
//         <button>Register</button>
//       </form>
//     )
//   }

// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Register />);