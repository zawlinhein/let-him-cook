"use client";
import { Filter, Star } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import RecipeCard, { RecipeType } from "./RecipeCard";
import Link from "next/link";

const RecipeFilter = ({ recipes }: { recipes: RecipeType[] }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  const filterOptions = [
    {
      category: "Meat",
      options: ["Chicken", "Beef", "Pork", "Fish", "Seafood", "Vegan"],
    },
    {
      category: "Time",
      options: ["Under 15 min", "15-30 min", "30-60 min", "1+ hour"],
    },
    { category: "Difficulty", options: ["Easy", "Medium", "Hard"] },
    {
      category: "Cuisine",
      options: ["Italian", "Asian", "Mexican", "Indian", "Mediterranean"],
    },
  ];
  return (
    <>
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4 sm:mb-6">
            <Filter className="w-5 h-5 text-text-secondary mr-2" />
            <h3 className="text-base sm:text-lg font-semibold text-text-main">
              Filter Recipes
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {filterOptions.map((category) => (
              <div key={category.category}>
                <h4 className="text-sm font-medium text-text-secondary mb-2">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.options.map((option) => (
                    <Badge
                      key={option}
                      variant={
                        selectedFilters.includes(option) ? "default" : "outline"
                      }
                      className={`cursor-pointer rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all text-xs sm:text-sm ${
                        selectedFilters.includes(option)
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "border-gray-300 text-text-secondary hover:border-primary hover:text-primary"
                      }`}
                      onClick={() => toggleFilter(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-text-main mb-6 sm:mb-8">
            All Recipes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {recipes.map((recipe) => (
              <Link href={`/recipe/${recipe._id}`} key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default RecipeFilter;
