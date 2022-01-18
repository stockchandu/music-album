import { useState, useEffect, useContext } from "react";
import "./guestalbumfilter.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    guestAlbumLoading,
    guestAlbumSuccess,
    guestAlbumError
} from "../../store/guestalbumstore/action";
import { baseURL } from "../utility/utility";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Paginate } from "../context/SetPaginate";
import { parse } from 'query-string';
export const GuestAlbumFilter = () => {
    const { setTotalPage, page } = useContext(Paginate);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        albumName: "",
        genre: "",
        year: "",
    })

    const history = useHistory();
    const urlParamData = parse(window.location.search);


    const handleGuestInputChange = (event) => {
        let { name, value } = event.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    let { albumName, genre, year } = input;

    useEffect(() => {
        getDataByUrl();
    }, [window.location.search, page])

    const getDataByUrl = async () => {
        dispatch(guestAlbumLoading(true));
        try {

            if (albumName) {
                let { data: { guestAlbumName } } = await axios.get(`${baseURL}/guest_all_album/filter?albumname=${albumName}`)
                dispatch(guestAlbumSuccess(guestAlbumName));
            }

            else if (genre || urlParamData.genre) {
                history.replace(`search?genre=${genre ? genre : urlParamData.genre}&page=${page ? page : 1}&size=${urlParamData.size ? urlParamData.size : 8}`)
                let { data: { guestAlbumGenre, totalPage } } = await axios.get(`${baseURL}/guest_all_album/filter?genre=${genre ? genre : urlParamData.genre}&page=${page ? page : 1}&size=${urlParamData.size ? urlParamData.size : 8}`)
                setTotalPage(totalPage);
                dispatch(guestAlbumSuccess(guestAlbumGenre));
            }

            else if (year || urlParamData.year) {
                history.replace(`search?year=${year ? year : urlParamData.year}&page=${page ? page : 1}&size=${urlParamData.size ? urlParamData.size : 8}`)

                let { data: { guestAlbumYear, totalPage } } = await axios.get(`${baseURL}/guest_all_album/filter?year=${year ? year : urlParamData.year}&page=${page ? page : 1}&size=${urlParamData.size ? urlParamData.size : 8}`)
                setTotalPage(totalPage);
                dispatch(guestAlbumSuccess(guestAlbumYear));
            }

            else if (genre && year || urlParamData.year && urlParamData.genre) {
                history.replace(`search?year=${year ? year : urlParamData.year}&genre=${genre ? genre : urlParamData.genre}&page=${page ? page : 1}&size=${urlParamData.size ? urlParamData.size : 8}`)

                let { data: { guestFindGYA } } = await axios.get(`${baseURL}/guest_all_album/filter?year=${year ? year : urlParamData.year}&genre=${genre ? genre : urlParamData.genre}&page=${page ? page : 1}&size=${urlParamData.size ? urlParamData.size : 8}`)
                dispatch(guestAlbumSuccess(guestFindGYA));
            }
            else {
                let { data: { guestAllAlbum, totalPage } } = await axios.get(`${baseURL}/guest_all_album?page=${page}&size=8`)
                setTotalPage(totalPage)
                dispatch(guestAlbumSuccess(guestAllAlbum))
            }

        } catch (err) {
            dispatch(guestAlbumError(err));
        }
    }

    const handleGuestFilter = async () => {
        dispatch(guestAlbumLoading(true));
        try {

            if (albumName) {
                let { data: { guestAlbumName } } = await axios.get(`${baseURL}/guest_all_album/filter?albumname=${albumName}`)
                dispatch(guestAlbumSuccess(guestAlbumName));
            }

            else if (genre || urlParamData.genre) {
                history.replace(`search?genre=${genre}`)
                let { data: { guestAlbumGenre } } = await axios.get(`${baseURL}/guest_all_album/filter?genre=${genre ? genre : urlParamData.genre}`)
                dispatch(guestAlbumSuccess(guestAlbumGenre));
            }

            else if (year) {
                let { data: { guestAlbumYear } } = await axios.get(`${baseURL}/guest_all_album/filter?year=${year}`)
                dispatch(guestAlbumSuccess(guestAlbumYear));
            }

            else if (genre && year) {
                let { data: { guestFindGYA } } = await axios.get(`${baseURL}/guest_all_album/filter?year=${year}&genre=${genre}`)
                dispatch(guestAlbumSuccess(guestFindGYA));
            }

        } catch (err) {
            dispatch(guestAlbumError(err));
        }
    }
    return (
        <>
            <div className="guest__album__filter-parent">
                <div className="guest__filter__input-box">
                    <div>Album</div>
                    <input type="text" placeholder="Search by Album" name="albumName" onChange={handleGuestInputChange} />
                </div>

                <div className="guest__filter__input-box">
                    <div>Genre</div>
                    <select name="genre" onChange={handleGuestInputChange}>
                        <option value="">Select</option>
                        <option value="rock">Rock</option>
                        <option value="popmusic">Pop</option>
                        <option value="jazz">Jazz</option>
                        <option value="dance">Dance</option>
                        <option value="sad">Sad</option>
                        <option value="romantic">Romantic</option>
                    </select>
                </div>
                <div className="guest__filter__input-box">
                    <div>Year</div>
                    <select name="year" onChange={handleGuestInputChange}>
                        <option value="">Select</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2021">2022</option>
                    </select>
                </div>

                <div className="guest__filter__input-box" >
                    <button onClick={handleGuestFilter}>Apply</button>
                </div>
            </div>
            <hr />
        </>
    )
}