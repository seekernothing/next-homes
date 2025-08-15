"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validations/propertySchema";

import { PlusCircleIcon, Sparkles, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { createProperty } from "./actions";
import { savePropertyImages } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
import { useState } from "react";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    setIsSubmitting(true);
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      setIsSubmitting(false);
      return;
    }

    const { images, ...rest } = data;

    const response = await createProperty(rest, token);

    if (!!response.error || !response.propertyId) {
      toast.error("Error!", {
        description: response.error,
      });
      setIsSubmitting(false);
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];
    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${
          response.propertyId
        }/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);
    await savePropertyImages(
      { propertyId: response.propertyId, images: paths },
      token
    );

    toast.success("Success", {
      description: "Property created successfully!",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    });

    setIsSubmitting(false);
    router.push("/admin-dashboard");
  };

  return (
    <div className="space-y-8">
      {/* Form Header with Progress Indicator */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Smart Form Builder</span>
        </div>
        <p className="text-muted-foreground text-lg">
          Fill out the form below to create your new property listing. All
          fields are required for the best results.
        </p>
      </div>

      {/* Enhanced Property Form */}
      <div className="relative">
        <PropertyForm
          handleSubmit={handleSubmit}
          submitButtonLabel={
            <>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Creating Property...</span>
                </div>
              ) : (
                <>
                  <PlusCircleIcon className="w-5 h-5" />
                  <span>Create Property</span>
                </>
              )}
            </>
          }
        />
      </div>

      {/* Form Tips */}
      <div className="mt-12 p-6 bg-muted/30 rounded-2xl border border-border/50">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Pro Tips for Better Listings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>Use high-quality images (minimum 1200x800px)</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>Write detailed, engaging descriptions</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>Set competitive pricing based on market research</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>Choose the right status for your listing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
