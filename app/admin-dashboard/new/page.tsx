import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-property-form";
import {
  PlusCircle,
  Sparkles,
  HomeIcon,
  FileText,
  ImageIcon,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function NewProperty() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header Section */}
      <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <Breadcrumbs
            items={[
              {
                href: "/admin-dashboard",
                label: "Dashboard",
              },
              {
                label: "New Property",
              },
            ]}
          />

          <div className="mt-8 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <PlusCircle className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Create New Property
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Add a stunning new property listing to your portfolio with our
              intuitive form builder
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Feature Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <HomeIcon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Property Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Fill in comprehensive property information
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Image Gallery
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload stunning property photos
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Pricing & Status
              </h3>
              <p className="text-sm text-muted-foreground">
                Set competitive pricing and listing status
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

          <CardHeader className="relative pb-8 bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                  Property Information
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </CardTitle>
                <p className="text-muted-foreground mt-2 text-lg">
                  Complete all the details below to create your new property
                  listing
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative p-8">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-tl from-primary/20 to-primary/10 rounded-full blur-xl" />

              <NewPropertyForm />
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 p-8">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Ready to showcase your property?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your new property listing will be automatically optimized for
                search and displayed with professional styling across all
                platforms.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Form saves automatically as you type</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Professional image optimization</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Instant preview available</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
