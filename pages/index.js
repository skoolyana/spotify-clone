
import SideBar from "../components/SideBar";
import Center from "../components/Center";
import Head from 'next/head';
import Image from 'next/image' ;
import { getSession } from 'next-auth/react';
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="bg-black  h-screen overflow-hidden">
        
    <main className="flex">  
    <SideBar></SideBar>
    <Center></Center>
 

 
    </main>

    <div className="sticky bottom-0"> 
    
    <Player></Player>
     </div>
    
    
    
    
    </div>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession(context);

  return {

    props: {
      session,
    },

  };




}




