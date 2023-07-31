import React, { FunctionComponent, Suspense, useEffect, useState } from "react";

import BarberShopsList from "./barber-shops-list";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import LoadingIndicator from "../../../components/shared/loading-indicator";
import { useQueryClient } from "@tanstack/react-query";

interface SearchCardProps {}

const SearchCard: FunctionComponent<SearchCardProps> = () => {
  const [city, setCity] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setShowResults(false);
  }, [city]);

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
        <Button
          onClick={() => {
            queryClient.invalidateQueries(["barber_shops"]);
            setShowResults(true);
          }}
          type="submit"
        >
          Search
        </Button>
      </div>

      {showResults && city && (
        <Suspense fallback={<LoadingIndicator />}>
          <BarberShopsList city={city} />
        </Suspense>
      )}
    </div>
  );
};

export default SearchCard;
