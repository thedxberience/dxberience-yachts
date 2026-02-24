import { NextRequest, NextResponse } from "next/server";
import { getAll } from "./service";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;

    // Validate sort parameters
    const validSortOptions = ['asc', 'desc'];
    const validSortByOptions = ['price', '_updated'];
    const sortOrderParam = searchParams.get('sortOrder') ?? searchParams.get('sort');
    const sortByParam = searchParams.get('sortBy');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const capacityMin = searchParams.get('capacityMin');
    const capacityMax = searchParams.get('capacityMax');
    const filters: string[] = [];
    if(min) {
        filters.push(`prices[0].price >= ${min}`);
    }
    if(max && max !== "0") {
        filters.push(`prices[0].price <= ${max}`);
    }
    if(capacityMin) {
        filters.push(`capacity >= ${capacityMin}`);
    }
    if(capacityMax && capacityMax !== "0") {
        filters.push(`capacity <= ${capacityMax}`);
    }
    if (sortOrderParam && !validSortOptions.includes(sortOrderParam)) {
        return NextResponse.json({ error: "Invalid sortOrder parameter" }, { status: 400 });
    }
    if (sortByParam && !validSortByOptions.includes(sortByParam)) {
        return NextResponse.json({ error: "Invalid sortBy parameter" }, { status: 400 });
    }

    const sortOrder = (sortOrderParam || 'desc') as "asc" | "desc";
    const sortBy = (sortByParam || '_updated') as "price" | "_updated";
    const { data: result, error } = await getAll(sortOrder, filters, sortBy);

    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({result}, {status: 200});
}
