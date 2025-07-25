"use client"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Button } from "./ui/button"

import { auth } from "@/firebase/client"

export default function ContinueWithGoogleButton(){
    return(
        <Button className="bg-black cursor-pointer"onClick={()=>{
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth,provider)
        }}>Continue With Google</Button>
    )
}