import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MoreHorizontal, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", joinDate: "2024-01-20" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Inactive", joinDate: "2024-02-01" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "Active", joinDate: "2024-02-10" },
  { id: 5, name: "Tom Brown", email: "tom@example.com", status: "Active", joinDate: "2024-02-15" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", status: "Active", joinDate: "2024-03-01" },
  { id: 7, name: "Chris Wilson", email: "chris@example.com", status: "Inactive", joinDate: "2024-03-05" },
  { id: 8, name: "Lisa Anderson", email: "lisa@example.com", status: "Active", joinDate: "2024-03-10" },
];

interface UsersTableProps {
  limit?: number;
}

export function UsersTable({ limit }: UsersTableProps) {
  const displayUsers = limit ? users.slice(0, limit) : users;

  return (
    <div className="bg-white rounded-lg border border-zinc-200">
      {!limit && (
        <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
          <div>
            <h3 className="text-sm text-zinc-500">Total Users</h3>
            <p className="text-2xl mt-1">{users.length}</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
