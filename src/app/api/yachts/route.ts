import { NextResponse } from "next/server";
import { getAll } from "./service";

export async function GET(){
    const { data: result, error } = await getAll();

    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({result}, {status: 200});
}