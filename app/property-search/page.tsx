import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersForm from "./filters-form";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";
import Image from "next/image";
import imageUrlFormatter from "@/lib/imageUrlFormatter";
import {
  BathIcon,
  BedIcon,
  HomeIcon,
  MapPinIcon,
  CurrencyIcon,
  SearchIcon,
  FilterIcon,
} from "lucide-react";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ToggleFavouriteButton from "./toggle-favourite-button";
import { getUserFavourites } from "@/data/favourites";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const searchParamsValues = await searchParams;

  const parsedPage = parseInt(searchParamsValues?.page);
  const parsedMinPrice = parseInt(searchParamsValues?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValues?.maxPrice);
  const parsedMinBedrooms = parseInt(searchParamsValues?.minBedrooms);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 9,
    },
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"],
    },
  });

  const userFavourites = await getUserFavourites();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  let verifiedToken: DecodedIdToken | null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header Section */}
      <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <SearchIcon className="w-5 h-5" />
              <span>Property Search</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover amazing properties with our advanced search filters and
              detailed listings
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Filters Section */}
        <Card className="shadow-lg border-border/50 bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-6 bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <FilterIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Search Filters
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Refine your search to find the perfect property
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Suspense>
              <FiltersForm />
            </Suspense>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <HomeIcon className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Available Properties
            </h2>
            <span className="text-muted-foreground text-lg">
              ({data.length} found)
            </span>
          </div>
        </div>

        {/* Enhanced Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {data.map((property: any) => {
            const addressLines = [
              property.address1,
              property.address2,
              property.city,
              property.postcode,
            ]
              .filter((addressLine) => !!addressLine)
              .join(", ");

            return (
              <Card
                key={property.id}
                className="group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-primary/30"
              >
                <CardContent className="p-0">
                  {/* Enhanced Image Section */}
                  <div className="relative h-64 bg-muted/30 overflow-hidden">
                    {(!verifiedToken || !verifiedToken.admin) && (
                      <ToggleFavouriteButton
                        isFavourite={userFavourites[property.id]}
                        propertyId={property.id}
                      />
                    )}

                    {!!property.images?.[0] ? (
                      <Image
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        src={imageUrlFormatter(property.images[0])}
                        alt={`${addressLines} - Property Image`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center text-muted-foreground">
                        <HomeIcon className="w-16 h-16 mb-2 opacity-50" />
                        <span className="text-sm font-medium">
                          No Image Available
                        </span>
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-xl border shadow-lg">
                      <div className="flex items-center gap-2">
                        <CurrencyIcon className="w-4 h-4 text-primary" />
                        <span className="font-bold text-lg">
                          ₹{numeral(property.price).format("0,0")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Property Details */}
                  <div className="p-6 space-y-4">
                    {/* Address */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight text-lg">
                          {addressLines}
                        </h3>
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="flex items-center gap-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BedIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Bedrooms
                          </p>
                          <p className="font-semibold text-foreground">
                            {property.bedrooms}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BathIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Bathrooms
                          </p>
                          <p className="font-semibold text-foreground">
                            {property.bathrooms}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      asChild
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <Link href={`/property/${property.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const newSearchParams = new URLSearchParams();

                    if (searchParamsValues?.minPrice) {
                      newSearchParams.set(
                        "minPrice",
                        searchParamsValues.minPrice
                      );
                    }

                    if (searchParamsValues?.maxPrice) {
                      newSearchParams.set(
                        "maxPrice",
                        searchParamsValues.maxPrice
                      );
                    }

                    if (searchParamsValues?.minBedrooms) {
                      newSearchParams.set(
                        "minBedrooms",
                        searchParamsValues.minBedrooms
                      );
                    }

                    newSearchParams.set("page", `${i + 1}`);

                    return (
                      <Button
                        key={i}
                        disabled={page === i + 1}
                        asChild={page !== i + 1}
                        variant={page === i + 1 ? "default" : "outline"}
                        className="w-12 h-12 p-0 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                      >
                        <Link
                          href={`/property-search?${newSearchParams.toString()}`}
                        >
                          {i + 1}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results State */}
        {data.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HomeIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No Properties Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search filters or check back later for new
              listings
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/property-search")}
              className="px-6 py-3"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
