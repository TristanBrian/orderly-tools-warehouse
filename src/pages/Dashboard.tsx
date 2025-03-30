import React from 'react';
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Check if Clerk is available
  const isClerkAvailable = typeof window !== 'undefined' && 
    window.Clerk !== undefined;
  
  // Get user if Clerk is available
  const { user } = isClerkAvailable ? useUser() : { user: { firstName: 'Dev User' } };

  const DashboardContent = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-hardware-blue text-white py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName || 'User'}!</h1>
            <p>Manage your account, orders, and preferences</p>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard 
              title="My Orders"
              description="View and track your orders"
              icon={Package}
              link="/orders"
            />
            <DashboardCard 
              title="Shopping Cart"
              description="Items ready for checkout"
              icon={ShoppingCart}
              link="/cart"
            />
            <DashboardCard 
              title="Account Settings"
              description="Update your profile details"
              icon={User}
              link="/account"
            />
            <DashboardCard 
              title="Recently Viewed"
              description="Products you've looked at"
              icon={Clock}
              link="/recently-viewed"
            />
          </div>
          
          {/* Recent Orders Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  You haven't placed any orders yet. Start shopping to see your order history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mt-4">
                  <Link to="/shop" className="bg-hardware-blue text-white py-2 px-4 rounded hover:bg-hardware-darkBlue transition-colors">
                    Browse Products
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  // If Clerk is available, use its auth components, otherwise just show the content
  return (
    <>
      {isClerkAvailable ? (
        <>
          <SignedIn>
            <DashboardContent />
          </SignedIn>
          <SignedOut>
            <DashboardContent />
          </SignedOut>
        </>
      ) : (
        <DashboardContent />
      )}
    </>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon: Icon, link }) => {
  return (
    <Link to={link}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="p-2 bg-hardware-lightBlue/10 rounded-full">
              <Icon className="h-5 w-5 text-hardware-blue" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Dashboard;
