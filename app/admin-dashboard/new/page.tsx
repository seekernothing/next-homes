import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-property-form";

export default function NewProperty() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
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

          <div className="mt-6">
            <h1 className="text-4xl font-bold text-foreground">
              Create New Property
            </h1>
            <p className="text-muted-foreground mt-2">
              Add a new property listing to your portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Property Details
            </CardTitle>
            <p className="text-muted-foreground">
              Fill in the details below to create your new property listing
            </p>
          </CardHeader>

          <CardContent className="pb-8">
            <NewPropertyForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
