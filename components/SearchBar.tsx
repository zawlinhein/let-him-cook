import { Search, X } from "lucide-react";
import Form from "next/form";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import SearchResetButton from "./SearchResetButton";

const SearchBar = ({ searchQuery }: { searchQuery?: string }) => {
  return (
    <div className="relative max-w-2xl mx-auto px-4 sm:px-0">
      <Form
        id="searchBar"
        action={"/"}
        className="relative flex items-center bg-white rounded-2xl shadow-lg border-2 border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200"
      >
        <Search className="absolute left-4 text-text-secondary w-5 h-5 z-10" />
        <Input
          name="query"
          type="text"
          defaultValue={searchQuery}
          placeholder="Search recipes..."
          className="flex-1 pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg bg-transparent border-0 rounded-2xl focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {searchQuery && <SearchResetButton />}
        <Button
          type="submit"
          className="m-1.5 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-2.5 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Search className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline font-medium">Search</span>
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
