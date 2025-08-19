import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Bed,
  Bath,
  Square,
  MapPin,
  Search,
  Home,
  Calendar,
  Key,
  Star,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Heart,
  Eye,
  Phone,
  Mail,
  Shield,
  Award,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "NextHomes - Find Your Dream Home",
  description:
    "Discover verified property listings, schedule tours, and find your perfect home with NextHomes.",
  openGraph: {
    title: "NextHomes - Find Your Dream Home",
    description:
      "Discover verified property listings, schedule tours, and find your perfect home with NextHomes.",
    url: "https://nexthomes.com",
    siteName: "NextHomes",
    type: "website",
  },
};

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  beds: number;
  baths: number;
  areaSqFt: number;
  imageUrl: string;
  badges?: string[];
  status: string;
}

interface Neighborhood {
  id: string;
  name: string;
  city: string;
  description: string;
  imageUrl: string;
}

const properties: Property[] = [
  {
    id: "1",
    title: "Modern Lakeside Villa",
    price: 850000,
    city: "Mumbai",
    state: "MH",
    beds: 4,
    baths: 3,
    areaSqFt: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    badges: ["Featured", "Virtual Tour"],
    status: "for-sale",
  },
  {
    id: "2",
    title: "Downtown Luxury Apartment",
    price: 650000,
    city: "Delhi",
    state: "DL",
    beds: 2,
    baths: 2,
    areaSqFt: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    badges: ["New Listing"],
    status: "for-sale",
  },
  {
    id: "3",
    title: "Suburban Family Home",
    price: 450000,
    city: "Bangalore",
    state: "KA",
    beds: 5,
    baths: 4,
    areaSqFt: 4200,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    badges: ["Price Reduced"],
    status: "for-sale",
  },
  {
    id: "4",
    title: "Beach House Retreat",
    price: 1200000,
    city: "Goa",
    state: "GA",
    beds: 3,
    baths: 3,
    areaSqFt: 2800,
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    badges: ["Waterfront"],
    status: "for-sale",
  },
  {
    id: "5",
    title: "Mountain View Villa",
    price: 720000,
    city: "Pune",
    state: "MH",
    beds: 4,
    baths: 3,
    areaSqFt: 3500,
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    badges: ["Premium"],
    status: "for-sale",
  },
  {
    id: "6",
    title: "Urban Townhouse",
    price: 550000,
    city: "Hyderabad",
    state: "TS",
    beds: 3,
    baths: 2.5,
    areaSqFt: 2100,
    imageUrl:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
    badges: ["Move-in Ready"],
    status: "for-sale",
  },
];

const neighborhoods: Neighborhood[] = [
  {
    id: "1",
    name: "Bandra West",
    city: "Mumbai",
    description: "Premium residential area with sea views and luxury amenities",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Juhu Beach",
    city: "Mumbai",
    description: "Coastal paradise with stunning ocean views and beach access",
    imageUrl:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Koramangala",
    city: "Bangalore",
    description: "Tech hub with modern lifestyle and excellent connectivity",
    imageUrl:
      "https://images.unsplash.com/photo-1609924211018-5526c55bad5b?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Gurgaon Cyber City",
    city: "Delhi NCR",
    description: "Corporate hub with premium residential options",
    imageUrl:
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pb-16 pt-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl font-sans">
                  Find your dream home with NextHomes
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover verified property listings, schedule tours, and find
                  your perfect home with confidence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-2xl">
                  <Link href="/property-search">
                    Browse Properties
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-2xl"
                >
                  <Link href="/admin-dashboard/new">List Your Property</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" aria-hidden />
                  <span>10k+ verified listings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" aria-hidden />
                  <span>Trusted agents</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" aria-hidden />
                  <span>Instant filters</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern luxury home with pool"
                  width={600}
                  height={400}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 border-y bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            action="/property-search"
            method="GET"
            className="flex flex-col sm:flex-row gap-4 items-end"
          >
            <div className="flex-1">
              <Label
                htmlFor="location"
                className="text-sm font-medium mb-2 block"
              >
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="City, State, or ZIP"
                className="rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="min-price"
                className="text-sm font-medium mb-2 block"
              >
                Min Price
              </Label>
              <Input
                id="min-price"
                name="minPrice"
                type="number"
                placeholder="₹0"
                className="rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="max-price"
                className="text-sm font-medium mb-2 block"
              >
                Max Price
              </Label>
              <Input
                id="max-price"
                name="maxPrice"
                type="number"
                placeholder="Any"
                className="rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="bedrooms"
                className="text-sm font-medium mb-2 block"
              >
                Bedrooms
              </Label>
              <Select name="bedrooms">
                <SelectTrigger id="bedrooms" className="rounded-2xl">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="lg" className="rounded-2xl px-8">
              <Search className="mr-2 h-4 w-4" aria-hidden />
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our handpicked selection of premium homes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="rounded-2xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-0"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {property.badges && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {property.badges.map((badge) => (
                          <Badge
                            key={badge}
                            variant="secondary"
                            className="backdrop-blur-sm"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/90">
                        {property.status === "for-sale"
                          ? "For Sale"
                          : property.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold font-sans">
                        {formatPrice(property.price)}
                      </p>
                      <h3 className="text-lg font-semibold mt-1">
                        {property.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" aria-hidden />
                      <span className="text-sm">
                        {property.city}, {property.state}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" aria-hidden />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" aria-hidden />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" aria-hidden />
                        <span>{property.areaSqFt.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-2xl"
                  >
                    <Link href={`/property/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Your journey to a new home in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-2xl border shadow-sm text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">Search & Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse thousands of verified listings with our powerful search
                  filters and find homes that match your criteria
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">Schedule Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book virtual or in-person tours at your convenience with our
                  verified agents and homeowners
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Key className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">Close with Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete your purchase with our secure platform and trusted
                  partners for a smooth closing process
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neighborhood Highlights */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans mb-4">
              Explore Neighborhoods
            </h2>
            <p className="text-lg text-muted-foreground">
              Find your perfect community in these popular areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.id}
                href={`/property-search?city=${encodeURIComponent(
                  neighborhood.city
                )}`}
                className="group"
              >
                <Card className="rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={neighborhood.imageUrl}
                      alt={neighborhood.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg">
                        {neighborhood.name}
                      </h3>
                      <p className="text-sm opacity-90">{neighborhood.city}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {neighborhood.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real experiences from happy homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="space-y-4">
                  <p className="text-muted-foreground italic">
                    "NextHomes made finding our dream home incredibly easy. The
                    search filters are powerful and the agents were professional
                    throughout."
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">
                        Bought in Mumbai, MH
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="space-y-4">
                  <p className="text-muted-foreground italic">
                    "The virtual tour feature saved us so much time. We could
                    view properties from anywhere and only visited the ones we
                    loved."
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      MS
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Mike Smith</p>
                      <p className="text-xs text-muted-foreground">
                        Bought in Bangalore, KA
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="space-y-4">
                  <p className="text-muted-foreground italic">
                    "Selling our home was stress-free with NextHomes. They
                    handled everything professionally and we got a great price."
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      SC
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">
                        Sold in Delhi, DL
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center mb-4">
                <Home className="h-8 w-8 text-primary" aria-hidden />
              </div>
              <p className="text-4xl font-bold font-sans">15,000+</p>
              <p className="text-muted-foreground">Homes Listed</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" aria-hidden />
              </div>
              <p className="text-4xl font-bold font-sans">14 Days</p>
              <p className="text-muted-foreground">Avg. Time to Match</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-primary" aria-hidden />
              </div>
              <p className="text-4xl font-bold font-sans">500+</p>
              <p className="text-muted-foreground">Verified Agents</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about buying and selling with
              NextHomes
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border rounded-2xl px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                How do I start searching for homes?
              </AccordionTrigger>
              <AccordionContent>
                Simply use our quick search bar above or click "Browse
                Properties" to access our advanced search filters. You can
                search by location, price range, property type, and many other
                criteria to find your perfect home.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border rounded-2xl px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                Are all listings verified?
              </AccordionTrigger>
              <AccordionContent>
                Yes, every listing on NextHomes goes through our verification
                process. We confirm property details, ownership, and ensure all
                photos are current and accurate before a listing goes live.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border rounded-2xl px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                How much does it cost to use NextHomes?
              </AccordionTrigger>
              <AccordionContent>
                Searching for homes and browsing listings is completely free. If
                you decide to buy through NextHomes, our partner agents work on
                standard commission rates. For sellers, we offer competitive
                listing packages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border rounded-2xl px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                Can I schedule virtual tours?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Most of our listings offer virtual tour options. You
                can schedule a live virtual tour with an agent or access
                pre-recorded 3D tours for many properties directly from the
                listing page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border rounded-2xl px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                How quickly can I close on a home?
              </AccordionTrigger>
              <AccordionContent>
                The timeline varies depending on financing and other factors,
                but our streamlined process typically allows for closing within
                30-45 days. Cash purchases can often close even faster,
                sometimes within 2 weeks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of happy homeowners who found their perfect match
            with NextHomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-2xl">
              <Link href="/property-search">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link href="/contact">Talk to an Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 NextHomes. All rights reserved.
            </p>
            <nav className="flex gap-6">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
