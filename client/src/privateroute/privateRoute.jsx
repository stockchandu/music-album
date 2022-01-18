import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, path }) => {

    let localToken = localStorage.getItem("token");
    localToken = JSON.parse(localToken);

    let sessionToken = sessionStorage.getItem("token");
    sessionToken = JSON.parse(sessionToken);

    if (!localToken && !sessionToken) {
        return <Redirect to="/artist-login" push={true} />
    }

    return <Route path={path}>
        {children}
    </Route>
}