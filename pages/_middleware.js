import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  if (url.pathname == '/browse') {
    url.pathname = '/browse/a'
  }
  else if (url.pathname == '/top') {
      url.pathname = '/top/200'
  }
  return NextResponse.rewrite(url)
}