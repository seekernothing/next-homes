import PropertyStatusBadge from "@/components/property-status-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import { BathIcon, BedIcon, MapPinIcon, CurrencyIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-button";

export const dynamic = "force-static";

export default async function Property({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <BackButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_450px] gap-8">
          {/* Left Column - Images & Description */}
          <div className="space-y-8">
            {/* Image Carousel */}
            {!!property.images && property.images.length > 0 && (
              <div className="group">
                <Carousel className="w-full">
                  <CarouselContent>
                    {property.images.map((image, index) => (
                      <CarouselItem key={image}>
                        <div className="relative h-[70vh] min-h-96 rounded-2xl overflow-hidden border shadow-lg">
                          <Image
                            src={`https://firebasestorage.googleapis.com/v0/b/next-homes-99ccb.firebasestorage.app/o/${encodeURIComponent(
                              image
                            )}?alt=media`}
                            alt={`Property Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Image Counter */}
                          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium border shadow-sm">
                            {index + 1} / {property.images?.length?? 0}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {property.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background/90 transition-all duration-200" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background/90 transition-all duration-200" />
                    </>
                  )}
                </Carousel>
              </div>
            )}

            {/* Property Description */}
            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full"></span>
                Property Description
              </h3>
              <div className="prose max-w-none">
                <div className="text-muted-foreground leading-relaxed">
                  <ReactMarkdown>{property.description}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Property Details */}
          <div className="space-y-6">
            {/* Main Property Card */}
            <div className="bg-card border rounded-2xl p-8 sticky top-8 shadow-sm">
              {/* Status Badge */}
              <div className="mb-6">
                <PropertyStatusBadge
                  status={property.status}
                  className="text-base px-4 py-2"
                />
              </div>

              {/* Address */}
              <div className="mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <MapPinIcon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h1 className="text-3xl font-bold text-foreground leading-tight">
                      {addressLines.map((addressLine, index) => (
                        <div key={index} className="leading-relaxed">
                          {addressLine}
                          {index < addressLines.length - 1 && (
                            <span className="text-muted-foreground">,</span>
                          )}
                        </div>
                      ))}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <CurrencyIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    Listing Price
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-foreground">
                  ₹{numeral(property.price).format("0,0")}
                </h2>
              </div>

              {/* Property Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Property Features
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 border rounded-xl p-4 hover:bg-muted/70 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BedIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {property.bedrooms}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bedrooms
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 border rounded-xl p-4 hover:bg-muted/70 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BathIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {property.bathrooms}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bathrooms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Interested in this property?
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Contact us for more information or to schedule a viewing.
                </p>
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
