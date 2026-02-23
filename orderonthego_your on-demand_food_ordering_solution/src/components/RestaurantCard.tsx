import { Restaurant } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Star, Clock, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-border/50">
        <div className="relative h-44 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {restaurant.popular && (
            <Badge className="absolute top-3 left-3 gradient-orange border-0 text-primary-foreground font-semibold text-xs">
              🔥 Popular
            </Badge>
          )}
          {!restaurant.approved && (
            <Badge className="absolute top-3 right-3 bg-yellow-500 border-0 text-white font-semibold text-xs">
              Pending Approval
            </Badge>
          )}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-success text-success-foreground rounded-full px-2 py-0.5 text-xs font-bold">
              <Star className="h-3 w-3 fill-current" />
              {restaurant.rating}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5">{restaurant.location}</p>
          <p className="text-xs text-muted-foreground mt-1">{restaurant.cuisine.join(", ")}</p>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bike className="h-3 w-3" />
              ₹50 delivery
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              Min. ₹{restaurant.minOrder}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
