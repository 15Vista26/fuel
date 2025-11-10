import { Route } from "../domain/Route";

export interface IRouteService {
  list(): Promise<Route[]>;
  setBaseline(id: number): Promise<void>;
}
