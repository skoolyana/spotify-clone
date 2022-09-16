import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playList = useRecoilValue(playlistState);

  return (
    <div className="px-6 flex flex-col mt-3 space-y-2 pb-28 text-white">
      {playList?.tracks.items.map((track,i) => (
       <Song key={track.track.id} track={track} order={i}    ></Song>
      ))}
    </div>
  );
}

export default Songs;
