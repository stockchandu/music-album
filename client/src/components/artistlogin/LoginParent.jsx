import { LoginForm } from "./LoginForm";
import { Redirect } from "react-router-dom";

export const LoginParent = () => {
    let data = localStorage.getItem("token");
    data = JSON.parse(data);

    if (data) {
        return <Redirect to="/artist-home" push={true} />
    }
    return (
        <>
        <LoginForm />
        </>
    )
}