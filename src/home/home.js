import React from "react"
import { useNavigate } from "react-router-dom";
import {useAuth} from "./AuthContext";

const Home = (props) => {
    const { email } = props
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();


    const onLoginButtonClick = () => {
        if (isAuthenticated) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }

    const onRegisterButtonClick = () => {
        if (isAuthenticated) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/register")
        }
    }

    const onDashboardButtonClick = () => {
        if (isAuthenticated) {
            navigate("/dashboard")
        } else {
            navigate("/login")
        }
    }


    return (
    <div className="mainContainer">
        <div className="homeContainer">
            <div className="titleContainer" style={{ alignItems: 'center' }}>
                <div>Welcome!</div>
            </div>
            {isAuthenticated === false ? <div>
                <input
                    className="inputButton"
                    type="button"
                    onClick={onLoginButtonClick}
                    value={isAuthenticated ? "Log out" : "Log in"}/>
                {isAuthenticated ? (
                    <div>Your email address is {email}</div>
                ) : (
                    <div/>
                )}
            </div>: null}

            {isAuthenticated === false ? <div>
                <input
                    className="inputButton"
                    type="button"
                    onClick={onRegisterButtonClick}
                    value={"Register"}/>
            </div>: null}

            {isAuthenticated === true ? <div>
                <input
                    className="inputButton"
                    type="button"
                    onClick={onDashboardButtonClick}
                    value={"Dashboard"}/>
            </div>: null}

        </div>
    </div>
);
}

export default Home