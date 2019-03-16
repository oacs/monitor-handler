import { Request, Response, NextFunction } from "express";
export declare function monitor(options?: any): typeof monitorFunction;
declare function monitorFunction(req: Request, res: Response, next: NextFunction): void;
export {};
