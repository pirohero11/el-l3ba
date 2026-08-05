"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Props for DatabaseFilterDropdown.
 * @param paramName - The search‑param key that will be written to the URL (e.g. "status").
 * @param options   - Array of string values that represent the available filter options.
 * @param defaultOption - Optional fallback when the URL does not contain the param.
 */
export interface DatabaseFilterDropdownProps {
  paramName: string;
  options: string[];
  defaultOption?: string;
}

/**
 * A reusable dropdown used to filter the database list.
 * It synchronises the selected value with the URL search parameters, so the page can be
 * server‑rendered based on the active filter.
 */
export function DatabaseFilterDropdown({
  paramName,
  options,
  defaultOption,
}: DatabaseFilterDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine the active filter from the URL or fall back to the first option / defaultOption.
  const urlValue = searchParams.get(paramName);
  const currentValue =
    urlValue ?? defaultOption ?? (options.length > 0 ? options[0] : "");

  // Update URL when a new filter is selected.
  const handleValueChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, newValue);
    // Preserve other existing params while navigating.
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          {paramName}: {currentValue}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{paramName.charAt(0).toUpperCase() + paramName.slice(1)} Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currentValue} onValueChange={handleValueChange}>
          {options.map((opt) => (
            <DropdownMenuRadioItem key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
