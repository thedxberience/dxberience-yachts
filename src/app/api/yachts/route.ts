import { NextRequest, NextResponse } from "next/server";
import { getAll } from "./service";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;

    // Validate sort parameter
    const validSortOptions = ['asc', 'desc'];
    const sortParam = searchParams.get('sort');
    if (sortParam && !validSortOptions.includes(sortParam)) {
        return NextResponse.json({ error: "Invalid sort parameter" }, { status: 400 });
    }

    const sort = sortParam || 'asc';
    const { data: result, error } = await getAll(sort as "asc" | "desc");

    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({result}, {status: 200});
}