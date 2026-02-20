import { MenuItem } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Minus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find((i) => i.item.id === item.id);
  const qty = cartItem?.quantity ?? 0;
  const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground border-0 font-bold text-xs">
            {discount}% OFF
          </Badge>
        )}
        <Badge
          className={`absolute top-3 left-3 border text-xs font-semibold ${
            item.type === "Veg"
              ? "bg-green-50 text-green-700 border-green-300"
              : "bg-red-50 text-red-700 border-red-300"
          }`}
        >
          {item.type === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{item.description}</p>

        <div className="flex items-center gap-1 mt-2">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-semibold text-foreground">{item.rating}</span>
          <span className="text-xs text-muted-foreground">({item.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-primary text-lg">₹{item.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{item.mrp}</span>
          </div>

          {qty === 0 ? (
            <Button
              size="sm"
              className="gradient-orange text-primary-foreground border-0 shadow-orange font-semibold text-xs px-4"
              onClick={() => addItem(item)}
            >
              Add Item
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-primary/10 rounded-full px-1">
              <button
                className="h-7 w-7 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => updateQty(item.id, Math.max(0, qty - 1))}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="font-bold text-sm text-primary w-4 text-center">{qty}</span>
              <button
                className="h-7 w-7 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => addItem(item)}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
