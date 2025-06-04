"use server";

import { auth } from "@/auth";
import { convertBlockArray, parseServerActionRes } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/writeClient";

export const createRecipe = async (
  state: any,
  form: FormData,
  tags: string[],
  ingredients: string[]
) => {
  const session = await auth();
  if (!session)
    return parseServerActionRes({
      status: "ERROR",
      error: "Not Signed in",
    });
  const {
    title,
    description,
    time,
    rating,
    servings,
    difficulty,
    instructions,
  } = Object.fromEntries(form);
  const slug = slugify(title as string, { lower: true, strict: true });
  const image = form.get("image") as File;
  try {
    const imageAsset = await writeClient.assets.upload("image", image, {
      filename: image.name,
    });
    const recipe = {
      title,
      description,
      time,
      rating,
      servings,
      difficulty,
      instructions: convertBlockArray(instructions as string),
      tags,
      ingredients,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      slug: {
        _type: "slug",
        current: slug,
      },
    };
    const uploadResult = await writeClient.create({
      _type: "recipe",
      ...recipe,
    });
    return parseServerActionRes({
      status: "SUCCESS",
      ...uploadResult,
    });
  } catch (error) {
    return parseServerActionRes({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
