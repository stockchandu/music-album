import { ArtistProfileInput } from "./ArtistProfileInput"
import { useState } from "react"
import axios from "axios"
import { getLocalstorage } from "../../customhook/useLocalstorage";
import { setLocalstorage } from "../../customhook/useLocalstorage";
import { baseURL } from "../utility/utility"
export const ArtistProfileParent = () => {
    const [userInfo] = getLocalstorage("user");
    const { _id, password } = userInfo;
    const [input, setInput] = useState({
        profile_img: "",
        email: "",
        oldpass: "",
        password: "",
    })
    const [error, setError] = useState(false);
    const [errPassword, setPassword] = useState(false);
    const [load, setLoad] = useState(false)

    const handleChange = (event) => {
        const { name, value, files, type } = event.target;
        setInput({
            ...input,
            [name]: type === "file" ? URL.createObjectURL(files[0]) : value
        })

    }

    const handleUpdate = () => {

        if (input.profile_img) {
            setLoad(true)
            axios.patch(`${baseURL}/admin_update/${_id}`, {
                profile_img: input.profile_img,
            }).then(({ data: { userAdmin } }) => {
                setLoad(false)
                setLocalstorage("user", userAdmin)
                setTimeout(() => {
                    window.location.reload();
                }, 2000)

            })
        }

        else {

            if (!input.oldpass || !input.password) {
                setError(true);
                setLoad(false)
                return false
            } else {

                if (password !== input.oldpass) {
                    setPassword(true)
                    setLoad(false)
                    return false;
                }
                else {
                    setLoad(true)
                    axios.patch(`${baseURL}/admin_update/${_id}`, {
                        profile_img: input.profile_img,
                        password: input.password,
                    }).then(({ data: { userAdmin } }) => {
                        setLoad(false)
                        setLocalstorage("user", userAdmin)
                    })
                }

            }


        }

    }
    return (
        <>
            <ArtistProfileInput
                handleChange={handleChange}
                handleUpdate={handleUpdate}
                err={error}
                errPassword={errPassword}
                load={load}
            />
        </>
    )
}