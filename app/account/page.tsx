import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePasswordForm from "./update-password-form";
import DeleteAccountButton from "./delete-account-button";
import {
  UserIcon,
  ShieldIcon,
  AlertTriangleIcon,
  MailIcon,
  SettingsIcon,
  KeyIcon,
} from "lucide-react";

export default async function Account() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    redirect("/");
  }

  let decodedToken: DecodedIdToken;

  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (e) {
    redirect("/");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header Section */}
      <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <UserIcon className="w-5 h-5" />
              <span>Account Management</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              My Account
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Manage your account settings, security preferences, and personal
              information
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Information Card */}
        <Card className="shadow-lg border-border/50 bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-6 bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Profile Information
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Your basic account details and contact information
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Email Section */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <MailIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </Label>
                  <div className="text-lg font-semibold text-foreground mt-1">
                    {decodedToken.email}
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-600 text-xs font-medium rounded-full">
                  Verified
                </div>
              </div>

              {/* Account Type */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Account Type
                  </Label>
                  <div className="text-lg font-semibold text-foreground mt-1">
                    {decodedToken.admin ? "Administrator" : "Standard User"}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    decodedToken.admin
                      ? "bg-purple-500/10 text-purple-600"
                      : "bg-green-500/10 text-green-600"
                  }`}
                >
                  {decodedToken.admin ? "Admin" : "User"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Management Card */}
        {isPasswordProvider && (
          <Card className="shadow-lg border-border/50 bg-card/80 backdrop-blur-sm mb-8">
            <CardHeader className="pb-6 bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <KeyIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Password Management
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <UpdatePasswordForm />
            </CardContent>
          </Card>
        )}

        {/* Danger Zone Card */}
        {!decodedToken.admin && (
          <Card className="shadow-lg border-red-500/20 bg-red-500/5 backdrop-blur-sm">
            <CardHeader className="pb-6 bg-gradient-to-r from-red-500/10 to-red-500/5 border-b border-red-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <AlertTriangleIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-red-600">
                    Danger Zone
                  </CardTitle>
                  <p className="text-red-500/80 mt-2">
                    Irreversible actions that will permanently affect your
                    account
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    Delete Account
                  </h3>
                  <p className="text-red-500/80 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain. This action will permanently remove your account
                    and all associated data.
                  </p>
                  <DeleteAccountButton />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Actions */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-3 mb-4">
                <SettingsIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Need Help?
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                If you have any questions about your account or need assistance,
                please don't hesitate to contact our support team.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>24/7 Support Available</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Secure Account Management</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Privacy Protected</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
