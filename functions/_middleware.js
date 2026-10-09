const CANONICAL_HOST = 'pknslinkar52.com.my';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname;

  // www and legacy/default pages.dev aliases -> canonical domain (301)
  if (
    host === 'www.' + CANONICAL_HOST ||
    host === 'linkar52.pages.dev' ||
    host === 'pkns-linkar52.pages.dev'
  ) {
    return Response.redirect('https://' + CANONICAL_HOST + url.pathname + url.search, 301);
  }

  // Legacy WordPress URLs (old pages, posts, categories...) -> home page.
  // Pages serves index.html (200) for unknown paths, so a 404 check never fires;
  // instead allow only the real routes. Files (anything with an extension),
  // /assets and /wp-* are left alone.
  const path = url.pathname;
  const REAL_ROUTES = ['/', '/en', '/en/', '/index', '/index-en'];
  if (
    context.request.method === 'GET' &&
    !REAL_ROUTES.includes(path) &&
    !path.startsWith('/assets/') &&
    !path.startsWith('/wp-') &&
    !path.startsWith('/_') &&
    !/\.[a-z0-9]{2,5}$/i.test(path)
  ) {
    const isEn = path.startsWith('/en/');
    return Response.redirect('https://' + CANONICAL_HOST + (isEn ? '/en/' : '/'), 301);
  }

  const response = await context.next();

  // Preview deployments (hash.linkar52.pages.dev etc.) must never be indexed
  if (host.endsWith('.pages.dev')) {
    const res = new Response(response.body, response);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  return response;
}
