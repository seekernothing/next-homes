import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/data/properties";
import {
  EyeIcon,
  PencilIcon,
  MapPinIcon,
  CurrencyIcon,
  BedIcon,
  BathIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";

export default async function PropertiesGrid({ page = 1 }: { page?: number }) {
  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 6, // Show 6 properties per page for grid layout
    },
  });

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-12 h-12 bg-muted rounded-full"></div>
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          No Properties Found
        </h3>
        <p className="text-muted-foreground mb-6">
          Get started by creating your first property listing
        </p>
        <Button asChild>
          <Link href="/admin-dashboard/new">Create Your First Property</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.map((property:any) => {
          const address = [
            property.address1,
            property.address2,
            property.city,
            property.postcode,
          ]
            .filter((addressLine) => !!addressLine)
            .join(", ");

          return (
            <div
              key={property.id}
              className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              {/* Property Image */}
              <div className="relative h-48 bg-muted/30">
                {property.images && property.images.length > 0 ? (
                  <Image
                    src={`https://firebasestorage.googleapis.com/v0/b/next-homes-99ccb.firebasestorage.app/o/${encodeURIComponent(
                      property.images[0]
                    )}?alt=media`}
                    alt="Property"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-muted-foreground/30 rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <PropertyStatusBadge status={property.status} />
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                {/* Address */}
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                      {address}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CurrencyIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                      Listing Price
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{numeral(property.price).format("0,0")}
                  </p>
                </div>

                {/* Property Features */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BedIcon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {property.bedrooms} Beds
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BathIcon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {property.bathrooms} Baths
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/property/${property.id}`}>
                      <EyeIcon className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/admin-dashboard/edit/${property.id}`}>
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                disabled={page === i + 1}
                asChild={page !== i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                className="w-10 h-10 p-0"
              >
                <Link href={`/admin-dashboard?page=${i + 1}`}>{i + 1}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
