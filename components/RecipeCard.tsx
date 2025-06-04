import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { ChefHat, Clock, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Author, Recipe } from "@/sanity/sanity-types";

type ImageAsset = {
  asset: {
    _id: string;
    url: string;
  };
};

export type RecipeType = Omit<Recipe, "image" | "author"> & {
  image: ImageAsset;
  author: Author;
};

const RecipeCard = ({ recipe }: { recipe: RecipeType }) => {
  return (
    <>
      <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-surface">
        <div className="relative">
          <Image
            src={recipe.image?.asset.url || "https://placehold.co/300x200/png"}
            alt={recipe.title || ""}
            width={300}
            height={200}
            className="w-full h-40 sm:h-48 object-cover"
          />
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-surface rounded-full px-2 sm:px-3 py-1 shadow-md">
            <div className="flex items-center space-x-1">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-accent fill-current" />
              <span className="text-xs sm:text-sm font-medium text-text-main">
                {recipe.rating}
              </span>
            </div>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6">
          <h4 className="text-lg sm:text-xl font-semibold text-text-main mb-2 sm:mb-3 line-clamp-2">
            {recipe.title}
          </h4>

          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4 text-text-secondary">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="text-xs sm:text-sm">{recipe.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChefHat className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="text-xs sm:text-sm">{recipe.difficulty}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {recipe.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-accent/20 text-text-main rounded-full text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeCard;
