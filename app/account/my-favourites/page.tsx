import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavourites } from "@/data/favourites";
import { getPropertiesById } from "@/data/properties";
import {
  HeartIcon,
  MapPinIcon,
  CurrencyIcon,
  BedIcon,
  BathIcon,
  EyeIcon,
  Trash2Icon,
  StarIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import RemoveFavouriteButton from "./remove-favourite-button";
import { redirect } from "next/navigation";
import Image from "next/image";
import imageUrlFormatter from "@/lib/imageUrlFormatter";
import numeral from "numeral";
import { Card, CardContent } from "@/components/ui/card";

export default async function MyFavourites({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;
  const pageSize = 6;
  const favourites = await getUserFavourites();
  const allFavourites = Object.keys(favourites);
  const totalPages = Math.ceil(allFavourites.length / pageSize);

  const paginatedFavourites = allFavourites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (!paginatedFavourites.length && page > 1) {
    redirect(`/account/my-favourites?page=${totalPages}`);
  }

  const properties = await getPropertiesById(paginatedFavourites);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header Section */}
      <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <HeartIcon className="w-5 h-5" />
              <span>My Favourites</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              My Favourite Properties
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Keep track of all the properties you've saved for future reference
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Card */}
        <div className="mb-8">
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Favourites
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {allFavourites.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedFavourites.length} of {allFavourites.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {!paginatedFavourites.length && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              No Favourite Properties Yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring properties and add them to your favourites to see
              them here
            </p>
            <Button asChild className="px-6 py-3">
              <Link href="/property-search">Browse Properties</Link>
            </Button>
          </div>
        )}

        {/* Properties Grid */}
        {!!paginatedFavourites.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedFavourites.map((favourite) => {
              const property = properties.find(
                (property) => property.id === favourite
              );

              if (!property) return null;

              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(", ");

              return (
                <div
                  key={favourite}
                  className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-primary/30 group"
                >
                  {/* Property Image */}
                  <div className="relative h-64 bg-muted/30 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <Image
                        src={`https://firebasestorage.googleapis.com/v0/b/next-homes-99ccb.firebasestorage.app/o/${encodeURIComponent(
                          property.images[0]
                        )}?alt=media`}
                        alt="Property"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center text-muted-foreground">
                        <HomeIcon className="w-16 h-16 mb-2 opacity-50" />
                        <span className="text-sm font-medium">
                          No Image Available
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <PropertyStatusBadge status={property?.status} />
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-xl border shadow-lg">
                      <div className="flex items-center gap-2">
                        <CurrencyIcon className="w-4 h-4 text-primary" />
                        <span className="font-bold text-lg">
                          ₹{numeral(property.price).format("0,0")}
                        </span>
                      </div>
                    </div>

                    {/* Favourite Indicator */}
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-2 rounded-xl shadow-lg">
                      <div className="flex items-center gap-2">
                        <HeartIcon className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Favourited</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6 space-y-4">
                    {/* Address */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight text-lg">
                          {address}
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

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                      >
                        <Link href={`/property/${property.id}`}>
                          <EyeIcon className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      <RemoveFavouriteButton propertyId={property.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    return (
                      <Button
                        disabled={page === i + 1}
                        key={i}
                        asChild={page !== i + 1}
                        variant={page === i + 1 ? "default" : "outline"}
                        className="w-12 h-12 p-0 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                      >
                        <Link href={`/account/my-favourites?page=${i + 1}`}>
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
      </div>
    </div>
  );
}
