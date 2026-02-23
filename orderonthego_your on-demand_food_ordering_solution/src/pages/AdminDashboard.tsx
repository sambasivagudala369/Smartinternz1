import { restaurants, menuItems, orders } from "@/data/mockData";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Users,
  UtensilsCrossed,
  ShoppingBag,
  LayoutDashboard,
  LogOut,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";

type AdminView = "home" | "users" | "orders" | "restaurants";

const MOCK_USERS = [
  { id: "1", username: "admin", email: "admin@sbfoods.com", role: "admin" },
  { id: "2", username: "hola", email: "hola@gmail.com", role: "customer" },
  { id: "3", username: "spice_owner", email: "owner@andhaspice.com", role: "restaurant" },
  { id: "4", username: "rahul", email: "rahul@gmail.com", role: "customer" },
  { id: "5", username: "priya", email: "priya@gmail.com", role: "customer" },
];

export default function AdminDashboard() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>("home");
  const [popular, setPopular] = useState<string[]>(
    restaurants.filter((r) => r.popular).map((r) => r.id)
  );
  const [approvals, setApprovals] = useState<string[]>(
    restaurants.filter((r) => !r.approved).map((r) => r.id)
  );

  if (!isLoggedIn || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{backgroundColor: 'hsl(220, 30%, 10%)'}}>
        <XCircle className="h-16 w-16 text-destructive" />
        <p className="font-heading font-bold text-xl" style={{color: 'hsl(36, 20%, 95%)'}}>Admin access required</p>
        <Button onClick={() => navigate("/auth")}>Login as Admin</Button>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate("/"); };
  const togglePopular = (id: string) =>
    setPopular((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const approve = (id: string) => setApprovals((prev) => prev.filter((x) => x !== id));

  const navItems = [
    { key: "home" as AdminView, label: "Home", icon: LayoutDashboard },
    { key: "users" as AdminView, label: "Users", icon: Users },
    { key: "orders" as AdminView, label: "Orders", icon: ShoppingBag },
    { key: "restaurants" as AdminView, label: "Restaurants", icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: 'hsl(220, 30%, 10%)', color: 'hsl(36, 20%, 95%)'}}>
      {/* Admin Navbar */}
      <nav style={{backgroundColor: 'hsl(220, 28%, 15%)', borderBottom: '1px solid hsl(220, 25%, 22%)'}} className="px-6 h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <span className="font-heading font-bold text-lg" style={{color: 'hsl(36, 20%, 95%)'}}>
            🍽️ <span className="text-gradient-orange">SB Foods</span>{" "}
            <span className="font-normal text-sm" style={{color: 'hsl(36, 20%, 60%)'}}>(admin)</span>
          </span>
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  view === key
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-white/10"
                }`}
                style={view !== key ? {color: 'hsl(36, 20%, 75%)'} : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-white/10"
          style={{color: 'hsl(36, 20%, 75%)'}}
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </nav>

      <div className="flex-1 p-6 container mx-auto max-w-6xl">
        {/* Home View */}
        {view === "home" && (
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-2xl mb-6" style={{color: 'hsl(36, 20%, 95%)'}}>Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Users", value: MOCK_USERS.length, icon: Users, key: "users" as AdminView },
                { label: "All Restaurants", value: restaurants.length, icon: UtensilsCrossed, key: "restaurants" as AdminView },
                { label: "All Orders", value: orders.length, icon: ShoppingBag, key: "orders" as AdminView },
              ].map(({ label, value, icon: Icon, key }) => (
                <div key={label} className="rounded-2xl p-5" style={{backgroundColor: 'hsl(220, 28%, 15%)', border: '1px solid hsl(220, 25%, 22%)'}}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm mb-1" style={{color: 'hsl(36, 20%, 65%)'}}>{label}</p>
                      <p className="font-heading font-bold text-3xl" style={{color: 'hsl(36, 20%, 95%)'}}>{value}</p>
                    </div>
                    <Icon className="h-8 w-8 text-primary/70" />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-4 text-xs text-primary hover:bg-primary hover:text-primary-foreground"
                    style={{borderColor: 'hsl(24, 95%, 53%, 0.4)'}}
                    onClick={() => setView(key)}
                  >
                    View all <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Bottom panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Popular (Promotions) */}
              <div className="rounded-2xl p-5" style={{backgroundColor: 'hsl(220, 28%, 15%)', border: '1px solid hsl(220, 25%, 22%)'}}>
                <h2 className="font-heading font-semibold mb-4" style={{color: 'hsl(36, 20%, 95%)'}}>
                  Popular Restaurants (promotions)
                </h2>
                <div className="space-y-2 mb-4">
                  {restaurants.map((r) => (
                    <div key={r.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`pop-${r.id}`}
                        checked={popular.includes(r.id)}
                        onCheckedChange={() => togglePopular(r.id)}
                        className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor={`pop-${r.id}`} className="text-sm cursor-pointer" style={{color: 'hsl(36, 20%, 80%)'}}>
                        {r.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="gradient-orange text-primary-foreground border-0 shadow-orange font-semibold"
                >
                  Update
                </Button>
              </div>

              {/* Approvals */}
              <div className="rounded-2xl p-5" style={{backgroundColor: 'hsl(220, 28%, 15%)', border: '1px solid hsl(220, 25%, 22%)'}}>
                <h2 className="font-heading font-semibold mb-4" style={{color: 'hsl(36, 20%, 95%)'}}>Approvals</h2>
                {approvals.length === 0 ? (
                  <p className="text-sm" style={{color: 'hsl(36, 20%, 50%)'}}>No new requests...</p>
                ) : (
                  <div className="space-y-3">
                    {approvals.map((id) => {
                      const r = restaurants.find((x) => x.id === id);
                      if (!r) return null;
                      return (
                        <div key={id} className="flex items-center justify-between rounded-xl p-3" style={{backgroundColor: 'hsl(220, 30%, 10%)'}}>
                          <div>
                            <p className="text-sm font-semibold" style={{color: 'hsl(36, 20%, 95%)'}}>{r.name}</p>
                            <p className="text-xs" style={{color: 'hsl(36, 20%, 55%)'}}>{r.location}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="gradient-orange text-primary-foreground border-0 h-7 px-3 text-xs"
                              onClick={() => approve(id)}
                            >
                              <CheckCircle className="mr-1 h-3 w-3" /> Approve
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users View */}
        {view === "users" && (
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-2xl mb-6" style={{color: 'hsl(36, 20%, 95%)'}}>All Users</h1>
            <div className="rounded-2xl overflow-hidden" style={{backgroundColor: 'hsl(220, 28%, 15%)', border: '1px solid hsl(220, 25%, 22%)'}}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{borderBottom: '1px solid hsl(220, 25%, 22%)'}}>
                    <th className="text-left px-5 py-3 font-medium" style={{color: 'hsl(36, 20%, 60%)'}}>Username</th>
                    <th className="text-left px-5 py-3 font-medium" style={{color: 'hsl(36, 20%, 60%)'}}>Email</th>
                    <th className="text-left px-5 py-3 font-medium" style={{color: 'hsl(36, 20%, 60%)'}}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((u, i) => (
                    <tr key={u.id} style={{borderBottom: '1px solid hsl(220, 25%, 19%)', backgroundColor: i % 2 === 0 ? 'hsl(220, 30%, 12%)' : 'transparent'}}>
                      <td className="px-5 py-3 font-medium" style={{color: 'hsl(36, 20%, 95%)'}}>{u.username}</td>
                      <td className="px-5 py-3" style={{color: 'hsl(36, 20%, 72%)'}}>{u.email}</td>
                      <td className="px-5 py-3">
                        <Badge className={`text-xs capitalize border ${
                          u.role === "admin" ? "bg-primary/20 text-primary border-primary/30" :
                          u.role === "restaurant" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                          "bg-white/10 border-white/20"
                        }`} style={u.role === "customer" ? {color: 'hsl(36, 20%, 72%)'} : {}}>
                          {u.role}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders View */}
        {view === "orders" && (
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-2xl mb-6" style={{color: 'hsl(36, 20%, 95%)'}}>All Orders</h1>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="rounded-2xl p-4 flex gap-4 items-center" style={{backgroundColor: 'hsl(220, 28%, 15%)', border: '1px solid hsl(220, 25%, 22%)'}}>
                  <img src={o.item.image} alt={o.item.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold" style={{color: 'hsl(36, 20%, 95%)'}}>{o.item.name}</p>
                    <p className="text-xs mt-0.5" style={{color: 'hsl(36, 20%, 62%)'}}>{o.restaurantName} · {o.orderedOn}</p>
                    <p className="text-xs mt-0.5" style={{color: 'hsl(36, 20%, 52%)'}}>₹{o.totalPrice} · {o.paymentMode.toUpperCase()}</p>
                  </div>
                  <Badge className={`text-xs border capitalize ${
                    o.status === "delivered" ? "bg-success/20 text-success border-success/40" :
                    "bg-primary/20 text-primary border-primary/40"
                  }`}>
                    {o.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurants View */}
        {view === "restaurants" && (
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-2xl mb-6" style={{color: 'hsl(36, 20%, 95%)'}}>All Restaurants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((r) => (
                <div key={r.id} className="rounded-2xl p-4" style={{backgroundColor: 'hsl(220, 28%, 15%)', border: '1px solid hsl(220, 25%, 22%)'}}>
                  <img src={r.image} alt={r.name} className="h-32 w-full object-cover rounded-xl mb-3" />
                  <h3 className="font-heading font-bold" style={{color: 'hsl(36, 20%, 95%)'}}>{r.name}</h3>
                  <p className="text-xs mt-0.5" style={{color: 'hsl(36, 20%, 60%)'}}>{r.location}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge className={`text-xs border ${r.approved ? "bg-success/20 text-success border-success/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}>
                      {r.approved ? "Approved" : "Pending"}
                    </Badge>
                    {r.popular && (
                      <Badge className="text-xs border bg-primary/20 text-primary border-primary/30">Popular</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
