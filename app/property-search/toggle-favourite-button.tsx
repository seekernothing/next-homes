"use client";

import { HeartIcon } from "lucide-react";
import { addFavourite, removeFavourite } from "./actions";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleFavouriteButton({
  propertyId,
  isFavourite,
}: {
  propertyId: string;
  isFavourite: boolean;
}) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <button
      className="absolute top-4 right-4 z-20 p-3 bg-background/90 backdrop-blur-sm rounded-full border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          router.push("/login");
          return;
        }

        try {
          if (isFavourite) {
            await removeFavourite(propertyId, tokenResult.token);
            toast.success("Property removed from favourites", {
              description: "You can always add it back later",
            });
          } else {
            await addFavourite(propertyId, tokenResult.token);
            toast.success("Property added to favourites", {
              description: "You can view it in your favourites",
            });
          }

          router.refresh();
        } catch (error) {
          toast.error("Something went wrong", {
            description: "Please try again later",
          });
        }
      }}
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <HeartIcon
        className={`w-5 h-5 transition-all duration-300 ${
          isFavourite
            ? "text-red-500 fill-red-500 group-hover:scale-110"
            : "text-muted-foreground group-hover:text-red-500 group-hover:scale-110"
        }`}
      />
    </button>
  );
}
