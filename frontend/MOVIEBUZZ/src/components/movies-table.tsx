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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const movies = [
  { id: 1, title: "Cosmic Warriors", genre: "Action", rating: 8.5, year: 2024, status: "Published" },
  { id: 2, title: "Silent Echoes", genre: "Drama", rating: 9.1, year: 2024, status: "Published" },
  { id: 3, title: "Beyond the Stars", genre: "Sci-Fi", rating: 8.8, year: 2024, status: "Published" },
  { id: 4, title: "The Last Laugh", genre: "Comedy", rating: 7.9, year: 2024, status: "Draft" },
  { id: 5, title: "Dark Horizon", genre: "Thriller", rating: 8.3, year: 2024, status: "Published" },
  { id: 6, title: "Midnight Protocol", genre: "Thriller", rating: 8.7, year: 2024, status: "Published" },
  { id: 7, title: "Quantum Leap", genre: "Sci-Fi", rating: 8.9, year: 2024, status: "Draft" },
  { id: 8, title: "Summer Days", genre: "Comedy", rating: 7.6, year: 2024, status: "Published" },
];

interface MoviesTableProps {
  limit?: number;
}

export function MoviesTable({ limit }: MoviesTableProps) {
  const displayMovies = limit ? movies.slice(0, limit) : movies;

  return (
    <div className="bg-white rounded-lg border border-zinc-200">
      {!limit && (
        <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
          <div>
            <h3 className="text-sm text-zinc-500">Total Movies</h3>
            <p className="text-2xl mt-1">{movies.length}</p>
          </div>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Movie
          </Button>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayMovies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.genre}</TableCell>
              <TableCell>
                <span className="text-yellow-600">★ {movie.rating}</span>
              </TableCell>
              <TableCell>{movie.year}</TableCell>
              <TableCell>
                <Badge variant={movie.status === "Published" ? "default" : "secondary"}>
                  {movie.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Movie</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Movie</DropdownMenuItem>
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
