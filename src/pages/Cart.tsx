import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, totalMRP, totalPrice, discount, deliveryCharge, finalPrice } = useCart();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"cod" | "online">("cod");

  const handlePlaceOrder = () => {
    setOrdered(true);
    clearCart();
    setTimeout(() => navigate("/profile"), 3000);
  };

  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <CheckCircle className="h-20 w-20 text-success mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Order Placed! 🎉</h2>
          <p className="text-muted-foreground mb-2">Your food is being prepared</p>
          <p className="text-sm text-muted-foreground">Estimated delivery: 30-45 minutes</p>
          <p className="text-xs text-muted-foreground mt-4">Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-heading font-bold text-xl text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some delicious food to your cart</p>
        <Button
          className="gradient-orange text-primary-foreground border-0 shadow-orange"
          onClick={() => navigate("/restaurants")}
        >
          Browse Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <h1 className="font-heading font-bold text-2xl text-foreground mb-6">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-3">
            {items.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl p-4 shadow-card border border-border flex gap-4 animate-fade-in"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {restaurants.find((r) => r.id === item.restaurantId)?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{item.mrp}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-2 py-1">
                    <button
                      className="h-6 w-6 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => quantity > 1 ? updateQty(item.id, quantity - 1) : removeItem(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-bold text-sm text-primary w-4 text-center">{quantity}</span>
                    <button
                      className="h-6 w-6 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => updateQty(item.id, quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    ₹{item.price * quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border sticky top-20">
              <h2 className="font-heading font-bold text-lg text-foreground mb-5">Price Details</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total MRP</span>
                  <span className="font-medium">₹{totalMRP}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Discount on MRP</span>
                  <span className="font-medium">− ₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className="font-medium">+ ₹{deliveryCharge}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-heading font-bold text-base text-foreground">
                    <span>Final Price</span>
                    <span className="text-primary">₹{finalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Payment Mode */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Payment Mode</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["cod", "online"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setPaymentMode(mode)}
                      className={`p-2 rounded-lg text-sm font-semibold border transition-all ${
                        paymentMode === mode
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {mode === "cod" ? "💵 Cash on Delivery" : "💳 Online"}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full mt-5 gradient-orange text-primary-foreground border-0 shadow-orange font-bold"
                size="lg"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Need this for restaurant name lookup
import { restaurants } from "@/data/mockData";
