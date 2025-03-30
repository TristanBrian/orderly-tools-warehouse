
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockInventoryData } from '@/data/mockInventory';
import { ArrowDown, ArrowUp, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const InventoryDashboard = () => {
  // Summarize data for the dashboard
  const totalItems = mockInventoryData.length;
  const totalStock = mockInventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = mockInventoryData.filter(item => item.quantity < 10).length;
  const outOfStockItems = mockInventoryData.filter(item => item.quantity === 0).length;
  
  // Data for category distribution chart
  const categoryData = mockInventoryData.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += item.quantity;
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Monthly inventory trends (mocked data)
  const trendData = [
    { name: 'Jan', in: 145, out: 123 },
    { name: 'Feb', in: 132, out: 110 },
    { name: 'Mar', in: 187, out: 156 },
    { name: 'Apr', in: 160, out: 122 },
    { name: 'May', in: 212, out: 190 },
    { name: 'Jun', in: 201, out: 160 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={totalItems} 
          icon={<Package className="h-6 w-6" />}
          description="Unique products in inventory" 
        />
        <StatCard 
          title="Total Stock" 
          value={totalStock} 
          icon={<TrendingUp className="h-6 w-6" />}
          description="Total units available" 
          trend={{ value: 12, up: true }}
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStockItems} 
          icon={<AlertTriangle className="h-6 w-6" />}
          description="Items that need reordering" 
          trend={{ value: 3, up: true }}
          trendIsGood={false}
        />
        <StatCard 
          title="Out of Stock" 
          value={outOfStockItems} 
          icon={<AlertTriangle className="h-6 w-6" />}
          description="Items currently unavailable" 
          trend={{ value: 2, up: false }}
          trendIsGood={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="in" name="Incoming" fill="#4f46e5" />
                  <Bar dataKey="out" name="Outgoing" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} units`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
  trend?: {
    value: number;
    up: boolean;
  };
  trendIsGood?: boolean;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  trendIsGood = true 
}: StatCardProps) => {
  // Determine if the trend direction is good or bad
  const isTrendPositive = trendIsGood ? trend?.up : !trend?.up;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          {trend && (
            <div className={`flex items-center ${isTrendPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.up ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryDashboard;
