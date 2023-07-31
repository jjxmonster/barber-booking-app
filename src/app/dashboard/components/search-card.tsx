import React, { FunctionComponent, Suspense, useState } from "react";

import BarberShopsList from "./barber-shops-list";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Skeleton } from "components/ui/skeleton";

interface SearchCardProps {}

const SearchCard: FunctionComponent<SearchCardProps> = () => {
  const [city, setCity] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  return (
    <div className="h-auto">
      <Label className="text-gray-400" htmlFor="city">
        Discover Barber Shop near you
      </Label>
      <div className="flex pt-2 w-full max-w-sm items-center space-x-2">
        <Input
          onChange={e => setCity(e.target.value)}
          value={city ?? ""}
          id="city"
          type="text"
          placeholder="New York"
        />
        <Button onClick={() => setShowResults(true)} type="submit">
          Search
        </Button>
      </div>

      {showResults && city && (
        <Suspense fallback={<div className="text-white">LOADING</div>}>
          <BarberShopsList city={city} />
        </Suspense>
      )}
    </div>
  );
};

export default SearchCard;
