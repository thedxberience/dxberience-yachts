import { NextRequest, NextResponse } from "next/server";
import { getAllBySearchParams } from "./service";

const isValidNumericParam = (value: string | null): boolean => {
    if (value === null || value.trim() === "") {
        return true;
    }

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue);
};

export async function GET(request: NextRequest){
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);

    // Validate sort parameters
    const validSortOptions = ['asc', 'desc'];
    const validSortByOptions = ['price', '_updated', '_updatedAt'];
    const sortOrderParam = searchParams.get('sortOrder');
    const sortByParam = searchParams.get('sortBy');

    if (sortOrderParam && !validSortOptions.includes(sortOrderParam)) {
        return NextResponse.json({ error: "Invalid sortOrder parameter" }, { status: 400 });
    }
    if (sortByParam && !validSortByOptions.includes(sortByParam)) {
        return NextResponse.json({ error: "Invalid sortBy parameter" }, { status: 400 });
    }

    const numericParams = [
        searchParams.get("price__gte"),
        searchParams.get("price__lte"),
        searchParams.get("capacity__gte"),
        searchParams.get("capacity__lte"),
    ];

    if (numericParams.some((value) => !isValidNumericParam(value))) {
        return NextResponse.json(
            { error: "Invalid numeric filter parameter(s)." },
            { status: 400 }
        );
    }

    const { data: result, error } = await getAllBySearchParams(searchParams);

    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({result}, {status: 200});
}
