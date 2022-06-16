export interface IRouteConfig {
  name: string;
  path: string;
  getPath: (...args: string[]) => string;
  component: React.FC;
}

export type TRoutes = Record<string, IRouteConfig>;
