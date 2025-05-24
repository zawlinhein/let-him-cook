import { ChefHat, LogIn, LogOut, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { auth, signIn, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="bg-surface shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-text-main">
              Let Him Cook
            </h1>
          </div>

          {/* Navigation Actions - Show icons only on mobile, full buttons on desktop */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {session && session?.user ? (
              <>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-3 sm:px-6">
                  <Plus className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Create</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                  className="rounded-xl border-text-secondary text-text-secondary hover:bg-gray-50 px-3 sm:px-6"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session.user.image!} />
                  <AvatarFallback className="bg-accent text-text-main">
                    <img src={"https://placehold.co/48x48/png"} />
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={async () => {
                  "use server";
                  await signIn("google");
                }}
                className="rounded-xl border-text-secondary text-text-secondary hover:bg-gray-50 px-3 sm:px-6"
              >
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
