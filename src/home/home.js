import React from "react"
import { useNavigate } from "react-router-dom";
import {useAuth} from "./AuthContext";
import {Stack,
        Button
      } from "@mui/material";

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
                <div>Hoş Geldiniz!</div>
            </div>
            {isAuthenticated === false ?
            <Stack container spacing={2}>
                    <Button className="inputButton" variant="contained" onClick={onLoginButtonClick}>Giriş Yap</Button>
                    <Button className="inputButton" variant="contained" onClick={onRegisterButtonClick}>Kayıt Ol</Button>
            </Stack> : null}


            {isAuthenticated === true ?
            <Stack container spacing={2}>
                    <Button className="inputButton" variant="contained" onClick={onDashboardButtonClick}>Ana Sayfa</Button>
            </Stack>: null}

        </div>
    </div>
);
}

export default Home