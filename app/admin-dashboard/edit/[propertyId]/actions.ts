"use server";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validations/propertySchema";
import { revalidatePath } from "next/cache";

export const updateProperty = async (data: Property, authToken: string) => {
  const { id, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  await firestore
    .collection("properties")
    .doc(id)
    .update({
      ...propertyData,
      updated: new Date(),
    });

  // adding caching

  revalidatePath(`/property/${id}`);
};

export const deleteProperty = async (propertyId: string, authToken: string) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  try {
    await firestore.collection("properties").doc(propertyId).delete();
  } catch (e: any) {
    return {
      error: true,
      message: e?.message ?? "Failed to delete property",
    };
  }

  // Invalidate caches for dashboard and the property page
  revalidatePath("/admin-dashboard");
  revalidatePath(`/property/${propertyId}`);
};
