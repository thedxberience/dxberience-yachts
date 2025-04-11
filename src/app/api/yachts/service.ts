import { tryCatch } from "@/app/utils/helpers";
import { generateGroqQuery, sanityClient } from "../sanity/sanity";

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

      return result[0].result;
}

export async function getAll(sort: "asc" | "desc" = "asc"){
    let sortCommand = ['order(prices[0].price asc)'];

    if (sort == "desc"){
      sortCommand = ['order(prices[0].price desc)']; 
    }

    const groqQuery = generateGroqQuery({
        document: 'yachts',
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