
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Edit, 
  MoreHorizontal, 
  PackageX, 
  Search, 
  ArrowUpDown, 
  AlertTriangle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockInventoryData } from "@/data/mockInventory";

interface InventoryTableProps {
  lowStockOnly?: boolean;
  isAdmin?: boolean;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ lowStockOnly = false, isAdmin = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Filter data based on search query and lowStockOnly flag
  const filteredData = mockInventoryData
    .filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (lowStockOnly) {
        return matchesSearch && item.quantity < 10;
      }
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      // For numerical values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full md:w-80"
          />
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>
                <button 
                  onClick={() => handleSort("name")}
                  className="flex items-center"
                >
                  Product
                  <ArrowUpDown size={16} className="ml-2" />
                </button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <button 
                  onClick={() => handleSort("quantity")}
                  className="flex items-center"
                >
                  Quantity
                  <ArrowUpDown size={16} className="ml-2" />
                </button>
              </TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <PackageX size={36} className="text-gray-400 mb-2" />
                    <p className="text-gray-500 font-medium">No inventory items found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {item.quantity < 10 && (
                        <AlertTriangle size={16} className="text-amber-500 mr-2" />
                      )}
                      {item.quantity}
                    </div>
                  </TableCell>
                  <TableCell>KSh {item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <StockStatusBadge quantity={item.quantity} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isAdmin ? (
                          <>
                            <DropdownMenuItem>
                              <Edit size={14} className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Stock</DropdownMenuItem>
                          </>
                        ) : null}
                        <DropdownMenuItem>History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const StockStatusBadge = ({ quantity }: { quantity: number }) => {
  if (quantity === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  } else if (quantity < 10) {
    return <Badge variant="outline" className="border-amber-500 text-amber-500">Low Stock</Badge>;
  } else {
    return <Badge variant="outline" className="border-green-500 text-green-500">In Stock</Badge>;
  }
};

export default InventoryTable;
