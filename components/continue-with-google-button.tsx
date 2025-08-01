"use client";


import { Button } from "./ui/button";


import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();

  return (
    <Button
      className="bg-black cursor-pointer w-full"
      onClick={() => {
        auth?.loginWithGoogle()
      }}
      // variant={"default"}
     
    >
      Continue With Google
    </Button>
  );
}
