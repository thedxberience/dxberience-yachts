import { tryCatch } from "@/app/utils/helpers";
import { generateGroqQuery, sanityClient } from "../sanity/sanity";

type SortOrder = "asc" | "desc";
type SortBy = "price" | "_updated";

export async function getBySlug(slug: string){
    const groqQuery = generateGroqQuery({
        document: 'yachts',
        filters: [`slug.current == "${slug}"`],
        projection: [
          'name',
          '"slug": slug.current',
          'mainDescription',
          'formDescription',
          'moreDetails',
          'moreDetailsTitle',
          'prices[]{price, type}',
          'cabins',
          'builder',
          'buildDate',
          'capacity',
          'length',
          'shortDescription',
          'thumbnail {"image": image.asset->url, "altText": image.alt}',
          'gallery[]->{"image": image.asset->url, "altText": image.alt}',
        ],
      });

      const { data: result, error } = await tryCatch(
        sanityClient.fetch(groqQuery)
      );

      if (error){
        return error;
      }

      // console.log("Yacht data from slug method:", result);
      

      return result[0];
}

export async function getAll(
  sortOrder: SortOrder = "desc",
  filter?: string[],
  sortBy: SortBy = "_updated"
){
    const sortField = sortBy === "price" ? "prices[0].price" : "_updatedAt";
    const sortCommand = [`order(${sortField} ${sortOrder})`];

    const groqQuery = generateGroqQuery({
        document: 'yachts',
        filters: filter ? filter : [],
        sort: sortCommand,
        projection: [
          'name',
          '"slug": slug.current',
          'prices[]{price, type}',
          'cabins',
          'capacity',
          'builder',
          'length',
          'thumbnail {"image": image.asset->url, "altText": image.alt}',
        ],
      });
      

        const { data: result, error } = await tryCatch(
            sanityClient.fetch(groqQuery)
        );

        if (error){
            return {data: null, error};
        }

        return {data: result, error: null};
}
