import RecipeFilter from "@/components/RecipeFilter";
import SearchBar from "@/components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const searchQuery = (await searchParams).query;

  return (
    <>
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mb-4 sm:mb-6">
            Let Him Cook
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Discover and share your favorite recipes. From quick meals to
            gourmet dishes, inspire others with your cooking.
          </p>

          <SearchBar searchQuery={searchQuery} />
        </div>
      </section>
      <RecipeFilter />
    </>
  );
}
