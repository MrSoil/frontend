import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from '../../assets/home/aiworks 9.png';

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [repassword, setRepassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [firstnameError, setFirstnameError] = useState("")
    const [lastnameError, setLastnameError] = useState("")
    const [repasswordError, setRepasswordError] = useState("")


    const navigate = useNavigate();

    const onButtonClick = () => {

        let error_occurred = false;
        setEmailError("")
        setPasswordError("")
        setFirstnameError("")
        setLastnameError("")
        setRepasswordError("")

        if ("" === email) {
            setEmailError("Please enter your email")
            error_occurred = true
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            error_occurred = true
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            error_occurred = true
        }
        else if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            error_occurred = true
        }
        else if (repassword !== password) {
            setPasswordError("Password do not match!")
            setRepasswordError("Password do not match!")
            error_occurred = true
        }

        if ("" === firstname) {
            setFirstnameError("Please enter a name")
            error_occurred = true
        }

        if ("" === lastname) {
            setLastnameError("Please enter a lastname")
            error_occurred = true
        }

        if (error_occurred){
            return
        }

        // Check if email has an account associated with it
        register()


    }

    const register = () => {
        // console.log(JSON.stringify({'name': firstname, 'lastname': lastname, 'email': email, 'password': password}))
        fetch("http://localhost:8000/api/register/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"first_name": firstname, "last_name": lastname, "email": email, "password": password})
        })
        .then(response => response.json())
        .then(data => {
            if ('success' === data['status']) {
                window.confirm("Register is successful!");
                navigate("/home")
            } else {
                window.alert("Register failed!")
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return <div className={"mainContainer"}>
            <div className={"imageContainer"}>
                <img src={homeImage} alt="SugrHome"/>
            </div>
            <div className={"registerContainer"}>
                <div className={"titleContainer"}>Register</div>
                <div className={"subTitleContainer"}>for bestcare</div>
                <br/>
                <div className={"formContainer"} style={{ width: '49%', float: 'left' }}>
                    <input
                        value={firstname}
                        placeholder=" "
                        onChange={ev => setFirstname(ev.target.value)}
                        className={"formBox"} />
                    {firstnameError !== "" ? <label className="errorLabel">{firstnameError}</label>: null}
                    {firstnameError === "" ? <label>Name</label>: null}
                </div>
                <div className={"formContainer"} style={{ width: '49%', float: 'right' }}>
                    <input
                        value={lastname}
                        placeholder=" "
                        onChange={ev => setLastname(ev.target.value)}
                        className={"formBox"} />
                    {lastnameError !== "" ? <label className="errorLabel" >{lastnameError}</label>: null}
                    {lastnameError === "" ? <label>Surname</label>: null}
                </div>
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
                <div className={"formContainer"}>
                    <input
                        value={repassword}
                        placeholder=" "
                        onChange={ev => setRepassword(ev.target.value)}
                        className={"formBox"} />
                    {repasswordError !== "" ? <label className="errorLabel">{repasswordError}</label>: null}
                    {repasswordError === "" ? <label>Confirm Password</label>: null}
                </div>
                <div>
                    <input
                        id={'button'}
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={"Register"} />
                </div>
            </div>
        </div>
}

export default Register