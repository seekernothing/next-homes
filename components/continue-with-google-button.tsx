"use client";


import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


import { useAuth } from "@/context/auth";



export default function ContinueWithGoogleButton() {
  const router = useRouter()
  const auth = useAuth();

  return (
    <Button
      className="bg-black cursor-pointer w-full"
      onClick={async() => {
      await  auth?.loginWithGoogle()
      router.refresh()
      }}
      // variant={"default"}
     
    >
      Continue With Google
    </Button>
  );
}
