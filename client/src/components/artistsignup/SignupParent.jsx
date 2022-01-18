import { SignupForm } from "./SignupForm";
import { Redirect, useHistory } from "react-router-dom"

export const SignupParent = () => {
    const history = useHistory();
    let data = localStorage.getItem("token");
    data = JSON.parse(data);

    if (data) {
        return <Redirect to="/artist-home" push={true} />
    }

    return (
        <>
            <SignupForm  />
        </>
    )
}