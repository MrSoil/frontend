import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../AuthContext";
import homeImage from '../../assets/home/aiworks 9.png';
import { API_BASE_URL } from '../../config';
import { FormControl, InputLabel, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = (props) => {
    const theme = createTheme({
    palette: {
        primary: { main: "#98979B" },
        secondary: { main: "#98979B" },
        },
    components: {
    // Always use outlined TextField
        MuiTextField: {
        defaultProps: { variant: "outlined" },
        },
    // Outline + input text color
    MuiOutlinedInput: {
        styleOverrides: {
        root: {
        "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#98979B",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#98979B",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#98979B",
        },
        "& .MuiInputBase-input": {
        color: "#98979B",
        },
        },
        },
        },
    // Label color (idle and focused)
    MuiInputLabel: {
        styleOverrides: {
        root: {
        color: "#98979B",
        "&.Mui-focused": { color: "#98979B" },
        },
        },
        },
        },
    });

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();



    useEffect(() => {
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

        fetch(`${API_BASE_URL}/login/`, {
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

    return <ThemeProvider theme={theme}>
        <div className={"mainContainer"}>
            <div className={"imageContainer"}>
                <img src={homeImage} alt="SugrHome"/>
            </div>
            <div className={"loginContainer"}>
                <div className={"titleContainer"}>Giriş Yap</div>
                <div className={"subTitleContainer"}>daha iyileri için</div>
                <br/>
                <div className={"loginFormContainer"}>
                    <FormControl className={"FormControl"} fullWidth sx={{ m: 1 }}>
                        {emailError !== "" ? ( <InputLabel className="outlined-adornment-email">{emailError}</InputLabel> ) : null}
                        <TextField id="login-email"
                                   label="E-mail"
                                   type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   error={Boolean(emailError)}
                                   helperText={emailError || " "} />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        {passwordError !== "" ? ( <InputLabel className="outlined-adornment-password">{passwordError}</InputLabel> ) : null}
                        <TextField id="login-password"
                                   label="Şifre"
                                   type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   error={Boolean(passwordError)}
                                   helperText={passwordError || " "}
                        InputProps={{ // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              style={{ color: "#98979B" }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Button id="button"
                                className="inputButton"
                                variant="contained"
                                color="primary"
                                onClick={onButtonClick}
                                fullWidth
                        > Giriş Yap
                        </Button>
                    </FormControl>

                </div>
            </div>
        </div>
     </ThemeProvider>
}

export default Login