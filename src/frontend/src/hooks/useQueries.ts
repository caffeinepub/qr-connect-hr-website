import { useMutation } from "@tanstack/react-query";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxMIYLYWa6pwRvyvBCVP9EO2wmVdlkKOQgIINbmM2LlrF7M3ioNewhF9wgeHulZnHGIaw/exec";

export function useSubmitContactForm() {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      companyName,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      companyName: string;
      message: string;
    }) => {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("email", email);
      params.append("phone", phone);
      params.append("company", companyName);
      params.append("message", message);

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
        method: "GET",
        mode: "no-cors",
      });
    },
  });
}
