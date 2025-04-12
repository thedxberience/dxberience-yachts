import { tryCatch } from "@/app/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import { getBySlug } from "../service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { data, error: slugFetchError } = await tryCatch(params);

    if (slugFetchError || !data) {
      return NextResponse.json({ data: [],  error: "Failed to fetch slug" }, { status: 500 });
    }

    const { slug } = data;

    if (!slug) {
      return NextResponse.json({ data: [], error: "Slug is undefined" }, { status: 400 });
    }
      const { data: result, error } = await tryCatch(
        getBySlug(slug)
      );
      
      if (error){
        return NextResponse.json({error: error.message}, {status: 500});
      }

      console.log("Yacht data from slug method:", result);
      

      return NextResponse.json({data: result}, {status: 200});
}