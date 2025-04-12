import { createClient } from "@sanity/client";

type GroqQuery = {
    document: string;
    filters?: string[];
    projection?: string[];
    sort?: string[];
  };


export const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2025-02-06', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  })

export function  generateGroqQuery(groqQuery: GroqQuery) {
    const { document, filters, projection, sort } = groqQuery;

    const baseQuery = (filters: string | null, sort: string | null) =>
      `*[_type=="${document}" && !(_id in path("drafts.**"))${
        filters ? `&& ${filters}` : ''
      }]${
        sort ? ` | ${sort}` : ''
      }`;

    const computedFilters = filters ? filters.join(' && ') : null;

    // Add sorting to the filters
    const computedSort = sort ? sort.join(' ') : null;

    const computedProjection = projection ? projection.join(', ') : null;

    return `${baseQuery(computedFilters, computedSort)}${
      computedProjection ? '{' + computedProjection + '}' : ''
    }`;
  }