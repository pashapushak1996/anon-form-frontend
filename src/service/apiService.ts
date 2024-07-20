import { API_URL } from "../constants/api";
import { SubmitData } from "../types";

export const apiService = {
  sendMessage: async (data: SubmitData) => {
    const rawResponse = await fetch(`${API_URL}/create-poll`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const rawData = await rawResponse.json();

    return { success: rawResponse.status === 200, message: rawData.message };
  },
};
