import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { artistAlbumLoad, getArtistAlbumData, artistAlbumError } from "../../store/artistalbumstore/action";
import axios from 'axios';
import "./artistalbumform.css";
import { ArtistAlbumList } from "./ArtistAlbumList";
import { getLocalstorage } from "../../customhook/useLocalstorage";
import { baseURL } from "../utility/utility";
export const ArtistAlbumForm = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false)
    const [input, setInput] = useState({
        albumName: "",
        genre: "",
        year: "",
        albumPoster: "",
    })

    const [userInfo] = getLocalstorage("user");
    const { _id: artistName } = userInfo;


    const handleChange = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }


    useEffect(() => {
        getDataByUserId()
    }, [])

    const { albumName, genre, year, albumPoster } = input;

    const handleSubmit = () => {
        if (!albumName || !genre || !year) {
            alert("Fill all the details")
            return false
        }
        try {
            setLoad(true)
            dispatch(artistAlbumLoad(true));
            axios.post(`${baseURL}/create_album`, {
                albumName, genre, year, artistName, albumPoster
            }).then(() => {
                setLoad(false)
                getDataByUserId()
            })

        } catch (err) {
            dispatch(artistAlbumError(err));
        }
    }

    const getDataByUserId = async () => {
        const { data: { all_album } } = await axios.get(`${baseURL}/all_album/${artistName}`)
        dispatch(getArtistAlbumData(all_album));
    }

    return (
        <>

            <div className="artist__main-parent">
                <div className="artist__album__form-container" >
                    <div className="artist__album__form-input">
                        <div>
                            <div>Album Name</div>
                            <input type="text" name="albumName" onChange={handleChange} placeholder="Enter album name" />
                        </div>

                        <div>
                            <div>Album Year</div>
                            <input type="text" name="year" onChange={handleChange} placeholder="Enter album year" />
                        </div>
                        <div>
                            <div>Album Cover Image</div>
                            <input type="text" name="albumPoster" onChange={handleChange} placeholder="Paste album cover url" />
                        </div>
                    </div>

                    <div className="artist__album__form-input">
                        <div>
                            <div> Album Genre</div>
                            <select name="genre" onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="rock">Rock</option>
                                <option value="popmusic">Pop</option>
                                <option value="jazz">Jazz</option>
                                <option value="dance">Dance</option>
                                <option value="sad">Sad</option>
                                <option value="romantic">Romantic</option>
                            </select>
                        </div>

                    </div>

                    <div className="artist__album-btn">
                        <button onClick={handleSubmit}>{load ? "Adding..." : "ADD ALBUM"}</button>
                    </div>
                </div>

                <div className="student__list">

                    <div>

                    </div>
                    <div>
                        <ArtistAlbumList />
                    </div>

                </div>

            </div>
            {/* </form> */}

        </>
    )
}