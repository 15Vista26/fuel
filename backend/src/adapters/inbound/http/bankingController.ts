import { Request, Response } from "express";
import { PrismaRouteRepository } from "../../outbound/postgres/PrismaRouteRepository";
import { PrismaBankingRepository } from "../../outbound/postgres/PrismaBankingRepository";
import { ComputeCB } from "../../../core/application/ComputeCB";
import { BankSurplus } from "../../../core/application/BankSurplus";
import { ApplyBanked } from "../../../core/application/ApplyBanked";

const routesRepo = new PrismaRouteRepository();
const bankRepo = new PrismaBankingRepository();

export const getCB = async (req: Request, res: Response) => {
  const year = Number(req.query.year);
  const baseline = await routesRepo.getBaseline();
  const compute = new ComputeCB(routesRepo);

  const cb = baseline ? await compute.execute(baseline.id) : 0;
  return res.json({ cb_before: cb });
};

export const bank = async (req: Request, res: Response) => {
  const { amount, year } = req.body;
  const baseline = await routesRepo.getBaseline();
  const compute = new ComputeCB(routesRepo);

  const cb = baseline ? await compute.execute(baseline.id) : 0;

  const usecase = new BankSurplus(bankRepo);
  const result = await usecase.execute(amount, year, cb);

  res.json(result);
};

export const apply = async (req: Request, res: Response) => {
  const { amount, year } = req.body;
  const baseline = await routesRepo.getBaseline();
  const compute = new ComputeCB(routesRepo);

  const cb = baseline ? await compute.execute(baseline.id) : 0;

  const usecase = new ApplyBanked(bankRepo);
  const result = await usecase.execute(amount, year, cb);

  res.json(result);
};
