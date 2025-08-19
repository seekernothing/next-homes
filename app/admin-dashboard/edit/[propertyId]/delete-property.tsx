"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { storage } from "@/firebase/client";
import { deleteObject, ref } from "firebase/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon, AlertTriangleIcon } from "lucide-react";
import { deleteProperty } from "./actions";

export default function DeletePropertyButton({
  propertyId,
  imagePaths = [],
}: {
  propertyId: string;
  imagePaths?: string[];
}) {
  const auth = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const token = await auth?.currentUser?.getIdToken();
      if (!token) {
        toast.error("Unauthorized", { description: "Please log in again." });
        setIsDeleting(false);
        return;
      }

      // Best-effort delete storage images first
      if (imagePaths.length) {
        await Promise.allSettled(
          imagePaths.map((path) => deleteObject(ref(storage, path)))
        );
      }

      const result = await deleteProperty(propertyId, token);
      if (result?.error) {
        toast.error("Failed to delete", { description: result.message });
        setIsDeleting(false);
        return;
      }

      toast.success("Property deleted", {
        description: "The property has been removed successfully.",
      });
      router.push("/admin-dashboard");
      router.refresh();
    } catch (e: any) {
      toast.error("Something went wrong", {
        description: e?.message ?? "Please try again later.",
      });
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" aria-label="Delete property">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <AlertTriangleIcon className="w-5 h-5 text-red-500" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-red-600">
              Delete Property
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            property and its images.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
