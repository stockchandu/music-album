import "./artistprofile.css"

import { getLocalstorage } from "../../customhook/useLocalstorage";

export const ArtistProfileInput = ({ handleChange, handleUpdate, errPassword, err, load }) => {
    const [userInfo] = getLocalstorage("user");
    const { email, firstName, lastName, artistProfile } = userInfo;


    return (
        <>

            <div className="artist__profile-parent">
                <div className="artist__profile-child-1">
                    <div>
                        <img src={artistProfile} default="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_account_circle_48px-512.png" alt="profile" />
                    </div>

                    <div>Profile</div>
                </div>

                <div className="artist__profile-child-2">

                    <div className="artist__profile_child2-element">
                        <p>Hii, {firstName} {lastName}</p>
                    </div>

                    <div className="artist__profile_child2-element">
                        <p>Update Profile</p>
                    </div>

                    <div className="artist__profile_child2-element-file">
                        <input type="file" name="profile_img" id="" accept="image/*" onChange={handleChange} />
                    </div>

                    <div className="artist__profile_child2-element">
                        <p>Email</p>
                    </div>

                    <div className="artist__profile_child2-element">
                        <input type="text" value={email} placeholder="Old Email" disabled />

                    </div>

                    <div className="artist__profile_child2-element">
                        <p>Change Password</p>
                    </div>

                    <div className="artist__profile_child2-element">
                        <input type="text" placeholder="Old Password" name="oldpass" onChange={handleChange} style={err ? { border: "1px solid red" } : { border: "1px solid #DDDEE1" }} />
                        <input type="text" placeholder="New Password" name="password" onChange={handleChange} style={err ? { border: "1px solid red" } : { border: "1px solid #DDDEE1" }} />
                    </div>
                    <div>{errPassword ? "old password is wrong" : ""}</div>
                    <div className="artist__profile_child2-element">
                        <button onClick={handleUpdate}>{load ? "Updating..." : "Save"}</button>
                    </div>
                </div>
            </div>

        </>
    )
}