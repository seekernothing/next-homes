import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-property-form";

export default function NewProperty() {
  return (
    <div>
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
      ></Breadcrumbs>

      <Card className="mt-9">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Property</CardTitle>
        </CardHeader>

        <CardContent>

            <NewPropertyForm/>
        </CardContent>
      </Card>
    </div>
  );
}
