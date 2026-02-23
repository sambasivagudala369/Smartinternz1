import { restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const [search, setSearch] = useState(qParam);

  const approved = restaurants.filter((r) => r.approved);
  const filtered = approved.filter((r) => {
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.some((c) => c.toLowerCase().includes(search.toLowerCase())) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !categoryParam ||
      r.cuisine.some((c) => c.toLowerCase() === categoryParam.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <div className="bg-secondary py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-extrabold text-3xl text-secondary-foreground mb-2">
            All Restaurants
          </h1>
          <p className="text-secondary-foreground/60 mb-6">
            {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} available
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants or cuisine..."
              className="pl-9 bg-card border-border"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <h2 className="font-heading font-bold text-xl text-foreground">No restaurants found</h2>
            <p className="text-muted-foreground mt-2">Try a different search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
