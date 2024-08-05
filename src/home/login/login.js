import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../AuthContext";
import homeImage from '../../assets/home/aiworks 9.png';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated === true)
            navigate("/home")
    });

    const onButtonClick = () => {

        setEmailError("")
        setPasswordError("")

        if ("" === email) {
            setEmailError("Please enter your email.")
            return
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email.")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password.")
            return
        }

        logIn()

    }

    const logIn = () => {

        fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email, "password": password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
              localStorage.setItem('user', JSON.stringify({ token: data.access, email }));
              setEmail(email);
              setIsAuthenticated(true);
              navigate("/home")
            } else {
              throw new Error('Failed to login');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
        alert('Login failed');
        });
        };

    return <div className={"mainContainer"}>
            <div className={"imageContainer"}>
                <img src={homeImage} alt="SugrHome"/>
            </div>
            <div className={"loginContainer"}>
                <div className={"titleContainer"}>Login</div>
                <div className={"subTitleContainer"}>for wellbeing</div>
                <br/>
                <div className={"formContainer"}>
                    <input
                        value={email}
                        placeholder=" "
                        onChange={ev => setEmail(ev.target.value)}
                        className={"formBox"} />
                    {emailError !== "" ? <label className="errorLabel">{emailError}</label>: null}
                    {emailError === "" ? <label>E-mail</label>: null}
                </div>
                <div className={"formContainer"}>
                    <input
                        value={password}
                        placeholder=" "
                        onChange={ev => setPassword(ev.target.value)}
                        className={"formBox"} />
                    {passwordError !== "" ? <label className="errorLabel">{passwordError}</label>: null}
                    {passwordError === "" ? <label>Password</label>: null}
                </div>
                <div>
                    <input
                        id={'button'}
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={"Login"} />
                </div>
            </div>
        </div>
}

export default Login