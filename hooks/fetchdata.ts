/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchData = async (endpoint: string): Promise<any> => {
  try {
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  }
   catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};