import axios from "axios";

const getCity = async () => {
  try {
    const response = await axios.get(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=2"
    );
    const records = response.data.result.records;
    return records.map((record) => record["שם_ישוב"]); // Return an array of city names
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities");
  }
};

export default getCity;