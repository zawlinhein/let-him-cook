import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ArrowLeft, ChefHat } from "lucide-react";
import CreateForm from "@/components/CreateForm";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={"/"}>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-text-main hover:bg-white/80 shadow-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Recipes</span>
            </Button>
          </Link>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-main">
              Create New Recipe
            </h1>
          </div>
          <p className="text-text-secondary">
            Share your delicious creation with the world!
          </p>
        </div>
        <CreateForm />
      </div>
    </div>
  );
};

export default page;
