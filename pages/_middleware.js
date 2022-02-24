import { NextResponse } from 'next/server'

export function middleware(request) {
  let url = request.nextUrl.clone()
  let pathname = decodeURI(url.pathname.toLowerCase()).replaceAll(" ","-")

  console.log(pathname)

  if (url.pathname == '/browse' || url.pathname == '/browse/a') {
    url.pathname = '/browse/a/page/1'
  }
  else if (url.pathname == '/top') {
      url.pathname = '/top/200'
  }
  
  if (pathname != url.pathname)
  {
    url.pathname = pathname
    return NextResponse.redirect(url)
  }

  return NextResponse.rewrite(url)
  
 
}