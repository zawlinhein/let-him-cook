import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  ChefHat,
  Star,
  Users,
  Mail,
  Share2,
  Bookmark,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { GET_RECIPE_BY_ID } from "@/sanity/lib/query";
import { RecipeType } from "@/components/RecipeCard";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const recipeData: RecipeType = await client.fetch(GET_RECIPE_BY_ID, { id });
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Back Button */}
            <div className="mb-6">
              <Link href={"/"}>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-text-main hover:bg-white/80 shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Recipes</span>
                </Button>
              </Link>
            </div>

            {/* Hero Section */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <Image
                  src={
                    recipeData.image?.asset.url ||
                    "https://placehold.co/600x400/png"
                  }
                  alt={recipeData.title || ""}
                  width={600}
                  height={400}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    {recipeData.title}
                  </h1>
                  <p className="text-sm sm:text-base opacity-90 line-clamp-2">
                    {recipeData.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Recipe Metadata */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Total Time</p>
                      <p className="font-semibold text-text-main">
                        {recipeData.time} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChefHat className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Difficulty</p>
                      <p className="font-semibold text-text-main">
                        {recipeData.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-accent fill-current" />
                    <div>
                      <p className="text-sm text-text-secondary">Rating</p>
                      <p className="font-semibold text-text-main">
                        {recipeData.rating}/5
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Servings</p>
                      <p className="font-semibold text-text-main">
                        {recipeData.servings}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-main mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recipeData.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-accent/20 text-text-main"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-base text-text-secondary leading-relaxed">
                      {recipeData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-text-main">
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipeData.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-text-main leading-relaxed">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-text-main">
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipeData.instructions?.map((instruction, index) => (
                    <li key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-text-main leading-relaxed pt-1">
                        {instruction.children
                          ?.map((span) => span.text)
                          .join("")}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Rating Component  */}
            {/* <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-text-main">
                  Rate This Recipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={handleStarLeave}
                        className="transition-colors duration-200"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredStar || userRating)
                              ? "text-accent fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <span className="text-text-secondary">
                      You rated this {userRating}/5 stars
                    </span>
                  )}
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-text-main">
                  Recipe by
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={"https://placehold.co/600x400/png"}
                      alt={`${recipeData.author.name} ${recipeData.author.familyName}`}
                    />
                    <AvatarFallback className="bg-accent text-text-main text-lg">
                      {recipeData.author.name}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-main text-lg">
                      {recipeData.author.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="w-4 h-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">
                        {recipeData.author.email}
                      </span>
                    </div>
                    <Button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white">
                      Follow Chef
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-text-main">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Meal Plan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Recipe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save to Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
