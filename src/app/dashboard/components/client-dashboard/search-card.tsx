"use client";

import React, { ChangeEvent, useRef } from "react";

import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useRouter } from "next/navigation";

const SearchCard = () => {
  const router = useRouter();

  const timeoutId = useRef<ReturnType<typeof setInterval>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId.current);
    console.log("e.target.value", e.target.value);
    const city = e.target.value;

    timeoutId.current = setTimeout(() => {
      city.length
        ? router.replace(`/dashboard?city=${city.toLowerCase()}`)
        : router.replace(`/dashboard`);
    }, 500);
  };

  return (
    <div className="h-auto">
      <Label className="text-gray-400" htmlFor="city">
        Discover Barber Shop near you
      </Label>
      <div className="flex pt-2 w-full max-w-sm items-center space-x-2">
        <Input
          onChange={handleChange}
          id="city"
          type="text"
          placeholder="New York"
        />
      </div>
    </div>
  );
};

export default SearchCard;
