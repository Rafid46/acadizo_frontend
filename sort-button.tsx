import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shrink-0">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]" align="end">
        <DropdownMenuRadioGroup value="a-z">
          <DropdownMenuRadioItem value="a-z">
            <ArrowUp className="w-4 h-4 mr-2" />
            Name A-Z
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="z-a">
            <ArrowDown className="w-4 h-4 mr-2" />
            Name Z-A
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
