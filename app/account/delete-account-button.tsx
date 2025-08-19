"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeToken } from "@/context/action";
import { useAuth } from "@/context/auth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { deleteUserFavourites } from "./actions";
import { toast } from "sonner";
import {
  Trash2Icon,
  AlertTriangleIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";

export default function DeleteAccountButton() {
  const auth = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDeleteClick = async () => {
    if (!password.trim()) {
      toast.error("Password required", {
        description: "Please enter your current password to continue.",
      });
      return;
    }

    if (auth?.currentUser?.email) {
      setIsDeleting(true);
      try {
        await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(auth.currentUser.email, password)
        );
        await deleteUserFavourites();
        await deleteUser(auth.currentUser);
        await removeToken();
        toast.success("Account deleted successfully", {
          description:
            "Your account and all data have been permanently removed.",
        });
      } catch (e: any) {
        toast.error(
          e.code === "auth/invalid-credential"
            ? "Incorrect password"
            : "Failed to delete account",
          {
            description:
              e.code === "auth/invalid-credential"
                ? "Please check your current password and try again."
                : "An unexpected error occurred. Please try again later.",
          }
        );
      }
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <Trash2Icon className="w-4 h-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <AlertTriangleIcon className="w-5 h-5 text-red-500" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-red-600">
              Delete Account
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800 text-sm leading-relaxed">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Enter current password to continue:
                </Label>
                <div className="relative">
                  <Input
                    className="h-12 border-red-200 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20 transition-all duration-200 pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteClick}
            disabled={isDeleting || !password.trim()}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2Icon className="w-4 h-4 mr-2" />
                Delete Account
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
