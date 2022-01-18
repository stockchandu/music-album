import { closeIcon } from "../utility/utility";
import "./sidebar.css";
import { useLocation, useHistory } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export const Sidebar = ({ showSidebar, showSideBar }) => {
    const { pathname } = useLocation();
    const history = useHistory();

    return (
        <>
            <div className="show__side-bar"
                style={showSidebar === "visible" ?
                    { display: "block" } : { display: "none" }}
            >

                <img
                    src={closeIcon}
                    alt={closeIcon}
                    width="20"
                    onClick={showSideBar} />

                <p
                    style={pathname === "/artist-home" ?
                        { backgroundColor: "#D1DCDE" } : { backgroundColor: "#FFFFFF" }}
                    onClick={() => { history.push("/artist-home"); showSideBar() }}
                > <span><HomeIcon /> </span>Home</p>

                <p
                    style={pathname === "/add-album" ?
                        { backgroundColor: "#D1DCDE" } : { backgroundColor: "#FFFFFF" }}
                    onClick={() => { history.push("/add-album"); showSideBar() }}
                ><span><AddCircleOutlineIcon /> </span> Add Album</p>

                <p
                    style={pathname === "/add-song" ?
                        { backgroundColor: "#D1DCDE" } : { backgroundColor: "#FFFFFF" }}
                    onClick={() => { history.push("/add-song"); showSideBar() }}
                ><span><AddCircleOutlineIcon /> </span> Add Song</p>
                 <p
                    style={pathname === "/" ?
                        { backgroundColor: "#D1DCDE" } : { backgroundColor: "#FFFFFF" }}
                    onClick={() => { history.push("/search"); showSideBar() }}
                ><span><AudiotrackIcon /> </span> Album List & Songs</p>

            </div>
        </>
    )
}