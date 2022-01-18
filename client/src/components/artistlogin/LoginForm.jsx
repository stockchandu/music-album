import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react"
import { storeLocalStorage, storeSessionStorage } from "../../store/authStore/action";
import { useDispatch } from "react-redux";
import { setLocalstorage } from "../../customhook/useLocalstorage";
import { baseURL } from "../utility/utility";
const theme = createTheme();

export const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showerror, SetShowError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        let dataInformation = {
            email: data.get('email'),
            password: data.get('password'),
            checkbox: data.get('remember'),
        };

        let { email, password, checkbox } = dataInformation;

        if (!email && !password) {
            SetShowError(true)
        }

        axios.post(`${baseURL}/artist_login`, {
            email, password
        })
            .then(({ data: { token, status, userArtist } }) => {

                if (status === 400) {
                    SetShowError(true)
                    return false
                }

                else {
                    setLocalstorage("user", userArtist);
                    if (checkbox === "remind") {
                        dispatch(storeLocalStorage(token));
                        setTimeout(() => {
                            history.push("/artist-home")
                        }, 2000);
                    } else {
                        dispatch(storeSessionStorage(token));
                        setTimeout(() => {
                            history.push("/artist-home")
                        }, 2000);
                    }

                }

            })
            .catch(err => {
                if (err) {
                    SetShowError(true)
                }
            })
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Artist Login
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remind" name="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        variant="text"
                                        sx={{ mt: 0, mb: 2, ml: 15 }}
                                    >
                                        forget password
                                    </Button>
                                </Grid>
                            </Grid> */}
                            <Grid item>

                                <p
                                    style={{ marginLeft: "33%", color: "red" }}
                                >
                                    {showerror ? "Invalid Artist details" : null}
                                </p>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )

}