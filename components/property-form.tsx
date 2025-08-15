"use client";

import { useForm } from "react-hook-form";
import { propertySchema } from "@/validations/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import MultiImageUploader, { ImageUpload } from "./multi-image-uploder";
import {
  HomeIcon,
  MapPinIcon,
  DollarSignIcon,
  BedIcon,
  BathIcon,
  FileTextIcon,
  ImageIcon,
} from "lucide-react";

type Props = {
  submitButtonLabel: React.ReactNode;
  handleSubmit: (data: z.infer<typeof propertySchema>) => void;
  defaultValues?: z.infer<typeof propertySchema>;
};

export default function PropertyForm({
  handleSubmit,
  submitButtonLabel,
  defaultValues,
}: Props) {
  const combinedDefaultValues: z.infer<typeof propertySchema> = {
    ...{
      address1: "",
      address2: "",
      city: "",
      postcode: "",
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      status: "draft",
      description: "",
      images: [],
    },

    ...defaultValues,
  };

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: combinedDefaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Property Status Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Listing Status
            </h3>
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Property Status
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select listing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Section */}
        <div className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Property Address
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Address Line 1
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-base"
                      placeholder="Street address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Address Line 2 (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-base"
                      placeholder="Apartment, suite, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-base"
                      placeholder="City name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Postcode
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-base"
                      placeholder="Postal code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-gradient-to-r from-green-500/5 to-green-500/10 p-6 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <DollarSignIcon className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Property Details & Pricing
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Price (₹)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                      className="h-12 text-base"
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium flex items-center gap-2">
                    <BedIcon className="w-4 h-4" />
                    Bedrooms
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                      className="h-12 text-base"
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium flex items-center gap-2">
                    <BathIcon className="w-4 h-4" />
                    Bathrooms
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                      className="h-12 text-base"
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 p-6 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Property Description
            </h3>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Detailed Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={8}
                    className="resize-none text-base leading-relaxed"
                    placeholder="Describe your property in detail. Include features, amenities, neighborhood highlights, and what makes this property special..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images Section */}
        <div className="bg-gradient-to-r from-orange-500/5 to-orange-500/10 p-6 rounded-2xl border border-orange-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Property Images
            </h3>
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultiImageUploader
                    onImagesChange={(images: ImageUpload[]) => {
                      console.log({ images });
                      form.setValue("images", images);
                    }}
                    images={field.value}
                    urlFormatter={(image) => {
                      if (!image.file) {
                        return `https://firebasestorage.googleapis.com/v0/b/next-homes-99ccb.firebasestorage.app/o/${encodeURIComponent(
                          image.url
                        )}?alt=media`;
                      }
                      return image.url;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <Button
            className="h-14 px-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
