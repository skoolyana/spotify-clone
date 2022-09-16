import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackState } from '../atoms/songAtom';
import useSpotify from './useSpotify';




function useSongInfo() {

    const spotifyApi = useSpotify();
    
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);

    const [songInfo, setSongInfo] = useState(null);

    useEffect(()=> {

        const fetchSongInfo = async() => {

            if(currentTrackId) {

                const trackInfo = await fetch(

                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers:{
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());

                setSongInfo(trackInfo);
            }

        }
    
    },[currentTrackId,spotifyApi]);
    
    


    return songInfo;
  
}

export default useSongInfo