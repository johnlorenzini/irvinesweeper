import Head from 'next/head'
import { GoogleMaps } from '@/components/Maps/GoogleMaps'
import Overlay from '@/components/Overlay'
import React, { useState } from 'react'
import Header from '@/components/Layout/Header'
import GameOver from '@/components/GameOver'
import Cursor from '@/components/Cursor'
import Footer from '@/components/Footer'

type Props = {
  irvineData: any
}

const startingBalance = 2300; 

export default function Home({ irvineData }: Props) {
  const [ balance, setBalance ] = useState(startingBalance);
  const [ isGameOver, setIsGameOver ] = useState(false);
  const [ showGreeting, setShowGreeting ] = useState(true);
  const [savedClicks, setSavedClicks] = useState([]);

  const changeBalance = (changeBy : number) => {
    if(balance + changeBy > 0){
      setBalance(balance + changeBy);
    }
    else{
      setBalance(0);
      setIsGameOver(true);
    }
  }

  return (
    <>
      
      <Head>
        <title>irvinesweeper</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cursor />
      <main>
        <Header balance={balance}/>
        <div className="!font-josefin relative h-screen w-full overflow-hidden">
          <GoogleMaps 
            changeBalance={changeBalance}
            savedClicks={savedClicks}
            // @ts-ignore
            setSavedClicks={setSavedClicks}
          />
          <Overlay showGreeting={showGreeting} setShowGreeting={setShowGreeting}/> 
          <GameOver isGameOver={isGameOver} setGameOver={setIsGameOver} resetGame={() => {
            setBalance(startingBalance) 
            setShowGreeting(true)
            savedClicks.forEach((circle: any) => {
              circle.setMap(null);
            });
            setSavedClicks([])
          }}/>
          <div className={"absolute top-0 left-0 h-full w-full shadow-[inset_0px_0px_100px_35px_rgba(0,0,0,0.5)] pointer-events-none transition duration-1000 " 
          + ((!isGameOver && !showGreeting) ? "scale-100" : "scale-125")}/>
          <Footer isVisible={(!isGameOver && !showGreeting)}/>

        </div>
      </main>
    </>
  )
}
