import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../../assets/home/aiworks 9.png";
import { API_BASE_URL } from '../../config';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {Box,
        Grid,
        Stack,
        TextField,
        Button,
        Checkbox,
        FormControlLabel,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        InputAdornment,
        IconButton,
        ThemeProvider,
        createTheme,
      } from "@mui/material";

const Register = () => {
  // Theme: same grey styling as your Login page
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRepasswordError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [termsError, setTermsError] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  // Terms checkboxes + dialogs
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [openTerms1, setOpenTerms1] = useState(false);
  const [openTerms2, setOpenTerms2] = useState(false);

  const navigate = useNavigate();

  // When checkbox clicked, open dialog; user must accept in dialog to check it
  const handleClickTerms1 = () => setOpenTerms1(true);
  const handleClickTerms2 = () => setOpenTerms2(true);
  const handleAcceptTerms1 = () => {
  setAgree1(true);
  setOpenTerms1(false);
  };
  const handleDeclineTerms1 = () => {
  setAgree1(false);
  setOpenTerms1(false);
  };
  const handleAcceptTerms2 = () => {
  setAgree2(true);
  setOpenTerms2(false);
  };
  const handleDeclineTerms2 = () => {
  setAgree2(false);
  setOpenTerms2(false);
  };

  const onButtonClick = () => {
  let errorOccurred = false;

  setEmailError("");
  setPasswordError("");
  setRepasswordError("");
  setFirstnameError("");
  setLastnameError("");
  setTermsError("");

  if (email === "") {
    setEmailError("Please enter your email");
    errorOccurred = true;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError("Please enter a valid email");
    errorOccurred = true;
  }

  if (password === "") {
    setPasswordError("Please enter a password");
    errorOccurred = true;
  } else if (password.length < 8) {
    setPasswordError("The password must be 8 characters or longer");
    errorOccurred = true;
  }

  if (repassword === "") {
    setRepasswordError("Please confirm your password");
    errorOccurred = true;
  } else if (repassword !== password) {
    setPasswordError("Passwords do not match");
    setRepasswordError("Passwords do not match");
    errorOccurred = true;
  }

  if (firstname === "") {
    setFirstnameError("Please enter a name");
    errorOccurred = true;
  }

  if (lastname === "") {
    setLastnameError("Please enter a lastname");
    errorOccurred = true;
  }

  if (!agree1 || !agree2) {
    setTermsError("Devam etmek için tüm şartları kabul etmelisiniz.");
    errorOccurred = true;
  }

  if (errorOccurred) return;

  register();
  };

  const register = () => {
  fetch(`${API_BASE_URL}/register/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  first_name: firstname,
  last_name: lastname,
  email,
  password,
  }),
  })
  .then((res) => res.json())
  .then((data) => {
  if (data.status === "success") {
  window.confirm("Üyelik Başarıyla Oluşturuldu!");
  navigate("/home");
  } else {
  window.alert("Bir Hata Oluştu!");
  }
  })
  .catch((err) => console.error("Error:", err));
  };

      return <ThemeProvider theme={theme}>
  <div className="mainContainer" style={{ display: "flex", minHeight: "100vh" }}>
  <div className="imageContainer" style={{ flex: 1 }}>
  <img src={homeImage} alt="SugrHome" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>

      <div className="registerContainer" style={{ flex: 1, display: "flex" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 520 }}>
            <Box className="titleContainer" sx={{ textAlign: "center", mb: 0.5 }}>
              Kayıt Ol
            </Box>
            <Box className="subTitleContainer" sx={{ textAlign: "center", mb: 3 }}>
              for bestcare
            </Box>

            <Stack container spacing={2}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="İsim"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    error={Boolean(firstnameError)}
                    helperText={firstnameError || " "}
                  />
                </Grid>
                <Grid size={6} >
                  <TextField
                    fullWidth
                    label="Soyisim"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    error={Boolean(lastnameError)}
                    helperText={lastnameError || " "}
                  />
                </Grid>
              </Grid>

              <TextField
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailError)}
                helperText={emailError || " "}
              />

              <TextField
                label="Şifre"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError || " "}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#98979B" }}
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Şifre Onayı"
                type={showRepassword ? "text" : "password"}
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                error={Boolean(repasswordError)}
                helperText={repasswordError || " "}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#98979B" }}
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowRepassword((v) => !v)}
                        edge="end"
                      >
                        {showRepassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Terms checkboxes */}
              <Box style={{ color: "#98979B" }}>

                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#98979B" }}
                      checked={agree1}
                      onChange={handleClickTerms1} // open dialog; accept sets checked
                    />
                  }
                  label="KVKK Aydınlatma Metnini okudum ve kabul ediyorum."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#98979B" }}
                      checked={agree2}
                      onChange={handleClickTerms2}
                    />
                  }
                  label="Hizmet Koşulları ve Gizlilik Politikasını kabul ediyorum."
                />
                {termsError ? (
                  <Box sx={{ color: "#d32f2f", fontSize: 12, mt: 0.5 }}>{termsError}</Box>
                ) : (
                  <Box sx={{ fontSize: 12, mt: 0.5, visibility: "hidden" }}>.</Box>
                )}
              </Box>


            <Button id="button"
                            className="inputButton"
                            variant="contained"
                            color="primary"
                            onClick={onButtonClick}
                            fullWidth
                    > Kayıt Ol
                    </Button>

            </Stack>
          </Box>
        </Box>
      </div>
    </div>

    {/* Terms Dialogs */}
    <Dialog open={openTerms1} onClose={handleDeclineTerms1} fullWidth maxWidth="md" >
        <div style={{backgroundColor: "inherit"}}>
          <DialogTitle>KVKK Aydınlatma Metni</DialogTitle>
          <DialogContent dividers>
            <p>
              KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metniniz burada yer alır. Bu metin; veri sorumlusu,
              hukuki sebepler, saklama süreleri, haklar ve başvuru yöntemlerini kapsar. Örnek metinle değiştiriniz.
            </p>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleDeclineTerms1}>Reddet</Button>
            <Button variant="outlined" color="neutral" onClick={handleAcceptTerms1}>
              Kabul Ediyorum
            </Button>
          </DialogActions>
        </div>
    </Dialog>

    <Dialog open={openTerms2} onClose={handleDeclineTerms2} fullWidth maxWidth="md">
        <div style={{backgroundColor: "inherit"}}>
          <DialogTitle>Hizmet Koşulları ve Gizlilik Politikası</DialogTitle>
          <DialogContent dividers>
            <p>
              Hizmet koşulları ve gizlilik politikanız burada yer alır. Hizmetin kullanım şartları, kullanıcı yükümlülükleri, veri
              güvenliği ve gizlilik ilkeleri gibi başlıkları içermelidir. Örnek metinle değiştiriniz.
            </p>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleDeclineTerms2}>Reddet</Button>
            <Button variant="outlined" color="neutral" onClick={handleAcceptTerms2}>
              Kabul Ediyorum
            </Button>
          </DialogActions>
        </div>
    </Dialog>
  </ThemeProvider>
}

export default Register