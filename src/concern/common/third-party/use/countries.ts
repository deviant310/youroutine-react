/*import { useMemo } from "react";

import { useQueryAction } from "~/infrastructure/http";

import { CountryAttributes } from "~/concern/entities";

import { getCountries } from "../actions";

export const useCountries = (filters: Partial<CountryAttributes>) => {
  const {
    data: countries,
    isLoading: loadingCountries,
    error: countriesError,
  } = useQueryAction(getCountries, []);

  const countriesFiltered = useMemo(() => {
    const { name: nameInFilters } = filters;

    if (typeof nameInFilters === "undefined") return;

    return countries?.filter(({ name }) =>
      name.toLowerCase().includes(nameInFilters.toLowerCase()),
    );
  }, [countries, filters]);

  return { countries: countriesFiltered, countriesError, loadingCountries };
};*/
