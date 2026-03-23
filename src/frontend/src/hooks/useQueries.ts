import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContactForm() {
  const { actor } = useActor();

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
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, email, phone, companyName, message);
    },
  });
}
