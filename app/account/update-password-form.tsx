"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { passwordValidation } from "@/validations/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { KeyIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const formSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    newPasswordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["newPasswordConfirm"],
        code: "custom",
      });
    }
  });

export default function UpdatePasswordForm() {
  const auth = useAuth();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const user = auth?.currentUser;
    if (!user?.email) {
      return;
    }

    try {
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, data.currentPassword)
      );
      await updatePassword(user, data.newPassword);
      toast.success("Password updated successfully", {
        description: "Your password has been changed. Please log in again.",
      });
      form.reset();
    } catch (e: any) {
      toast.error(
        e.code === "auth/invalid-credential"
          ? "Your current password is incorrect"
          : "An error occurred while updating your password",
        {
          description: "Please check your current password and try again.",
        }
      );
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <LockIcon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Change Password
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Enter current password"
                        type={showPasswords.current ? "text" : "password"}
                        className="h-12 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all duration-200 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPasswords.current ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Enter new password"
                        type={showPasswords.new ? "text" : "password"}
                        className="h-12 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all duration-200 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPasswords.new ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Confirm New Password */}
          <FormField
            control={form.control}
            name="newPasswordConfirm"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Confirm new password"
                      type={showPasswords.confirm ? "text" : "password"}
                      className="h-12 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all duration-200 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPasswords.confirm ? (
                        <EyeOffIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Requirements */}
          <div className="p-4 bg-muted/30 border border-border/50 rounded-xl">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <KeyIcon className="w-4 h-4 text-primary" />
              Password Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>At least 6 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>1 uppercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>1 lowercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>1 number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>1 special character</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <KeyIcon className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
