import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/data/properties";
import {
  PlusCircle,
  SearchIcon,
  FilterIcon,
  Grid3X3Icon,
  ListIcon,
} from "lucide-react";
import Link from "next/link";
import PropertiesGrid from "./properties-grid";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams?: Promise<any>;
}) {
  const searchParamsValue = await searchParams;
  console.log({ searchParamsValue });

  // Get actual property data for stats
  const { data: properties } = await getProperties({
    pagination: { page: 1, pageSize: 1000 }, // Get all properties for counting
  });

  // Calculate actual stats
  const totalProperties = properties?.length || 0;
  const forSaleCount =
    properties?.filter((p: any) => p.status === "for-sale").length || 0;
  const draftCount =
    properties?.filter((p: any) => p.status === "draft").length || 0;
  const soldCount =
    properties?.filter((p: any) => p.status === "sold").length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              {
                label: "Dashboard",
              },
            ]}
          />

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your property listings and view analytics
              </p>
            </div>

            <Button
              asChild
              className="inline-flex items-center gap-2 px-6 py-3 text-base"
            >
              <Link href="/admin-dashboard/new">
                <PlusCircle className="w-5 h-5" />
                New Property
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Grid3X3Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Properties
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalProperties}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  For Sale
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {forSaleCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Draft
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {draftCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Sold
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {soldCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4" />
                Filter
              </Button>

              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" className="rounded-r-none">
                  <Grid3X3Icon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-l-none border-l"
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {/* <PropertiesGrid
          page={searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1}
        /> */}

        <PropertiesGrid
          page={
            searchParamsValue?.page
              ? parseInt(
                  Array.isArray(searchParamsValue.page)
                    ? searchParamsValue.page[0]
                    : searchParamsValue.page
                )
              : 1
          }
        />
      </div>
    </div>
  );
}
