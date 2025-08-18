"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchIcon, FilterIcon, XIcon } from "lucide-react";

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
});

export default function FiltersForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxPrice: searchParams.get("maxPrice") ?? "",
      minBedrooms: searchParams.get("minBedrooms") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const newSearchParams = new URLSearchParams();

    if (data.minPrice) {
      newSearchParams.set("minPrice", data.minPrice);
    }

    if (data.maxPrice) {
      newSearchParams.set("maxPrice", data.maxPrice);
    }

    if (data.minBedrooms) {
      newSearchParams.set("minBedrooms", data.minBedrooms);
    }

    newSearchParams.set("page", "1");
    router.push(`/property-search?${newSearchParams.toString()}`);
  };

  const clearFilters = () => {
    router.push("/property-search");
  };

  const hasActiveFilters =
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice") ||
    searchParams.get("minBedrooms");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Minimum Price
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      ₹
                    </span>
                    <Input
                      {...field}
                      placeholder="0"
                      type="number"
                      min={0}
                      className="pl-8 h-12 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Maximum Price
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      ₹
                    </span>
                    <Input
                      {...field}
                      placeholder="Any"
                      type="number"
                      min={0}
                      className="pl-8 h-12 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minBedrooms"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Minimum Bedrooms
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Any"
                    type="number"
                    min={0}
                    className="h-12 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all duration-200"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <XIcon className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <SearchIcon className="w-4 h-4" />
              Search Properties
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <FilterIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Active Filters:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchParams.get("minPrice") && (
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Min: ₹{searchParams.get("minPrice")}
                </span>
              )}
              {searchParams.get("maxPrice") && (
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Max: ₹{searchParams.get("maxPrice")}
                </span>
              )}
              {searchParams.get("minBedrooms") && (
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Min Bedrooms: {searchParams.get("minBedrooms")}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
