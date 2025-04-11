import { tryCatch } from "@/app/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import { getBySlug } from "../service";


export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is undefined" }, { status: 400 });
    }
      const { data: result, error } = await tryCatch(
        getBySlug(slug)
      );
      
      if (error){
        return NextResponse.json({error: error.message}, {status: 500});
      }

      return NextResponse.json({data: result}, {status: 200});
}