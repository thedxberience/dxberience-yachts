import { tryCatch } from "@/app/utils/helpers";
import { generateGroqQuery, sanityClient } from "../../sanity/sanity";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is undefined" }, { status: 400 });
    }

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
        return NextResponse.json({error: error.message}, {status: 500});
      }

      return NextResponse.json({result}, {status: 200});
}