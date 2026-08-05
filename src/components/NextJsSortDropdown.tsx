"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NextJsSortDropdown() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // 1. Get the current active value from the URL, or fall back to a default value
    const currentSort = searchParams.get("sort") || "newest"

    // 2. Update the browser URL search params when a selection changes
    const handleValueChange = (newValue: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", newValue)

        // Pushes the new URL (e.g., /dashboard?sort=popular) to trigger a server re-render
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">
                    Sort: {currentSort}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Order By</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* 3. Bind the URL state directly to the shadcn dropdown group */}
                <DropdownMenuRadioGroup value={currentSort} onValueChange={handleValueChange}>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="trending">Trending</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
