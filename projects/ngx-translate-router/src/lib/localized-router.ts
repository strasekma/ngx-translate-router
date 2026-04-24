import { Router, ROUTES, Route, DefaultExport, Routes, PRIMARY_OUTLET, ɵEmptyOutletComponent } from '@angular/router';
import {
  Injector,
  Compiler,
  NgModuleFactory,
  PLATFORM_ID,
  inject,
  Injectable,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { from, of, isObservable, Observable, firstValueFrom } from 'rxjs';
import { isPromise } from './util';
import { LocalizeParser } from './localize-router.parser';

@Injectable({ providedIn: 'root' })
export class LocalizedRouter extends Router {
  private platformId = inject(PLATFORM_ID);
  private compiler = inject(Compiler);
  private localize = inject(LocalizeParser);
  private childrenLoaders = new WeakMap<Route, Promise<LoadedRouterConfig>>();
  onLoadStartListener?: (r: Route) => void;
  onLoadEndListener?: (r: Route) => void;
  constructor() {
    super();
    // Custom configuration
    const isBrowser = isPlatformBrowser(this.platformId);
    // __proto__ is needed for preloaded modules be doesn't work with SSR
    // @ts-ignore
    const configLoader = isBrowser
      ? (this as any).navigationTransitions.configLoader.__proto__
      : (this as any).navigationTransitions.configLoader;

    // Overrides default Angular RouterConfigLoader.loadChildren method so we can extend it
    configLoader.loadChildren = (parentInjector: Injector, route: any): Promise<LoadedRouterConfig> => {
      if (this.childrenLoaders.get(route)) {
        return this.childrenLoaders.get(route)!;
      } else if (route._loadedRoutes) {
        return Promise.resolve({
          routes: route._loadedRoutes,
          injector: route._loadedInjector,
        });
      }

      if (this.onLoadStartListener) {
        this.onLoadStartListener(route);
      }
      const loader = (async () => {
        try {
          const result = await this.customLoadChildren(route, this.compiler, parentInjector, this.onLoadEndListener);
          route._loadedRoutes = result.routes;
          route._loadedInjector = result.injector;
          route._loadedNgModuleFactory = result.factory;
          return result;
        } finally {
          this.childrenLoaders.delete(route);
        }
      })();
      this.childrenLoaders.set(route, loader);
      return loader;
    };
  }

  async customLoadChildren(
    route: Route,
    compiler: Compiler,
    parentInjector: Injector,
    onLoadEndListener?: (r: Route) => void
  ): Promise<LoadedRouterConfig> {
    const loaded = await wrapIntoPromise(runInInjectionContext(parentInjector, () => route.loadChildren!()));
    const t = maybeUnwrapDefaultExport(loaded);

    let factoryOrRoutes: NgModuleFactory<any> | Routes;
    if (t instanceof NgModuleFactory || Array.isArray(t)) {
      factoryOrRoutes = t;
    } else {
      factoryOrRoutes = await compiler.compileModuleAsync(t);
    }

    if (onLoadEndListener) {
      onLoadEndListener(route);
    }

    let injector: EnvironmentInjector | undefined;
    let rawRoutes: Route[];
    let factory: NgModuleFactory<unknown> | undefined = undefined;
    if (Array.isArray(factoryOrRoutes)) {
      rawRoutes = this.localize.initChildRoutes([].concat(...factoryOrRoutes));
    } else {
      injector = factoryOrRoutes.create(parentInjector).injector;
      factory = factoryOrRoutes;
      // Added portion
      const getMethod = injector.get.bind(injector);
      injector['get'] = (token: any, notFoundValue: any, flags?: any) => {
        const getResult = getMethod(token, notFoundValue, flags);
        if (token === ROUTES) {
          return this.localize.initChildRoutes([].concat(...getResult));
        } else {
          return getResult;
        }
      };

      rawRoutes = injector.get(ROUTES, [], { optional: true, self: true }).flat();
    }
    const routes = rawRoutes.map(standardizeConfig);
    return { routes, injector, factory };
  }
}

// Copy of https://github.com/angular/angular/blob/main/packages/router/src/components/empty_outlet.ts
export function standardizeConfig(r: Route): Route {
  const children = r.children && r.children.map(standardizeConfig);
  const c = children ? { ...r, children } : { ...r };
  if (!c.component && !c.loadComponent && (children || c.loadChildren) && c.outlet && c.outlet !== PRIMARY_OUTLET) {
    c.component = ɵEmptyOutletComponent;
  }
  return c;
}

export interface LoadedRouterConfig {
  routes: Route[];
  injector: EnvironmentInjector | undefined;
  factory?: NgModuleFactory<unknown>;
}

function isWrappedDefaultExport<T>(value: T | DefaultExport<T>): value is DefaultExport<T> {
  // We use `in` here with a string key `'default'`, because we expect `DefaultExport` objects to be
  // dynamically imported ES modules with a spec-mandated `default` key. Thus we don't expect that
  // `default` will be a renamed property.
  return value && typeof value === 'object' && 'default' in value;
}

function maybeUnwrapDefaultExport<T>(input: T | DefaultExport<T>): T {
  // As per `isWrappedDefaultExport`, the `default` key here is generated by the browser and not
  // subject to property renaming, so we reference it with bracket access.
  return isWrappedDefaultExport(input) ? input['default'] : input;
}

export function wrapIntoObservable<T>(value: T | NgModuleFactory<T> | Promise<T> | Observable<T>) {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    // Use `Promise.resolve()` to wrap promise-like instances.
    // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
    // change detection.
    return from(Promise.resolve(value));
  }

  return of(value);
}

export function wrapIntoPromise<T>(value: T | Promise<T> | Observable<T>): Promise<T> {
  if (isObservable(value)) {
    return firstValueFrom(value);
  }
  return Promise.resolve(value);
}
