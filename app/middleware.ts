import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getUserSession } from '@/lib/Appwrite/api'
 
export const config = {
  matcher: ['/'],
}
 
export function middleware(request: NextRequest) {

    return NextResponse.next()
}