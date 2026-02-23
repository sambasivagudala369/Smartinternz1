import { useParams, useNavigate } from "react-router-dom";
import { restaurants, menuItems } from "@/data/mockData";
import MenuItemCard from "@/components/MenuItemCard";
import { ArrowLeft, Star, Clock, Bike, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SORT_OPTIONS = ["Popularity", "Low Price", "High Price", "Discount", "Rating"];
const FOOD_TYPES = ["Veg", "Non Veg", "Beverages"];
const CATEGORIES = ["Biryani", "Curry", "Burger", "Fries", "Beverages", "Pizza"];

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === id);
  const [sort, setSort] = useState("Popularity");
  const [foodTypes, setFoodTypes] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🍽️</p>
        <h2 className="font-heading font-bold text-xl">Restaurant not found</h2>
        <Button className="mt-4" onClick={() => navigate("/restaurants")}>Back to Restaurants</Button>
      </div>
    );
  }

  const items = menuItems.filter((m) => m.restaurantId === id);

  const filtered = items.filter((item) => {
    const matchType = foodTypes.length === 0 || foodTypes.includes(item.type) || foodTypes.includes("Beverages" as string);
    const matchCat = cats.length === 0 || cats.includes(item.category);
    return matchType && matchCat;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Low Price") return a.price - b.price;
    if (sort === "High Price") return b.price - a.price;
    if (sort === "Discount") return (b.mrp - b.price) - (a.mrp - a.price);
    if (sort === "Rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  return (
    <div className="min-h-screen">
      {/* Restaurant Header */}
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary-foreground/70 hover:text-secondary-foreground mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-24 w-24 rounded-2xl object-cover shadow-md border-2 border-primary/20"
            />
            <div className="flex-1">
              <h1 className="font-heading font-extrabold text-2xl text-secondary-foreground">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-1 text-secondary-foreground/70 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
              <p className="text-sm text-secondary-foreground/60 mt-1">
                {restaurant.cuisine.join(", ")}
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm text-secondary-foreground/80">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-secondary-foreground/80">
                  <Clock className="h-4 w-4 text-primary" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center gap-1 text-sm text-secondary-foreground/80">
                  <Bike className="h-4 w-4 text-primary" />
                  ₹50 delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-52 shrink-0">
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border sticky top-20">
              <h3 className="font-heading font-bold text-foreground mb-4">Filters</h3>

              {/* Sort By */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sort By</p>
                <RadioGroup value={sort} onValueChange={setSort} className="gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`sort-${opt}`} className="text-primary" />
                      <Label htmlFor={`sort-${opt}`} className="text-sm cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Food Type */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Food Type</p>
                <div className="flex flex-col gap-2">
                  {FOOD_TYPES.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${t}`}
                        checked={foodTypes.includes(t)}
                        onCheckedChange={() => toggleFilter(foodTypes, setFoodTypes, t)}
                        className="border-primary data-[state=checked]:bg-primary"
                      />
                      <Label htmlFor={`type-${t}`} className="text-sm cursor-pointer">{t}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</p>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <Checkbox
                        id={`cat-${c}`}
                        checked={cats.includes(c)}
                        onCheckedChange={() => toggleFilter(cats, setCats, c)}
                        className="border-primary data-[state=checked]:bg-primary"
                      />
                      <Label htmlFor={`cat-${c}`} className="text-sm cursor-pointer">{c}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Menu Items */}
          <div className="flex-1">
            <h2 className="font-heading font-bold text-xl text-foreground mb-5">
              All Items
              <span className="ml-2 text-sm font-normal text-muted-foreground">({sorted.length} items)</span>
            </h2>
            {sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-muted-foreground">No items match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sorted.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
