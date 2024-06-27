import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { alertcenter_v1beta1 } from "googleapis";
import { NextPage } from "next";
import handler from "./api/submit";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  
  const [song, setSong] = useState('') 
  const [artist, setArtist] = useState('') 
  const [name, setName] = useState('') 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = {
      song,
      artist,
      name
    }

    const rawResponse = await fetch('/api/submit',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(form)
    });

    const content = await rawResponse.json();

    //console.log(content)
    alert(content)

    setName('')
    setArtist('')
    setSong('')
    
    

  }
  
  return (
   <main className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-16">
          <form className="py-4 space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center justify-center">
                  <label className="sr-only">New Year Songs</label>
              </div>
              <div className="flex items-center justify-center">
                  <label htmlFor="song" className="sr-only">ชื่อเพลง</label>
                  <input value={song} onChange={e => setSong(e.target.value)} type="text" name="song" id="song" className="shadow-md focus:ring-indigo-500 block w-64 sm:text-md border-gray-100 rounded-md" placeholder="ใส่ชื่อเพลงจ้า"/>
              </div>
              <div className="flex items-center justify-center">
                  <label htmlFor="artist" className="sr-only">ศิลปิน</label>
                  <input value={artist} onChange={e => setArtist(e.target.value)} type="text" name="artist" id="artist" className="shadow-md focus:ring-indigo-500 block w-64 sm:text-md border-gray-100 rounded-md" placeholder="อันนี้ชื่อนักร้อง น้องรัก" />
              </div>
              <div className="flex items-center justify-center">
                  <label htmlFor="name" className="sr-only">ลงชื่อ</label>
                  <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" className="shadow-md focus:ring-indigo-500 block w-64 sm:text-md border-gray-100 rounded-md" placeholder="ใส่ชื่อคนที่จะร้อง (แพ็งค์,แจ็ค,เดือน)"/>
              </div>
              <div className="flex items-center justify-center">
                  <button type="submit" className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 text-white bg-indigo-500" >Save</button>
              </div>
          </form>
      </div>
   </main>
  )
}

export default Home