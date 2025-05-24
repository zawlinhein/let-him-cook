"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { X } from "lucide-react";

const SearchResetButton = () => {
  const reset = () => {
    const inputBox = document.querySelector("#searchBar") as HTMLFormElement;
    if (inputBox) inputBox.reset();
  };
  return (
    <Link href={"/"}>
      <Button
        type="reset"
        onClick={reset}
        className="m-1.5 bg-primary hover:bg-primary/90 text-white rounded-xl px-2 py-1 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <X className="w-4 h-4" />
      </Button>
    </Link>
  );
};

export default SearchResetButton;
