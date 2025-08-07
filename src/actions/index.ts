import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  searchInterventions: defineAction({
    input: z.object({
      query: z.string().optional(),
      hierarchy: z.string().optional(), // <-- nuevo parámetro
    }),
    handler: async ({ query, hierarchy }) => {
      const url = new URL(`${import.meta.env.BACKEND_URL}/interventions`);

      if (query) {
        url.searchParams.append("search", query);
      }

      if (hierarchy) {
        url.searchParams.append("hierarchy", hierarchy);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("No se pudo obtener las intervenciones");
      }

      const data = await response.json();
      return data;
    },
  }),
};
