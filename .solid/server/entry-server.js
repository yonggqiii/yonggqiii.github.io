import { isServer, delegateEvents, createComponent as createComponent$1, ssrElement, mergeProps as mergeProps$1, renderToStringAsync, spread, escape, ssr, ssrHydrationKey, useAssets, ssrAttribute, HydrationScript, NoHydration } from 'solid-js/web';
import { createSignal, onCleanup, getOwner, runWithOwner, createMemo, createContext, useContext, createRenderEffect, untrack, createComponent, on, startTransition, resetErrorBoundaries, children, createRoot, Show, mergeProps, splitProps, sharedConfig, createUniqueId, ErrorBoundary as ErrorBoundary$1, createEffect, Suspense } from 'solid-js';

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init, env = {}, locals = {}) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toUpperCase());
  if (!handler) {
    throw new Error(`No handler found for ${request.method} ${request.url}`);
  }
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    clientAddress: "127.0.0.1",
    env,
    locals,
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
function redirect(url, init = 302) {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  if (url === "") {
    url = "/";
  }
  let headers = new Headers(responseInit.headers);
  headers.set(LocationHeader, url);
  const response = new Response(null, {
    ...responseInit,
    headers
  });
  return response;
}
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

const api = [
  {
    GET: "skip",
    path: "/*404"
  },
  {
    GET: "skip",
    path: "/fun"
  },
  {
    GET: "skip",
    path: "/"
  },
  {
    GET: "skip",
    path: "/research"
  },
  {
    GET: "skip",
    path: "/teaching"
  },
  {
    GET: "skip",
    path: "/cv/"
  }
];
function expandOptionals$1(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals$1(suffix).reduce(
    (results, expansion) => [...results, ...prefixes.map((p) => p + expansion)],
    []
  );
}
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      score -= 1;
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.flatMap((route) => {
  const paths = expandOptionals$1(route.path);
  return paths.map((path) => ({ ...route, path }));
}).map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toUpperCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};

function bindEvent(target, type, handler) {
    target.addEventListener(type, handler);
    return () => target.removeEventListener(type, handler);
}
function intercept([value, setValue], get, set) {
    return [get ? () => get(value()) : value, set ? (v) => setValue(set(v)) : setValue];
}
function querySelector(selector) {
    // Guard against selector being an invalid CSS selector
    try {
        return document.querySelector(selector);
    }
    catch (e) {
        return null;
    }
}
function scrollToHash(hash, fallbackTop) {
    const el = querySelector(`#${hash}`);
    if (el) {
        el.scrollIntoView();
    }
    else if (fallbackTop) {
        window.scrollTo(0, 0);
    }
}
function createIntegration(get, set, init, utils) {
    let ignore = false;
    const wrap = (value) => (typeof value === "string" ? { value } : value);
    const signal = intercept(createSignal(wrap(get()), { equals: (a, b) => a.value === b.value }), undefined, next => {
        !ignore && set(next);
        return next;
    });
    init &&
        onCleanup(init((value = get()) => {
            ignore = true;
            signal[1](wrap(value));
            ignore = false;
        }));
    return {
        signal,
        utils
    };
}
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}
function pathIntegration() {
    return createIntegration(() => ({
        value: window.location.pathname + window.location.search + window.location.hash,
        state: history.state
    }), ({ value, replace, scroll, state }) => {
        if (replace) {
            window.history.replaceState(state, "", value);
        }
        else {
            window.history.pushState(state, "", value);
        }
        scrollToHash(window.location.hash.slice(1), scroll);
    }, notify => bindEvent(window, "popstate", () => notify()), {
        go: delta => window.history.go(delta)
    });
}

function createBeforeLeave() {
    let listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    let ignore = false;
    function confirm(to, options) {
        if (ignore)
            return !(ignore = false);
        const e = {
            to,
            options,
            defaultPrevented: false,
            preventDefault: () => (e.defaultPrevented = true)
        };
        for (const l of listeners)
            l.listener({
                ...e,
                from: l.location,
                retry: (force) => {
                    force && (ignore = true);
                    l.navigate(to, options);
                }
            });
        return !e.defaultPrevented;
    }
    return {
        subscribe,
        confirm
    };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|(\/)\/+$/g;
function normalizePath(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "$1");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalizePath(base);
    const fromPath = from && normalizePath(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function createMatcher(path, partial, matchFilters) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        const matchFilter = (s) => matchFilters === undefined ? undefined : matchFilters[s];
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            const dynamic = segment[0] === ":";
            const key = dynamic ? segment.slice(1) : segment;
            if (dynamic && matchSegment(locSegment, matchFilter(key))) {
                match.params[key] = locSegment;
            }
            else if (dynamic || !matchSegment(locSegment, segment)) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
            if (matchSegment(remainder, matchFilter(splat))) {
                match.params[splat] = remainder;
            }
            else {
                return null;
            }
        }
        return match;
    };
}
function matchSegment(input, filter) {
    const isEqual = (s) => s.localeCompare(input, undefined, { sensitivity: "base" }) === 0;
    if (filter === undefined) {
        return true;
    }
    else if (typeof filter === "string") {
        return isEqual(filter);
    }
    else if (typeof filter === "function") {
        return filter(input);
    }
    else if (Array.isArray(filter)) {
        return filter.some(isEqual);
    }
    else if (filter instanceof RegExp) {
        return filter.test(input);
    }
    return false;
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
    const route = useRoute();
    return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
    const router = useRouter();
    return createMemo(() => {
        const to_ = to();
        return to_ !== undefined ? router.renderPath(to_) : to_;
    });
};
const useLocation = () => useRouter().location;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin, {
        equals: (a, b) => a.href === b.href
    });
    const pathname = createMemo(() => url().pathname);
    const search = createMemo(() => url().search, true);
    const hash = createMemo(() => url().hash);
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const beforeLeave = utils.beforeLeave || createBeforeLeave();
    const basePath = resolvePath("", base);
    const output = isServer && out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, setIsRouting] = createSignal(false);
    const start = async (callback) => {
        setIsRouting(true);
        try {
            await startTransition(callback);
        }
        finally {
            setIsRouting(false);
        }
    };
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    beforeLeave.confirm(to, options) && utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                if (isServer) {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
                else if (beforeLeave.confirm(resolvedTo, options)) {
                    const len = referrers.push({ value: current, replace, scroll, state: state() });
                    start(() => {
                        setReference(resolvedTo);
                        setState(nextState);
                        resetErrorBoundaries();
                    }).then(() => {
                        if (referrers.length === len) {
                            navigateEnd({
                                value: resolvedTo,
                                state: nextState
                            });
                        }
                    });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    function navigateEnd(next) {
        const first = referrers[0];
        if (first) {
            if (next.value !== first.value || next.state !== first.state) {
                setSource({
                    ...next,
                    replace: first.replace,
                    scroll: first.scroll
                });
            }
            referrers.length = 0;
        }
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    if (!isServer) {
        function handleAnchorClick(evt) {
            if (evt.defaultPrevented ||
                evt.button !== 0 ||
                evt.metaKey ||
                evt.altKey ||
                evt.ctrlKey ||
                evt.shiftKey)
                return;
            const a = evt
                .composedPath()
                .find(el => el instanceof Node && el.nodeName.toUpperCase() === "A");
            if (!a || !a.hasAttribute("link"))
                return;
            const href = a.href;
            if (a.target || (!href && !a.hasAttribute("state")))
                return;
            const rel = (a.getAttribute("rel") || "").split(/\s+/);
            if (a.hasAttribute("download") || (rel && rel.includes("external")))
                return;
            const url = new URL(href);
            if (url.origin !== window.location.origin ||
                (basePath && url.pathname && !url.pathname.toLowerCase().startsWith(basePath.toLowerCase())))
                return;
            const to = parsePath(url.pathname + url.search + url.hash);
            const state = a.getAttribute("state");
            evt.preventDefault();
            navigateFromRoute(baseRoute, to, {
                resolve: false,
                replace: a.hasAttribute("replace"),
                scroll: !a.hasAttribute("noscroll"),
                state: state && JSON.parse(state)
            });
        }
        // ensure delegated events run first
        delegateEvents(["click"]);
        document.addEventListener("click", handleAnchorClick);
        onCleanup(() => document.removeEventListener("click", handleAnchorClick));
    }
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory,
        beforeLeave
    };
}
function createRouteContext(router, parent, child, match, params) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (isServer ? staticIntegration({
    value: url || ""
  }) : pathIntegration());
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent$1(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return props.children;
    }
  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));
  const params = createMemoObject(() => {
    const m = matches();
    const params = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params, m[i].params);
    }
    return params;
  });
  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i], params);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach(dispose => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createComponent$1(Show, {
    get when() {
      return routeStates() && root;
    },
    keyed: true,
    children: route => createComponent$1(RouteContextObj.Provider, {
      value: route,
      get children() {
        return route.outlet();
      }
    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent$1(Show, {
    get when() {
      return route.child;
    },
    keyed: true,
    children: child => createComponent$1(RouteContextObj.Provider, {
      value: child,
      get children() {
        return child.outlet();
      }
    })
  });
};
function A$1(props) {
  props = mergeProps({
    inactiveClass: "inactive",
    activeClass: "active"
  }, props);
  const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);
  const to = useResolvedPath(() => props.href);
  const href = useHref(to);
  const location = useLocation();
  const isActive = createMemo(() => {
    const to_ = to();
    if (to_ === undefined) return false;
    const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
    const loc = normalizePath(location.pathname).toLowerCase();
    return props.end ? path === loc : loc.startsWith(path);
  });
  return ssrElement("a", mergeProps$1({
    link: true
  }, rest, {
    get href() {
      return href() || props.href;
    },
    get state() {
      return JSON.stringify(props.state);
    },
    get classList() {
      return {
        ...(props.class && {
          [props.class]: true
        }),
        [props.inactiveClass]: !isActive(),
        [props.activeClass]: isActive(),
        ...rest.classList
      };
    },
    get ["aria-current"]() {
      return isActive() ? "page" : undefined;
    }
  }), undefined, true);
}

class ServerError extends Error {
  constructor(message, {
    status,
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400;
    if (stack) {
      this.stack = stack;
    }
  }
}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }
}

const ServerContext = createContext({});

createContext();
createContext();

const A = A$1;
const Routes = Routes$1;

const server$ = (_fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: data.status,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash, serverResource) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        return serverResource ? _fn.call(ctx, args[0], ctx) : _fn.call(ctx, ...args);
      } catch (e) {
        if (e instanceof Error && /[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer") || "").pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

function renderAsync(fn, options) {
  return () => apiRoutes({
    forward: inlineServerFunctions({
      async forward(event) {
        let pageEvent = createPageEvent(event);
        let markup = await renderToStringAsync(() => fn(pageEvent), options);
        if (pageEvent.routerContext && pageEvent.routerContext.url) {
          return redirect(pageEvent.routerContext.url, {
            headers: pageEvent.responseHeaders
          });
        }
        markup = handleIslandsRouting(pageEvent, markup);
        return new Response(markup, {
          status: pageEvent.getStatusCode(),
          headers: pageEvent.responseHeaders
        });
      }
    })
  });
}
function createPageEvent(event) {
  let responseHeaders = new Headers({
    "Content-Type": "text/html"
  });
  const prevPath = event.request.headers.get("x-solid-referrer");
  let statusCode = 200;
  function setStatusCode(code) {
    statusCode = code;
  }
  function getStatusCode() {
    return statusCode;
  }
  const pageEvent = Object.freeze({
    request: event.request,
    prevUrl: prevPath || "",
    routerContext: {},
    tags: [],
    env: event.env,
    clientAddress: event.clientAddress,
    locals: event.locals,
    $type: FETCH_EVENT,
    responseHeaders,
    setStatusCode,
    getStatusCode,
    fetch: internalFetch
  });
  return pageEvent;
}
function handleIslandsRouting(pageEvent, markup) {
  return markup;
}

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const getTagType = tag => tag.tag + (tag.name ? `.${tag.name}"` : "");
const MetaProvider = props => {
  if (!isServer && !sharedConfig.context) {
    const ssrTags = document.head.querySelectorAll(`[data-sm]`);
    // `forEach` on `NodeList` is not supported in Googlebot, so use a workaround
    Array.prototype.forEach.call(ssrTags, ssrTag => ssrTag.parentNode.removeChild(ssrTag));
  }
  const cascadedTagInstances = new Map();
  // TODO: use one element for all tags of the same type, just swap out
  // where the props get applied
  function getElement(tag) {
    if (tag.ref) {
      return tag.ref;
    }
    let el = document.querySelector(`[data-sm="${tag.id}"]`);
    if (el) {
      if (el.tagName.toLowerCase() !== tag.tag) {
        if (el.parentNode) {
          // remove the old tag
          el.parentNode.removeChild(el);
        }
        // add the new tag
        el = document.createElement(tag.tag);
      }
      // use the old tag
      el.removeAttribute("data-sm");
    } else {
      // create a new tag
      el = document.createElement(tag.tag);
    }
    return el;
  }
  const actions = {
    addClientTag: tag => {
      let tagType = getTagType(tag);
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        //  only cascading tags need to be kept as singletons
        if (!cascadedTagInstances.has(tagType)) {
          cascadedTagInstances.set(tagType, []);
        }
        let instances = cascadedTagInstances.get(tagType);
        let index = instances.length;
        instances = [...instances, tag];
        // track indices synchronously
        cascadedTagInstances.set(tagType, instances);
        if (!isServer) {
          let element = getElement(tag);
          tag.ref = element;
          spread(element, tag.props);
          let lastVisited = null;
          for (var i = index - 1; i >= 0; i--) {
            if (instances[i] != null) {
              lastVisited = instances[i];
              break;
            }
          }
          if (element.parentNode != document.head) {
            document.head.appendChild(element);
          }
          if (lastVisited && lastVisited.ref) {
            document.head.removeChild(lastVisited.ref);
          }
        }
        return index;
      }
      if (!isServer) {
        let element = getElement(tag);
        tag.ref = element;
        spread(element, tag.props);
        if (element.parentNode != document.head) {
          document.head.appendChild(element);
        }
      }
      return -1;
    },
    removeClientTag: (tag, index) => {
      const tagName = getTagType(tag);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagName);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagName, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
  if (isServer) {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props;
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
    };
    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }
  return createComponent$1(MetaContext.Provider, {
    value: actions,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props, setting) => {
  const id = createUniqueId();
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  useHead({
    tag,
    props,
    setting,
    id,
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const {
    addClientTag,
    removeClientTag,
    addServerTag
  } = useContext(MetaContext);
  createRenderEffect(() => {
    if (!isServer) {
      let index = addClientTag(tagDesc);
      onCleanup(() => removeClientTag(tagDesc, index));
    }
  });
  if (isServer) {
    addServerTag(tagDesc);
    return null;
  }
}
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    // @ts-expect-error
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${escape(tag.props[k], true)}"`).join("");
    if (tag.props.children) {
      // Tags might contain multiple text children:
      //   <Title>example - {myCompany}</Title>
      const children = Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children;
      if (tag.setting?.escape && typeof children === "string") {
        return `<${tag.tag} data-sm="${tag.id}"${props}>${escape(children)}</${tag.tag}>`;
      }
      return `<${tag.tag} data-sm="${tag.id}"${props}>${children}</${tag.tag}>`;
    }
    return `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props, {
  escape: true
});
const Meta$1 = props => MetaTag("meta", props, {
  escape: true
});

const _tmpl$$9 = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent$1(ErrorBoundary$1, {
    fallback: (e, reset) => {
      return createComponent$1(Show, {
        get when() {
          return !props.fallback;
        },
        get fallback() {
          return props.fallback && props.fallback(e, reset);
        },
        get children() {
          return createComponent$1(ErrorMessage, {
            error: e
          });
        }
      });
    },
    get children() {
      return props.children;
    }
  });
}
function ErrorMessage(props) {
  createEffect(() => console.error(props.error));
  return ssr(_tmpl$$9, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

const routeLayouts = {
  "/*404": {
    "id": "/*404",
    "layouts": []
  },
  "/fun": {
    "id": "/fun",
    "layouts": []
  },
  "/": {
    "id": "/",
    "layouts": []
  },
  "/research": {
    "id": "/research",
    "layouts": []
  },
  "/teaching": {
    "id": "/teaching",
    "layouts": []
  },
  "/cv/": {
    "id": "/cv/",
    "layouts": []
  }
};

const _tmpl$$8 = ["<link", " rel=\"stylesheet\"", ">"],
  _tmpl$2$4 = ["<link", " rel=\"modulepreload\"", ">"];
function flattenIslands(match, manifest) {
  let result = [...match];
  match.forEach(m => {
    if (m.type !== "island") return;
    const islandManifest = manifest[m.href];
    if (islandManifest) {
      const res = flattenIslands(islandManifest.assets, manifest);
      result.push(...res);
    }
  });
  return result;
}
function getAssetsFromManifest(manifest, routerContext) {
  let match = routerContext.matches ? routerContext.matches.reduce((memo, m) => {
    if (m.length) {
      const fullPath = m.reduce((previous, match) => previous + match.originalPath, "");
      const route = routeLayouts[fullPath];
      if (route) {
        memo.push(...(manifest[route.id] || []));
        const layoutsManifestEntries = route.layouts.flatMap(manifestKey => manifest[manifestKey] || []);
        memo.push(...layoutsManifestEntries);
      }
    }
    return memo;
  }, []) : [];
  match.push(...(manifest["entry-client"] || []));
  match = manifest ? flattenIslands(match, manifest) : [];
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$$8, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : src.type === "script" ? ssr(_tmpl$2$4, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : undefined;
    return r;
  }, {});
  return Object.values(links);
}

/**
 * Links are used to load assets for the server rendered HTML
 * @returns {JSXElement}
 */
function Links() {
  const context = useContext(ServerContext);
  useAssets(() => getAssetsFromManifest(context.env.manifest, context.routerContext));
  return null;
}

function Meta() {
  const context = useContext(ServerContext);
  // @ts-expect-error The ssr() types do not match the Assets child types
  useAssets(() => ssr(renderTags(context.tags)));
  return null;
}

const _tmpl$4$3 = ["<script", " type=\"module\" async", "></script>"];
const isDev = "production" === "development";
const isIslands = false;
function Scripts() {
  const context = useContext(ServerContext);
  return [createComponent$1(HydrationScript, {}), isIslands , createComponent$1(NoHydration, {
    get children() {
      return isServer && (      ssr(_tmpl$4$3, ssrHydrationKey(), ssrAttribute("src", escape(context.env.manifest["entry-client"][0].href, true), false)) );
    }
  }), isDev ];
}

function Html(props) {
  {
    return ssrElement("html", props, undefined, false);
  }
}
function Head(props) {
  {
    return ssrElement("head", props, () => [escape(props.children), createComponent$1(Meta, {}), createComponent$1(Links, {})], false);
  }
}
function Body(props) {
  {
    return ssrElement("body", props, () => escape(props.children) , false);
  }
}

function HttpStatusCode(props) {
  const context = useContext(ServerContext);
  if (isServer) {
    context.setStatusCode(props.code);
  }
  onCleanup(() => {
    if (isServer) {
      context.setStatusCode(200);
    }
  });
  return null;
}

const _tmpl$$7 = ["<main", "><!--#-->", "<!--/--><!--#-->", "<!--/--><h1>Page Not Found</h1><p class=\"red\">Where are you going?</p></main>"];
function NotFound() {
  return ssr(_tmpl$$7, ssrHydrationKey(), escape(createComponent$1(Title, {
    children: "Page Not Found"
  })), escape(createComponent$1(HttpStatusCode, {
    code: 404
  })));
}

const _tmpl$$6 = ["<main", "><!--#-->", "<!--/--><!--#-->", "<!--/--><h1>Page Not Found</h1><p class=\"red\">Page coming soon...</p></main>"];
function Fun() {
  return ssr(_tmpl$$6, ssrHydrationKey(), escape(createComponent$1(Title, {
    children: "Fun - Foo Yong Qi"
  })), escape(createComponent$1(HttpStatusCode, {
    code: 404
  })));
}

const Card$1 = '';

const _tmpl$$5 = ["<div", " class=\"", "\"><h2", ">", "</h2><!--#-->", "<!--/--></div>"];
function Card(props) {
  return ssr(_tmpl$$5, ssrHydrationKey(), `${escape(props.border, true)}-border card`, ssrAttribute("class", escape(props.header_color, true), false), escape(props.header), escape(props.children));
}

const _tmpl$$4 = ["<p", "><em class=\"teal\">Instructor</em> and <em class=\"flamingo\">PhD in Computer Science candidate</em> at the Department of Computer Science, School of Computing, <em class=\"sky\">National University of Singapore</em>.</p>"],
  _tmpl$2$3 = ["<p", ">I like <em class=\"yellow\">ducks</em>, <em class=\"red\">type systems</em>, and <em class=\"lavender\">programming languages</em></p>"],
  _tmpl$3$3 = ["<div", "><strong>Email</strong>: <em class=\"sapphire\">yongqi@nus.edu.sg</em></div>"],
  _tmpl$4$2 = ["<div", "><strong>DID</strong>: <em class=\"rosewater\">+65 6516 7960</em></div>"],
  _tmpl$5$2 = ["<div", "><strong>Office</strong>: <em class=\"peach\">COM2-02-27, 15 Computing Drive, Singapore 117418</em></div>"],
  _tmpl$6$2 = ["<main", "><!--#-->", "<!--/--><img class=\"circle profile-pic\" src=\"../yongqi.jpg\"><h1><strong class=\"red\">Foo</strong> Yong Qi</h1><div><em>Keep it simple, stupid.</em></div><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"];
function Home() {
  return ssr(_tmpl$6$2, ssrHydrationKey(), escape(createComponent$1(Title, {
    children: "Foo Yong Qi"
  })), escape(createComponent$1(Card, {
    border: "mauve",
    header_color: "green",
    header: "About",
    get children() {
      return [ssr(_tmpl$$4, ssrHydrationKey()), ssr(_tmpl$2$3, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    border: "flamingo",
    header_color: "teal",
    header: "Contact",
    get children() {
      return [ssr(_tmpl$3$3, ssrHydrationKey()), ssr(_tmpl$4$2, ssrHydrationKey()), ssr(_tmpl$5$2, ssrHydrationKey())];
    }
  })));
}

const _tmpl$$3 = ["<h3", ">Abstract</h3>"],
  _tmpl$2$2 = ["<p", ">-- withheld until publication date --</p>"],
  _tmpl$3$2 = ["<main", "><!--#-->", "<!--/--><h1>Research</h1><!--#-->", "<!--/--></main>"];
function Teaching$1() {
  return ssr(_tmpl$3$2, ssrHydrationKey(), escape(createComponent$1(Title, {
    children: "Research - Foo Yong Qi"
  })), escape(createComponent$1(Card, {
    header: "-- withheld --",
    header_color: "yellow",
    border: "peach",
    get children() {
      return [ssr(_tmpl$$3, ssrHydrationKey()), ssr(_tmpl$2$2, ssrHydrationKey())];
    }
  })));
}

const _tmpl$$2 = ["<em", ">Software Development Fundamentals</em>"],
  _tmpl$2$1 = ["<h3", ">Course Description</h3>"],
  _tmpl$3$1 = ["<p", ">This module aims to introduce non-computing students to the principles and concepts of software development at an accelerated pace. Students will be introduced to the basics of programming (control flow, code and data abstraction, recursion, types, OO), development methodology (ensuring correctness, testing, debugging), simple data structures and algorithms (lists, maps, sorting), and software engineering principles. Through hands on assignments and projects, students will learn good software development practices (documentation, style) and experience a typical software engineering cycle.</p>"],
  _tmpl$4$1 = ["<h3", "> Semesters Taught</h3>"],
  _tmpl$5$1 = ["<ul", "><li>AY23/24 Semester 2</li> <li>AY22/23 Semester 2</li> <li>AY22/23 Semester 1</li> <li>AY21/22 Semester 2</li> <li>AY21/22 Semester 1</li><li> AY20/21 Semester 2</li></ul>"],
  _tmpl$6$1 = ["<em", ">Industry Readiness: Security Best Practices</em>"],
  _tmpl$7$1 = ["<p", ">Malicious exploitation of vulnerable applications running on the web can have disastrous consequences. This module aims to introduce application security considerations and provide practical experience on secure coding practices, focusing on web-based applications. Topics covered include fundamental security concepts (e.g., encryption, authentication, authorization), secure coding practices (e.g., handling of cookies, passwords, errors), secure design and deployment principles (e.g., threat modelling, vulnerability scanning), along with industry standards (e.g., OWASP), tools, common threats and defense against them.</p>"],
  _tmpl$8$1 = ["<p", ">AY23/24 Semester 1</p>"],
  _tmpl$9$1 = ["<em", ">High-Throughput Stream Programming</em>"],
  _tmpl$10$1 = ["<p", ">The global availability of data has reached a level where aggregating data into generic, general-purpose \u201Cstores\u201D is no longer feasible. Having data collections statically available for querying by interested parties on demand is increasingly becoming the way of the past. Instead, a new paradigm, called Data Streaming, has emerged recently. In this paradigm, data is bundled into high-throughput \"streams\" that are sharded efficiently across a large number of network nodes. Consumers, sometimes counted in hundreds of thousands, or millions, \"subscribe\" to data subsets and are notified when new data becomes available, being under the obligation to process it immediately, or lose it. Consequently, data storage is no longer centralized, but rather distributed into many smaller-sized abstract collections. This new approach to \"Big Data\" requires a new set of tools, platforms, and solution patterns. In this course we propose to explore several facets of this new paradigm:</p>"],
  _tmpl$11$1 = ["<ul", "><li>The Stream paradigm introduced in Java 8.</li><li>Platforms that implement Data Streaming, such as Kafka, and the Java bindings in the library KafkaConnect.</li><li>Computing paradigms for stream processing, such as Reactive Programming, and the library RxJava.</li><li>High-performance stream computing platforms, such as Flink.</li></ul>"],
  _tmpl$12$1 = ["<p", ">The course will be using Java as the main vehicle for introducing concepts and showcasing examples.</p>"],
  _tmpl$13$1 = ["<p", ">AY23/24 Semester 2</p>"],
  _tmpl$14$1 = ["<em", ">Data Structures & Algorithms</em>"],
  _tmpl$15$1 = ["<p", ">This module introduces non-computing students to efficient computational problem solving in an accelerated pace. Students will learn to formulate a computational problem, identify the data required and come up with appropriate data structures to represent them, and apply known strategies to design an algorithm to solve the problem. Students will also learn to quantify the space and time complexity of an algorithm, prove the correctness of an algorithm, and the limits of computation. Topics include common data structures and their algorithms (lists, hash tables, heap, trees, graphs), algorithmic problem solving paradigms (greedy, divide and conquer, dynamic programming), and NP-completeness.</p>"],
  _tmpl$16$1 = ["<p", ">AY20/21 Semester 2</p>"],
  _tmpl$17$1 = ["<em", ">Enterprise Systems Architecture Fundamentals</em>"],
  _tmpl$18$1 = ["<p", ">This module aims to equip non-computing students with fundamental knowledge in architecting and designing modern Enterprise Systems in organisations that can be reasonably complex, scalable, distributed, component-based and missioncritical. Students will develop an understanding of high-level concepts such as enterprise architecture and software architecture. They will them move on to acquire fundamental systems analysis and design techniques such as object-oriented requirements analysis and design using the Unified Modelling Language.</p>"],
  _tmpl$19$1 = ["<em", ">Programming Methodology</em>"],
  _tmpl$20$1 = ["<p", ">This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing. Topics covered include computational thinking and computational problem solving, designing and specifying an algorithm, basic problem formulation and problem solving approaches, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures (arrays, strings, composite data types), basic sorting, and recursion.</p>"],
  _tmpl$21$1 = ["<ul", "><li>AY20/21 Semester 1</li><li>AY19/20 Special Term 2</li><li>AY19/20 Semester 2</li><li>AY19/20 Semester 1</li><li>AY18/19 Semester 2</li><li>AY18/19 Semester 1</li></ul>"],
  _tmpl$22$1 = ["<p", ">This module is a follow up to CS1010. It explores two modern programming paradigms, object-oriented programming and functional programming. Through a series of integrated assignments, students will learn to develop medium-scale software programs in the order of thousands of lines of code and tens of classes using objectoriented design principles and advanced programming constructs available in the two paradigms. Topics include objects and classes, composition, association, inheritance, interface, polymorphism, abstract classes, dynamic binding, lambda expression, effect-free programming, first class functions, closures, continuations, monad, etc.</p>"],
  _tmpl$23$1 = ["<ul", "><li>AY20/21 Semester 1</li><li>AY19/20 Special Term 1</li><li>AY19/20 Semester 2</li><li>AY19/20 Semester 1</li><li>AY18/19 Semester 2</li></ul>"],
  _tmpl$24$1 = ["<main", "><!--#-->", "<!--/--><h1>Teaching</h1><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"];
function Teaching() {
  return ssr(_tmpl$24$1, ssrHydrationKey(), escape(createComponent$1(Title, {
    children: "Teaching - Foo Yong Qi"
  })), escape(createComponent$1(Card, {
    header: "IT5001",
    header_color: "yellow",
    border: "peach",
    get children() {
      return [ssr(_tmpl$$2, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$3$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$5$1, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "IT5100E",
    header_color: "green",
    border: "lavender",
    get children() {
      return [ssr(_tmpl$6$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$7$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$8$1, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "IT5100B",
    header_color: "blue",
    border: "maroon",
    get children() {
      return [ssr(_tmpl$9$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$10$1, ssrHydrationKey()), ssr(_tmpl$11$1, ssrHydrationKey()), ssr(_tmpl$12$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$13$1, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "IT5003",
    header_color: "lavender",
    border: "red",
    get children() {
      return [ssr(_tmpl$14$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$15$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$16$1, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "IT5004",
    header_color: "peach",
    border: "teal",
    get children() {
      return [ssr(_tmpl$17$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$18$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$16$1, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "CS1010E",
    header_color: "rosewater",
    border: "green",
    get children() {
      return [ssr(_tmpl$19$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$20$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$21$1, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "CS2030/S",
    header_color: "mauve",
    border: "flamingo",
    get children() {
      return [ssr(_tmpl$19$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$22$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$23$1, ssrHydrationKey())];
    }
  })));
}

const CV$1 = '';

const _tmpl$$1 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name green\">Ph.D. in Computer Science</div><div class=\"cv-item-date green\">Aug 2023 to Present</div></div><div class=\"cv-item-place green\">National University of Singapore</div></div>"],
  _tmpl$2 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name pink\">M.Sc. in Computer Science (by Research)</div><div class=\"cv-item-date pink\">Jan 2021 to Jun 2023</div></div><div class=\"cv-item-place pink\">National University of Singapore</div><p class=\"description\"><strong>Key modules</strong>: Program Analysis, Robotics, Algorithms<br><strong>CAP</strong>: 4.5/5.0<br><strong>Thesis</strong>: Compiling and Detecting Type Errors in Incomplete Java Programs with Generics<br><strong>Supervisor</strong>: Associate Professor Khoo Siau Cheng, Ph.D.</p></div>"],
  _tmpl$3 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name yellow\">B.Eng. (Hons) in Industrial & Systems Engineering</div><div class=\"cv-item-date yellow\">Aug 2017 to Dec 2020</div></div><div class=\"cv-item-place yellow\">National University of Singapore</div><p class=\"description\"><strong>Key modules</strong>: Programming Methodology, Algorithms, Software Engineering<br><strong>CAP</strong>: 4.28/5.0<br><strong>Dissertation</strong>: Regional Multi-Person Pose Estimation for Sports Analytics<br><strong>Supervisor</strong>: Professor Andrew Lim, Ph.D.</p></div>"],
  _tmpl$4 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name green\">Instructor</div><div class=\"cv-item-date green\">Jan 2023 to Present</div></div><div class=\"cv-item-place green\">National University of Singapore</div><p class=\"description\">Modules taught: IT5001, IT5100B, IT5100E</p></div>"],
  _tmpl$5 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name lavender\">Teaching Assistant</div><div class=\"cv-item-date lavender\">Aug 2018 to Dec 2022</div></div><div class=\"cv-item-place lavender\">National University of Singapore</div><p class=\"description\">Modules taught: CS1010E, CS2030/S, IT5001, IT5003, IT5004</p></div>"],
  _tmpl$6 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name sapphire\">PWA Developer</div><div class=\"cv-item-date sapphire\">Aug 2019 to Aug 2020</div></div><div class=\"cv-item-place sapphire\">National University of Singapore</div><p class=\"description\">Developed a Nuxt.js PWA for NUS Smart Dining Initiative</p></div>"],
  _tmpl$7 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name peach\">Business Development</div><div class=\"cv-item-date peach\">May 2018 to Jul 2020</div></div><div class=\"cv-item-place peach\">Sqkii</div><p class=\"description\">Liaised with corporate partners for business ventures and pitched projects to clients</p></div>"],
  _tmpl$8 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name teal\">Co-Founder, President</div><div class=\"cv-item-date teal\">Apr 2018 to Apr 2020</div></div><div class=\"cv-item-place teal\">Uncage</div><p class=\"description\">Started a Non-Profit Organization aimed at harnessing the power of community to rehabilitate people with Substance Use Disorders</p></div>"],
  _tmpl$9 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name mauve\">Compiling & Detecting Type Errors in Incomplete Java Programs with Generics</div><div class=\"cv-item-date mauve\">Jan 2021 to May 2023</div></div><div class=\"cv-item-header\"><div class=\"cv-item-place\">Master's Thesis</div><div class=\"cv-item-date\">Supervisor: Associate Professor Khoo Siau Cheng, Ph.D.</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Proposed a novel constraint-based algorithm that compiles incomplete Java programs in a typesafe manner and developed a prototype of this algorithm, JavaCIP</p></div>"],
  _tmpl$10 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name yellow\">Regional Multi-Person Pose Estimation for Sports Analytics</div><div class=\"cv-item-date yellow\">Aug 2020 to Dec 2020</div></div><div class=\"cv-item-header\"><div class=\"cv-item-place\">Bachelor's Thesis</div><div class=\"cv-item-date\">Supervisor: Professor Andrew Lim, Ph.D.</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Used AlphaPose and a novel LSTM network for Action Recognition in Basketball analysis</p></div>"],
  _tmpl$11 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name pink\">Fedora-SoC</div><div class=\"cv-item-date pink\">Aug 2020 to Dec 2020</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Developed a fork of Fedora (Linux Workstation) for exam-takers in NUS SoC during COVID-19 pandemic</p></div>"],
  _tmpl$12 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name maroon\">NUS Smart Dining</div><div class=\"cv-item-date maroon\">Aug 2019 to May 2020</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Used mmdetection computer vision framework to recognize orders from top-down camera view at Frontier Food Court\u2019s Drink Stall</p></div>"],
  _tmpl$13 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name flamingo\">Live Firing Systems Optimization</div><div class=\"cv-item-date flamingo\">Feb 2017</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div><p class=\"description\">Developed Live Firing scheduling system for use in the Multi-Mission Range Complex (MMRC), resulting in S$75,000 annual cost savings</p></div>"],
  _tmpl$14 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name red\">Full-Time Teaching Assistant Award</div><div class=\"cv-item-date red\">May 2022</div></div><div class=\"cv-item-place red\">National University of Singapore</div></div>"],
  _tmpl$15 = ["<div", " class=\"cv-item sapphire\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Honour List of Student Tutors</div><div class=\"cv-item-date\">May 2021</div></div><div class=\"cv-item-place\">National University of Singapore</div></div>"],
  _tmpl$16 = ["<div", " class=\"cv-item lavender\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Honour List of Student Tutors</div><div class=\"cv-item-date\">May 2019</div></div><div class=\"cv-item-place\">National University of Singapore</div></div>"],
  _tmpl$17 = ["<div", " class=\"cv-item peach\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Dean's List</div><div class=\"cv-item-date\">Jan 2019</div></div><div class=\"cv-item-place\">National University of Singapore</div></div>"],
  _tmpl$18 = ["<div", " class=\"cv-item pink\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">3AMB Base Sergeant Major's Coin</div><div class=\"cv-item-date\">Nov 2016</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$19 = ["<div", " class=\"cv-item sky\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Letter of Commendation</div><div class=\"cv-item-date\">Oct 2016</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$20 = ["<div", " class=\"cv-item flamingo\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">3AMB Commanding Officer's Coin</div><div class=\"cv-item-date\">Sep 2016</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$21 = ["<div", " class=\"cv-item yellow\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">SCS L Coy Platoon Best Soldier</div><div class=\"cv-item-date\">Sep 2015</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$22 = ["<div", " class=\"cv-item maroon\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">BMTC 2 Coy Platoon Best Recruit</div><div class=\"cv-item-date\">Jul 2015</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$23 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name teal\">Languages</div><div class=\"cv-item-date\"></div></div><p class=\"description\">English, Mandarin</p></div>"],
  _tmpl$24 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name yellow\">Office</div><div class=\"cv-item-date\"></div></div><p class=\"description\">Microsoft Office Suite (PowerPoint, Excel, Word)</p></div>"],
  _tmpl$25 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name green\">Development</div><div class=\"cv-item-date\"></div></div><p class=\"description\">Java, Python, Scala, C/C++, JavaScript, TypeScript, Solid.js, Nuxt.js, Vue.js, React.js, Quasar, Node.js, ML, Haskell, Rust, Go, R, Firebase, PyTorch, OpenCV, Google Cloud Platform, LaTeX, Markdown, HTML, CSS</p></div>"],
  _tmpl$26 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name rosewater\">Systems</div><div class=\"cv-item-date\"></div></div><p class=\"description\">Tableau, Stella Architect, Automod Simulation</p></div>"],
  _tmpl$27 = ["<main", "><!--#-->", "<!--/--><h1>CV</h1><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"];
function CV() {
  return ssr(_tmpl$27, ssrHydrationKey(), escape(createComponent$1(Title, {
    children: "CV - Foo Yong Qi"
  })), escape(createComponent$1(Card, {
    header: "education",
    header_color: "mauve",
    border: "red",
    get children() {
      return [ssr(_tmpl$$1, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey()), ssr(_tmpl$3, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "Employment",
    header_color: "red",
    border: "sky",
    get children() {
      return [ssr(_tmpl$4, ssrHydrationKey()), ssr(_tmpl$5, ssrHydrationKey()), ssr(_tmpl$6, ssrHydrationKey()), ssr(_tmpl$7, ssrHydrationKey()), ssr(_tmpl$8, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "Projects",
    header_color: "teal",
    border: "peach",
    get children() {
      return [ssr(_tmpl$9, ssrHydrationKey()), ssr(_tmpl$10, ssrHydrationKey()), ssr(_tmpl$11, ssrHydrationKey()), ssr(_tmpl$12, ssrHydrationKey()), ssr(_tmpl$13, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "Awards",
    header_color: "rosewater",
    border: "green",
    get children() {
      return [ssr(_tmpl$14, ssrHydrationKey()), ssr(_tmpl$15, ssrHydrationKey()), ssr(_tmpl$16, ssrHydrationKey()), ssr(_tmpl$17, ssrHydrationKey()), ssr(_tmpl$18, ssrHydrationKey()), ssr(_tmpl$19, ssrHydrationKey()), ssr(_tmpl$20, ssrHydrationKey()), ssr(_tmpl$21, ssrHydrationKey()), ssr(_tmpl$22, ssrHydrationKey())];
    }
  })), escape(createComponent$1(Card, {
    header: "Superpowers",
    header_color: "maroon",
    border: "yellow",
    get children() {
      return [ssr(_tmpl$23, ssrHydrationKey()), ssr(_tmpl$24, ssrHydrationKey()), ssr(_tmpl$25, ssrHydrationKey()), ssr(_tmpl$26, ssrHydrationKey())];
    }
  })));
}

/// <reference path="../server/types.tsx" />

const fileRoutes = [{
  component: NotFound,
  path: "/*404"
}, {
  component: Fun,
  path: "/fun"
}, {
  component: Home,
  path: "/"
}, {
  component: Teaching$1,
  path: "/research"
}, {
  component: Teaching,
  path: "/teaching"
}, {
  component: CV,
  path: "/cv/"
}];

/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const FileRoutes = () => {
  return fileRoutes;
};

const NavBar$1 = '';

const _tmpl$ = ["<nav", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></nav>"];
function NavBar() {
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent$1(A, {
    "class": "navitem",
    href: "/",
    children: "Home"
  })), escape(createComponent$1(A, {
    "class": "navitem",
    href: "/cv",
    children: "CV"
  })), escape(createComponent$1(A, {
    "class": "navitem",
    href: "/teaching",
    children: "Teaching"
  })), escape(createComponent$1(A, {
    "class": "navitem",
    href: "/research",
    children: "Research"
  })), escape(createComponent$1(A, {
    "class": "navitem",
    href: "/fun",
    children: "Fun"
  })));
}

const root = '';

function Root() {
  return createComponent$1(Html, {
    lang: "en",
    get children() {
      return [createComponent$1(Head, {
        get children() {
          return [createComponent$1(Title, {
            children: "Foo Yong Qi"
          }), createComponent$1(Meta$1, {
            charset: "utf-8"
          }), createComponent$1(Meta$1, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          })];
        }
      }), createComponent$1(Body, {
        get children() {
          return [createComponent$1(Suspense, {
            get children() {
              return createComponent$1(ErrorBoundary, {
                get children() {
                  return [createComponent$1(NavBar, {}), createComponent$1(Routes, {
                    get children() {
                      return createComponent$1(FileRoutes, {});
                    }
                  })];
                }
              });
            }
          }), createComponent$1(Scripts, {})];
        }
      })];
    }
  });
}

const rootData = Object.values(/* #__PURE__ */ Object.assign({

}))[0];
const dataFn = rootData ? rootData.default : undefined;

/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** Input parameters for to an Exchange factory function. */

/** Function responsible for receiving an observable [operation]{@link Operation} and returning a [result]{@link OperationResult}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware(exchanges);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
function StartRouter(props) {
  return createComponent$1(Router, props);
}
const docType = ssr("<!DOCTYPE html>");
function StartServer({
  event
}) {
  const parsed = new URL(event.request.url);
  const path = parsed.pathname + parsed.search;

  // @ts-ignore
  sharedConfig.context.requestContext = event;
  return createComponent$1(ServerContext.Provider, {
    value: event,
    get children() {
      return createComponent$1(MetaProvider, {
        get tags() {
          return event.tags;
        },
        get children() {
          return createComponent$1(StartRouter, {
            url: path,
            get out() {
              return event.routerContext;
            },
            location: path,
            get prevLocation() {
              return event.prevUrl;
            },
            data: dataFn,
            routes: fileRoutes,
            get children() {
              return [docType, createComponent$1(Root, {})];
            }
          });
        }
      });
    }
  });
}

const entryServer = createHandler(renderAsync(event => createComponent$1(StartServer, {
  event: event
})));

export { entryServer as default };
