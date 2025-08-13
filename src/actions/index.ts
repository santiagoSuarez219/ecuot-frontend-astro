import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  searchInterventions: defineAction({
    input: z.object({
      query: z.string().optional(),
      hierarchy: z.string().optional(),
      system: z.string().optional(),
    }),
    handler: async ({ query, hierarchy, system }) => {
      const url = new URL(`${import.meta.env.BACKEND_URL}/interventions`);
    
      if (query) {
        url.searchParams.append("search", query);
      }

      if (hierarchy) {
        url.searchParams.append("hierarchy", hierarchy);
      }

      if (system) {
        url.searchParams.append("internalSystem", system);
      }
      console.log(url.toString())
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("No se pudo obtener las intervenciones");
      }

      const data = await response.json();
      return data;
    },
  }),
  searchNews: defineAction({
    input: z.object({
      query: z.string().optional(),
      intervention: z.string().optional(),
    }),
    handler: async ({ query, intervention }) => {
      const url = new URL(`${import.meta.env.BACKEND_URL}/news`);

      if (query) {
        url.searchParams.append("search", query);
      }

      if (intervention) {
        url.searchParams.append("intervention", intervention);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("No se pudo obtener las noticias");
      }

      const data = await response.json();
      return data;
    },
  }),
};
