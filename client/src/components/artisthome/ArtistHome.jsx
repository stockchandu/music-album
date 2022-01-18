import { ArtistSidebar } from "./ArtistSidebar";
import { ArtistStats } from "./ArtistStats";
import "./artisthome.css";

export const ArtistHome = () => {
    return (
        <>
            <div className="artisthome__parent">
                <div>
                    <ArtistSidebar/>
                </div>
                <div>
                    <ArtistStats />
                </div>
            </div>
        </>
    )
}