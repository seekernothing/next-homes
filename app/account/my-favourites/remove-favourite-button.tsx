"use client";

import { removeFavourite } from "@/app/property-search/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RemoveFavouriteButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-12 h-12 bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105 shadow-sm"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          toast.error("Authentication required", {
            description: "Please log in to manage favourites",
          });
          return;
        }

        try {
          await removeFavourite(propertyId, tokenResult.token);
          toast.success("Property removed from favourites", {
            description: "You can always add it back later",
          });
          router.refresh();
        } catch (error) {
          toast.error("Something went wrong", {
            description: "Please try again later",
          });
        }
      }}
      aria-label="Remove from favourites"
    >
      <Trash2Icon className="w-4 h-4" />
    </Button>
  );
}
