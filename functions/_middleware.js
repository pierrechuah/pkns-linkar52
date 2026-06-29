export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'linkar52.pages.dev') {
    return Response.redirect('https://pknslinkar52.com.my' + url.pathname + url.search, 301);
  }
  return context.next();
}
