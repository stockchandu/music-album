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
import { useHistory } from "react-router-dom"
import axios from "axios";
import { storeLocalStorage } from "../../store/authStore/action";
import { useDispatch } from "react-redux";
import { setLocalstorage } from "../../customhook/useLocalstorage";
import { baseURL } from "../utility/utility"
const theme = createTheme();

export const SignupForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleArtistSignup = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let dataArtist = {
            email: data.get('email'),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName')
        };

        let { firstName, lastName, email, password } = dataArtist;

        if (!email || !password || !firstName || !lastName) {
            alert("fill all the form")
            return false
        }
        else {
            axios.post(`${baseURL}/artist_register`, {
                firstName, lastName, email, password
            }).then(({ data: { token, userArtist } }) => {
                setLocalstorage("user", userArtist);
                setLocalstorage("token", token);
            }).then(() => {
                setTimeout(() => {
                    history.push("/artist-home")
                }, 3000);
            })
        }


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
                            Artist Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleArtistSignup} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I accept terms and conditions."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container >
                                <Grid item>

                                    <Button
                                        type="text"
                                        variant="text"
                                        sx={{ mt: 0, mb: 2, ml: 0 }}
                                        style={{ fontSize: '13px' }}
                                        onClick={() => { history.push("/artist-login") }}
                                    >
                                        Already have account ?
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="text"
                                        sx={{ mt: 0, mb: 2, ml: 5 }}
                                        style={{ fontSize: '13px' }}
                                        onClick={() => { history.push("/artist-login") }}
                                    >
                                        Sign in
                                    </Button>
                                </Grid>


                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )

}