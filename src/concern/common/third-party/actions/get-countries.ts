/*import { createRequest, performRequest } from "~/infrastructure/http";

import { Country } from "~/concern/entities";

import { baseUrl } from "../base-url";

export const getCountries = async (): Promise<Country[]> => {
  const countriesRetrieveRequest = createRequest<CountriesRetrieveResponseBody>(
    {
      method: "GET",
      url: new URL(`/api/countries`, baseUrl),
    },
  );

  const countriesRetrieveResponse = await performRequest(
    countriesRetrieveRequest,
  );

  return countriesRetrieveResponse.map(
    ({ code, id, name, phoneMask }) =>
      new Country({
        code,
        flag: "flag",
        id,
        name,
        phoneMask,
      }),
  );
};

type CountriesRetrieveResponseBody = Array<{
  code: number;
  id: number;
  isoCode: string;
  name: string;
  phoneMask: string;
}>;*/
