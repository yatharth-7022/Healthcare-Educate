import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.username || "User"}!
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Username:</span>
                  <p className="text-gray-700">{user?.username}</p>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <p className="text-gray-700">{user?.email}</p>
                </div>
                <div>
                  <span className="font-medium">Role:</span>
                  <p className="text-gray-700">
                    {user?.isAdmin ? "Admin" : "User"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Your activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-700">More features coming soon!</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-700">No recent activity</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Explore the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Welcome to Healthcare Educate! This is your dashboard where you
              can access all platform features.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => setLocation("/")}>Go to Home</Button>
              <Button variant="outline">Browse Courses</Button>
              <Button variant="outline">View Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
