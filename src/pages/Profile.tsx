import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { orders, menuItems } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Mail, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [cancelledOrders, setCancelledOrders] = useState<string[]>([]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <User className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-heading font-bold text-xl text-foreground">Please login to view profile</h2>
        <Button className="gradient-orange text-primary-foreground border-0" onClick={() => navigate("/auth")}>
          Login
        </Button>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === "user1");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-success/10 text-success border-success/30";
      case "order placed": return "bg-primary/10 text-primary border-primary/30";
      case "cancelled": return "bg-destructive/10 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-bold text-2xl text-foreground mb-8">My Profile</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* User Card */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="flex flex-col items-center text-center mb-5">
                <div className="h-16 w-16 rounded-full gradient-orange flex items-center justify-center shadow-orange mb-3">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {user?.username[0].toUpperCase()}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-foreground">{user?.username}</h2>
                <Badge variant="outline" className="mt-1 text-xs capitalize border-primary/30 text-primary">
                  {user?.role}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user?.username}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{userOrders.length} Orders</span>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full mt-5"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </aside>

          {/* Orders */}
          <div className="flex-1">
            <h2 className="font-heading font-bold text-xl text-foreground mb-4">Orders</h2>
            {userOrders.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No orders yet</p>
                <Button className="mt-4 gradient-orange text-primary-foreground border-0" onClick={() => navigate("/restaurants")}>
                  Start Ordering
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => {
                  const isCancelled = cancelledOrders.includes(order.id);
                  const status = isCancelled ? "cancelled" : order.status;
                  return (
                    <div key={order.id} className="bg-card rounded-2xl p-5 shadow-card border border-border flex gap-4 animate-fade-in">
                      <img
                        src={order.item.image}
                        alt={order.item.name}
                        className="h-20 w-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-foreground">{order.item.name}</h3>
                        <p className="text-sm text-primary font-semibold">{order.restaurantName}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                          <span>Qty: {order.quantity}</span>
                          <span>
                            Price: <span className="font-semibold text-foreground">₹{order.totalPrice}</span>{" "}
                            <span className="line-through">₹{order.mrp}</span>
                          </span>
                          <span>Payment: {order.paymentMode.toUpperCase()}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                          <span>Ordered: {order.orderedOn}</span>
                          <span>Time: {order.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge className={`text-xs border ${getStatusColor(status)} capitalize`}>
                          {status}
                        </Badge>
                        {status === "order placed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs"
                            onClick={() => setCancelledOrders([...cancelledOrders, order.id])}
                          >
                            <X className="mr-1 h-3 w-3" /> Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
