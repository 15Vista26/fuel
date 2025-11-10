import { Request, Response } from "express";
import { PrismaRouteRepository } from "../../outbound/postgres/PrismaRouteRepository";
import { GetRoutes } from "../../../core/application/GetRoutes";
import { SetBaseline } from "../../../core/application/SetBaseline";

const repo = new PrismaRouteRepository();

export const getRoutesHandler = async (req: Request, res: Response) => {
  const usecase = new GetRoutes(repo);
  const data = await usecase.execute();
  return res.json(data);
};

export const setBaselineHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const usecase = new SetBaseline(repo);
  await usecase.execute(id);
  return res.json({ message: "Baseline updated ✅" });
};
