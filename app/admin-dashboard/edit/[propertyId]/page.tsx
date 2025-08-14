import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import EditPropertyForm from "./edit-property-form";

export default async function EditProperty({
  params,
}: {
  params: Promise<any>;
}) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  console.log({ property });

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
                label: "Edit Property",
              },
            ]}
          />

          <div className="mt-6">
            <h1 className="text-4xl font-bold text-foreground">
              Edit Property
            </h1>
            <p className="text-muted-foreground mt-2">
              Update the details of your property listing
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
              Make changes to your property listing below
            </p>
          </CardHeader>

          <CardContent className="pb-8">
            <EditPropertyForm
              id={property.id}
              address1={property.address1}
              address2={property.address2}
              city={property.city}
              postcode={property.postcode}
              bathrooms={property.bathrooms}
              bedrooms={property.bedrooms}
              price={property.price}
              description={property.description}
              status={property.status}
              images={property.images || []}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
