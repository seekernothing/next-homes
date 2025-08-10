import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/data/properties";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import PropertiesTable from "./properties-tabel";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams?: Promise<any>;
}) {
  const searchParamsValue = await searchParams;
  console.log({ searchParamsValue });

  // const data = await getProperties()
  // console.log(data)
  return (
    <div>
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
          },
        ]}
      />

      <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>

      <Button asChild className="inline-flex  pl-2 gap-2 mt-4 ">
        <Link href="/admin-dashboard/new">
          {" "}
          <PlusCircle /> New Property
        </Link>
      </Button>

      <PropertiesTable
        page={searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1}
      ></PropertiesTable>
    </div>
  );
}
