import { GuestAlbum } from "./GuestAlbum";
import { GuestAlbumFilter } from "./GuestAlbumFilter";

export const GuestAlbumParent = () => {
  return (
    <>
      <GuestAlbumFilter />
      <div className="guest__trending-heading">Trending Now</div>
      <GuestAlbum />
    </>
  )
}