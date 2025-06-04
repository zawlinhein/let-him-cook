import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID, GET_RECIPE_BY_AUTHOR_ID } from "@/sanity/lib/query";
import { notFound } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, ChefHat, Star, Mail } from "lucide-react";
import Image from "next/image";
import { RecipeType } from "@/components/RecipeCard";
import { Author } from "@/sanity/sanity-types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const userData: Author = await client.fetch(AUTHOR_BY_ID, { id });
  if (!userData) return notFound();
  const recipes: RecipeType[] = await client.fetch(GET_RECIPE_BY_AUTHOR_ID, {
    id: userData._id,
  });
  const session = await auth();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={userData.image || "https://placehold.co/48x48/png"}
                    alt={`${userData.name} ${userData.familyName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-accent text-text-main text-2xl sm:text-3xl font-bold">
                    {userData.familyName}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-main mb-2">
                    {userData.name}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">
                      {userData.email}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                {/*  <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
                  {userData.bio}
                </p> */}

                {/* Stats */}
                <div className="flex justify-center sm:justify-start space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-text-main">
                      {recipes.length}
                    </div>
                    <div className="text-sm text-text-secondary">Recipes</div>
                  </div>
                  {/* <div className="text-center">
                    <div className="text-2xl font-bold text-text-main">
                      {userData.stats.followers}
                    </div>
                    <div className="text-sm text-text-secondary">Followers</div>
                  </div> */}
                  {/* <div className="text-center">
                    <div className="text-2xl font-bold text-text-main">
                      {userData.stats.following}
                    </div>
                    <div className="text-sm text-text-secondary">Following</div>
                  </div> */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="mb-8">
          <Separator className="mb-6" />
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main">
              {session.id === userData._id
                ? "Your Posts"
                : `${session.user.familyName}'s Posts`}
            </h2>
            <div className="text-sm text-text-secondary">
              {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {recipes.map((post) => (
            <Card
              key={post._id}
              className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-surface cursor-pointer group"
            >
              <div className="relative">
                <Image
                  src={
                    post.image.asset.url || "https://placehold.co/300x200/png"
                  }
                  alt={post.title || ""}
                  width={300}
                  height={200}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-surface rounded-full px-2 sm:px-3 py-1 shadow-md">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 sm:w-4 h-3 sm:h-4 text-accent fill-current" />
                    <span className="text-xs sm:text-sm font-medium text-text-main">
                      {post.rating}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-text-main mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>

                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4 text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-xs sm:text-sm">{post.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChefHat className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      {post.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {post.tags?.map((tag) => (
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
          ))}
        </div>

        {/* Empty State (if no posts) */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-main mb-2">
              No recipes yet
            </h3>
            {/* <p className="text-text-secondary mb-6">
              Start sharing your delicious creations with the world!
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              Create Your First Recipe
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
