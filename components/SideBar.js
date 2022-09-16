import React, { useEffect, useState } from 'react';
import {
    
    HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon,HeartIcon,RssIcon
   
  } from '@heroicons/react/solid';

import useSpotify from '../hooks/useSpotify';
import {signOut, useSession} from "next-auth/react";

import {useRecoilState} from "recoil";

import {playlistIdState} from "../atoms/playlistAtom";


function SideBar() {    

const {
    data:session, status} = useSession();
    console.log(session);
    const [playLists,setPlayLists] = useState([]);
    const [playListId,setPlaylistId]=useRecoilState(playlistIdState);

    const spotifyApi = useSpotify();

    console.log("You Picked playList >>>"+playListId);


useEffect(()=> {

    if(spotifyApi.getAccessToken())
    {
        spotifyApi.getUserPlaylists().then((data)=> {

            setPlayLists(data.body.items);

        });
    }

},[session,spotifyApi]);


console.log("My PlayLists");


console.log(playLists);



  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide  h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
 
    <div className="space-y-4">
    

        <button className='flex items-center space-x-2 hover:text-white'>
            <SearchIcon className='h-5 w-5'/>
            <p>Search</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'>
            <LibraryIcon className='h-5 w-5' />
            <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>
        

        <button className='flex items-center space-x-2 hover:text-white'>
            <PlusCircleIcon className='h-5 w-5'/>
            <p>Create PlayList</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'>
            <HeartIcon className='h-5 w-5'/>
            <p>Your Episodes</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'>
            <RssIcon className='h-5 w-5' />
            <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>
        {

            playLists.map((playlist)=> 
            
            (
                <p key={playlist.id} onClick={
                    ()=> setPlaylistId(playlist.id)}
                    className="cursor-pointer hover:text-white"

                
                >
                     {playlist.name}
                </p>
            )
            )


        }

    <p className="cursor-pointer hover:text-white"> PlayList Name</p>



    </div>
        
    </div>
  )
}

export default SideBar