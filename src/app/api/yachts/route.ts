import { NextRequest, NextResponse } from "next/server";
import { getAll } from "./service";

const parseNumberParam = (value: string | null): number | undefined => {
    if (value === null || value.trim() === "") {
        return undefined;
    }

    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) {
        return NaN;
    }

    return parsedValue;
};

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
    const parsedMin = parseNumberParam(min);
    const parsedMax = max === "0" ? undefined : parseNumberParam(max);
    const parsedCapacityMin = parseNumberParam(capacityMin);
    const parsedCapacityMax = capacityMax === "0" ? undefined : parseNumberParam(capacityMax);

    if (sortOrderParam && !validSortOptions.includes(sortOrderParam)) {
        return NextResponse.json({ error: "Invalid sortOrder parameter" }, { status: 400 });
    }
    if (sortByParam && !validSortByOptions.includes(sortByParam)) {
        return NextResponse.json({ error: "Invalid sortBy parameter" }, { status: 400 });
    }
    if (
        Number.isNaN(parsedMin) ||
        Number.isNaN(parsedMax) ||
        Number.isNaN(parsedCapacityMin) ||
        Number.isNaN(parsedCapacityMax)
    ) {
        return NextResponse.json(
            { error: "Invalid numeric filter parameter(s)." },
            { status: 400 }
        );
    }

    const sortOrder = (sortOrderParam || 'desc') as "asc" | "desc";
    const sortBy = (sortByParam || '_updated') as "price" | "_updated";
    const { data: result, error } = await getAll(
        sortOrder,
        {
            min: parsedMin,
            max: parsedMax,
            capacityMin: parsedCapacityMin,
            capacityMax: parsedCapacityMax,
        },
        sortBy
    );

    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({result}, {status: 200});
}
