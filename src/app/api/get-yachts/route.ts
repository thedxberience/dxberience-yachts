import { revalidateTag } from 'next/cache'
 
export async function GET() {
  // Invalidate the /yachts route in the cache
  revalidateTag('yachts')
}