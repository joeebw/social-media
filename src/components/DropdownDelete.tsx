import { SlOptionsVertical } from "react-icons/sl";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  isLoading: boolean;
  onDelete: () => void;
};

const DropdownDelete = ({ isLoading, onDelete }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        <Button variant="ghost" size="icon" className="hover:bg-muted">
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="focus:text-destructive-foreground focus:bg-destructive"
          onClick={onDelete}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownDelete;
