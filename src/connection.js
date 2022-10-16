import React, { useEffect } from 'react';
import './css/index.css';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import PasswordChecklist from "react-password-checklist"
import dburl from './index.js';

export function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [user_email, setUser_email] = useState("");
    const [user_pwd, setUser_pwd] = useState("");
    const [user_pwd_conf, setUser_pwdconf] = useState("");
    const [back_response, setBack_response] = useState("");

    const handleSubmitPOST = async (event) => {
        event.preventDefault();
        const data = {
            firstname: firstname,
            lastname: lastname,
            user_pwd: user_pwd,
            user_email: user_email,
        }
        const url = dburl + "api/users"
        const res = await axios.post(url, data);
        if(res.data == "Email already exists.") return (setBack_response(React.createElement("p", { id: "warning" }, res.data)));

        const url2 = dburl + "auth/verifymail";
        const res2 = await axios.post(url2, data);
        setBack_response(React.createElement("p", {}, res2.data))

    }

    return (
        <div className="container">
            <img className="img-responsive" src={require("./assets/img/register_img.png")} />
            <div className="logininput">
                <h1>Register</h1>
                <form onSubmit={e => handleSubmitPOST(e)}>
                    <label htmlFor="firstname">Firstname</label> <br />
                    <input className="text-input" type="text" name="firstname" id="firstname" placeholder="Jean" value={firstname}
                        onChange={e => setFirstname(e.target.value)} required /> <br />
                    <label htmlFor="lastname">Lastname</label> <br />
                    <input className="text-input" type="text" name="lastname" id="lastname" placeholder="Dupont" value={lastname}
                        onChange={e => setLastname(e.target.value)} required /> <br />
                    <label htmlFor="user_email">Email address</label> <br />
                    <input className="text-input" type="email" name="user_email" id="user_email" placeholder="Jean.Dupont@example.fr" value={user_email}
                        onChange={e => setUser_email(e.target.value)} required /> <br />
                    <label htmlFor="user_pwd">Password</label> <br />
                    <input className="text-input password-field" type="password" name="user_pwd" id="user_pwd" placeholder="*************" value={user_pwd}
                        onChange={e => setUser_pwd(e.target.value)} required /> <br />
                    <div className="password-info">
                        <PasswordChecklist
                            rules={["minLength", "maxLength", "specialChar", "number", "capital"]}
                            minLength={8}
                            maxLength={9007199254740991}
                            value={user_pwd}
                            valueAgain={user_pwd_conf}
                            messages={{
                                minLength: "Password must contain at least 8 characters",
                                number: "Password must contain at least one number",
                                capital: "Password must contain one capital letter or the capital of a recognized U.N. country",
                                letter: "Password must contain at least one letter from the french alphabet",
                                specialChar: "Password must contain one weird ass lookin' character",
                                maxLength: "Password has no more than 9,007,199,254,740,991 characters",
                            }}
                        />
                    </div>
                    <label htmlFor="user_pwd">Password Confirmation</label> <br />
                    <input className="text-input password-conf-field" type="password" name="user_pwd_conf" id="user_pwd_conf" placeholder="*************" value={user_pwd_conf}
                        onChange={e => setUser_pwdconf(e.target.value)} required /> <br />
                    <div className="password-confirmation">
                        <PasswordChecklist
                            rules={["match", "notEmpty"]}
                            value={user_pwd}
                            valueAgain={user_pwd_conf}
                            messages={{
                                match: "Passwords must match.",
                                notEmpty: "Both Passwords cannot be empty because that is a security risk.",
                            }}
                        />
                    </div>
                    <br />
                    <button type="submit">Register</button>
                    {back_response}
                </form>
                <a href="/login">Already have an account ?</a>
            </div>
        </div>
    )
}

export function Login() {

    const [user_email, setUser_email] = useState("");
    const [user_pwd, setUser_pwd] = useState("");
    const [back_response, setBack_response] = useState("");
    const navigate = useNavigate();

    const handleSubmitPOST = async (new_state) => {
        const url = dburl + "auth/login";
        new_state.preventDefault();
        const data = {
            user_email: user_email,
            user_pwd: user_pwd
        }

        const res = await axios.post(url, data)
        if (res.data == "User unregistered or wrong password." || res.data == "Wrong password, please try again." || res.data == "Verify your email address first.") {
            return setBack_response(React.createElement("p", { id: "warning" }, res.data));
        }
        setBack_response(React.createElement("p", {}, "Connexion to the account."));
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem("token");
        navigate("/Home");
        navigate(0);
    }

    return (
        <div className="container">
            <div className="image">
                <img className="img-responsive" src={require("./assets/img/login_img.png")} />
            </div>
            <div className="logininput">
                <h1>Login</h1>
                <form onSubmit={(e) => handleSubmitPOST(e)}>
                    <label htmlFor="user_email">Email address</label> <br />
                    <input className="text-input" type="text" name="user_email" id="user_email" placeholder="John.dupont@email.fr" onChange={e => setUser_email(e.target.value)} /> <br />
                    <label htmlFor="user_pwd">Password</label> <br />
                    <input className="text-input" type="password" name="user_pwd" id="user_pwd" placeholder="*************"
                        onChange={e => setUser_pwd(e.target.value)} /> <br />
                    <button type="submit">Login</button>
                </form>
                <a href="/register">Don't have an account? Sign up!</a> <br />
                <a href="/recovery">Forgot your password?</a>
                {back_response}
            </div>
        </div>
    )
}

export function Recovery() {

    const [back_response, setBack_response] = useState("")

    const handleSubmitPOST = async (new_state) => {
        const url = dburl + "auth/forgotPass";
        new_state.preventDefault();
        const data = new FormData(new_state.target);

        const res = await axios.post(url, data);

        if (res.data == "Email unregistered.") {
            setBack_response(React.createElement("p", { id: "warning" }, res.data));
        } else {
            setBack_response(React.createElement("p", {}, res.data));
        }
    }

    return (
        <div className="container">
            <div className="image">
                <img className="img-responsive" src={require("./assets/img/login_img.png")} />
            </div>
            <div className="logininput">
                <h1>Recovery</h1>
                <form onSubmit={(e) => handleSubmitPOST(e)}>
                    <label htmlFor="user_email">Email address</label> <br />
                    <input className="text-input" type="text" name="user_email" id="user_email" placeholder="user@mail.com" /> <br />
                    <button type="submit">Reset password</button>
                </form>
                {back_response}
            </div>
        </div>
    )
}

export function ResetPass() {
    const params = useParams();
    const [user_pwd, setUser_pwd] = useState("");
    const [user_pwd_conf, setUser_pwdconf] = useState("");
    const [back_response, setBack_response] = useState("");

    const handleSubmitPOST = async (new_state) => {
        new_state.preventDefault();

        const token = params["token"];
        const url = dburl + "auth/resetPass/" + token;
        const data = {
            user_pwd: user_pwd,
        }

        const res = await axios.post(url, data);

        console.log(res.data);
        if (res.data == "Password updated.") {
            setBack_response(React.createElement("p", {}, res.data));
        }
    }

    return (
        <div className="container">
            <div className="image">
                <img className="img-responsive" src={require("./assets/img/login_img.png")} />
            </div>
            <div className="logininput">
                <h1>Reset password</h1>
                <form onSubmit={(e) => handleSubmitPOST(e)}>
                    <label htmlFor="user_pwd">New password</label> <br />
                    <input className="text-input password-field" type="password" name="user_pwd" id="user_pwd" placeholder="*************" value={user_pwd}
                        onChange={e => setUser_pwd(e.target.value)} /> <br />
                    <div className="password-info">
                        <PasswordChecklist
                            rules={["minLength", "maxLength", "specialChar", "number", "capital"]}
                            minLength={8}
                            maxLength={9007199254740991}
                            value={user_pwd}
                            valueAgain={user_pwd_conf}
                            messages={{
                                minLength: "Password must contain at least 8 characters",
                                number: "Password must contain at least one number",
                                capital: "Password must contain one capital letter or the capital of a recognized U.N. country",
                                letter: "Password must contain at least one letter from the french alphabet",
                                specialChar: "Password must contain one weird ass lookin' character",
                                maxLength: "Password has no more than 9,007,199,254,740,991 characters",

                            }}
                        />
                    </div>
                    <label htmlFor="user_pwd">Password Confirmation</label> <br />
                    <input className="text-input password-conf-field" type="password" name="user_pwd_conf" id="user_pwd_conf" placeholder="*************" value={user_pwd_conf}
                        onChange={e => setUser_pwdconf(e.target.value)} /> <br />
                    <div className="password-confirmation">
                        <PasswordChecklist
                            rules={["match", "notEmpty"]}
                            value={user_pwd}
                            valueAgain={user_pwd_conf}
                            messages={{
                                match: "Passwords must match.",
                                notEmpty: "Both Passwords cannot be empty because that is a security risk.",

                            }}
                        />
                    </div>
                    <br />
                    <button type="submit">Recover</button>
                </form>
                {back_response}
            </div>
        </div>
    )
}

export function Verify() {
    const params = useParams();
    const [back_response, setBack_response] = useState("")


    const verify_account = async () => {

        const url = dburl + "auth/verify/" + params["token"];
        const res = await axios.get(url);

        if (res.data == "Account verified.") {
            setBack_response(React.createElement("p", {}, "Your account has been verified. You can now log in with your account."));
        } else {
            setBack_response(React.createElement("p", { id: "warning" }, res.data));
        }
    }

    useEffect(() => {
        verify_account();
    }, [])

    return (
        <div className="container">
            <div className="image">
                <img className="img-responsive" src={require("./assets/img/login_img.png")} />
            </div>
            <div className="logininput">
                <h1>Email verification</h1>
                {back_response}
                <a href="/login"><button>Back to login</button></a>
            </div>
        </div>
    )
}

export function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        navigate("/Home");
        navigate(0);
    }, []);
}