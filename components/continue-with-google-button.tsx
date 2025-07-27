"use client";


import { Button } from "./ui/button";


import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();

  return (
    <Button
      className="bg-black cursor-pointer"
      onClick={() => {
        auth?.loginWithGoogle()
      }}
    >
      Continue With Google
    </Button>
  );
}
