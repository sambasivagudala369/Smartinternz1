import { categories, restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Shield } from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";

export default function Home() {
  const navigate = useNavigate();
  const popularRestaurants = restaurants.filter((r) => r.popular && r.approved);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-xl animate-fade-in">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              🍽️ On-Demand Food Delivery
            </p>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
              Delicious Food,{" "}
              <span className="text-gradient-orange">Delivered Fast</span>
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Explore hundreds of restaurants, order your favorite meals, and get them delivered right to your doorstep.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gradient-orange text-primary-foreground border-0 shadow-orange font-bold px-8"
                onClick={() => navigate("/restaurants")}
              >
                Order Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold"
                onClick={() => navigate("/auth")}
              >
                Get Started Free
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: MapPin, label: "500+ Restaurants" },
                { icon: Clock, label: "30 min delivery" },
                { icon: Shield, label: "Safe & Secure" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/80 text-sm">
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
          What are you craving?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/restaurants?category=${cat.id}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-border group-hover:border-primary shadow-card transition-all duration-300 group-hover:shadow-orange group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-2xl text-foreground">
            Popular Restaurants
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary font-semibold"
            onClick={() => navigate("/restaurants")}
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {popularRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* All Restaurants */}
      <section className="bg-muted/40 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-2xl text-foreground">
              All Restaurants
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {restaurants.filter((r) => r.approved).map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading font-bold text-xl mb-2 text-gradient-orange">SB Foods</p>
          <p className="text-sm text-secondary-foreground/60">
            © 2024 SB Foods. Your on-demand food ordering solution.
          </p>
        </div>
      </footer>
    </div>
  );
}
