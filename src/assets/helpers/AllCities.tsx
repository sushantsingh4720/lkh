import axios from "axios";

// Define the City interface for stronger typing.
export interface City {
  id: number;
  name: string;
}

// Asynchronous function that fetches cities based on country and state ISO codes.
export const AllCities = async (
  countryISO2: string,
  stateISO2: string
): Promise<City[]> => {
  try {
    // Making the HTTP GET request to fetch the cities in a clean and organized way.
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryISO2}/states/${stateISO2}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
        },
      }
    );
    // Extracting the precious array of cities from the response.
    const cities: City[] = response.data;
    // Returning this delightful array of city objects.
    return cities;
  } catch (error) {
    return []; // Return an empty array if there is any error.
  }
};
