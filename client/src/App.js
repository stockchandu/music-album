import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { PrivateRoute } from "./privateroute/privateRoute";
import { Navbar } from "./components/navbar/Navbar";
import { SignupParent } from "./components/artistsignup/SignupParent";
import { LoginParent } from "./components/artistlogin/LoginParent";
import { ArtistAlbumParent } from "./components/artistaddalbum/ArtistAlbumParent";
import { ArtistProfileParent } from "./components/artistprofile/ArtistProfileParent";
import { ArtistHome } from "./components/artisthome/ArtistHome";
import { GuestAlbumParent } from "./components/guestalbum/GuestAlbumParent";
import { GuestSongParent } from "./components/guestallsong/GuestSongParent";
import { NotFound } from "./components/notfound/NotFound";
function App() {
  // const  [searchParams]  = new URLSearchParams(window.location);
  // console.log([...searchParams])
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/add-album">
            <ArtistAlbumParent />
          </PrivateRoute>
          {/* <PrivateRoute exact path="/addcontest">
            <ContestParent />
          </PrivateRoute> */}
          <Route exact path="/artist-home">
            <ArtistHome />
          </Route>
          <PrivateRoute exact path="/artist-profile">
            <ArtistProfileParent />
          </PrivateRoute>
          <Route exact path="/artist-signup">
            <SignupParent />
          </Route>
          <Route exact path="/artist-login">
            <LoginParent />
          </Route>
          <Route exact path="/:id">
            <GuestAlbumParent />
          </Route>
          <Redirect from='/' to="/search" />
          <Route exact path="/all-song/:id">
            <GuestSongParent />
          </Route>
          <Route path='*' exact={true} component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
