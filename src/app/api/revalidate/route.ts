
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    try {
        const path = request.nextUrl.searchParams.get("path");

        if (path){
           revalidatePath(path);
           return NextResponse.json({
            revalidated: true,
            path: path,
            now: new Date().toISOString()
           })
        }
        return NextResponse.json({
            revalidated: false,
            message: "Path query parameter is required"
        }, { status: 400 })
    } catch (error) {
        if (error instanceof Error){
            return NextResponse.json({
                revalidated: false,
                message: `Internal Server Error: ${error.message}`
            }, { status: 500 })
        } 
        return NextResponse.json({
            revalidated: false,
            message: `Internal Server Error: ${error}`
        }, { status: 500 })
    }
}