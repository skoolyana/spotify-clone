import React from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ order, track }) {
  const spotifyApi = useSpotify();

  const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackState);

  const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async() => {

    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play(
      {
        uris:[track.track.uri],
      }
    )
  }


  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
      <div className="flex items-center pl-3 space-x-4 py-1">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} alt={track.track.album.name}></img>

        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>

          <p>{track.track.artists[0].name}</p>
        </div>

        <div className="flex items-center justify-between ml-auto md:ml-0 pr-10">
          <p className="w-60 hidden md:inline">{track.track.album.name}</p>

          <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
      </div>
    </div>
  );
}

export default Song;
