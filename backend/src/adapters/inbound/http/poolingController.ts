import { Request, Response } from "express";
import { PrismaPoolingRepository } from "../../outbound/postgres/PrismaPoolingRepository";
import { CreatePool } from "../../../core/application/CreatePool";

const repo = new PrismaPoolingRepository();

export const getAdjustedCB = async (req: Request, res: Response) => {
  const year = Number(req.query.year);
  const data = await repo.getCBs(year);
  return res.json(data);
};

export const createPoolHandler = async (req: Request, res: Response) => {
  const { members, year } = req.body;
  const usecase = new CreatePool(repo);

  try {
    const result = await usecase.execute(members, year);
    return res.json({ members: result });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
