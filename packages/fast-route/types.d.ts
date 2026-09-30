import type { ORDER } from './constants.ts';
import type { ISegmentSlice } from 'fast-path-parse/utils/segment';

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';

export type MapKey = 'PARAMETER' | 'WILDCARD' | 'ARRAY' | 'REGEXP';

export interface BuildRouteBase<THandler> {
  order: ORDER;
  type: 'static' | Lowercase<MapKey>;
  method: HttpMethod;
  path: string;
  handler: THandler;
}

export interface BuildRouteStatic<THandler> extends BuildRouteBase<THandler> {
  order: ORDER.STATIC;
  type: 'static';
}
export interface BuildRouteRegExp<THandler> extends BuildRouteBase<THandler> {
  order: ORDER.REGEXP;
  type: 'regexp';
}
export interface BuildRouteWithSegments<THandler>
  extends BuildRouteBase<THandler> {
  segments: ISegmentSlice;
}

export type BuildRoute<THandler> =
  | BuildRouteBase<THandler>
  | BuildRouteStatic<THandler>
  | BuildRouteRegExp<THandler>;

export type ValueOf<T> = T[keyof T];
