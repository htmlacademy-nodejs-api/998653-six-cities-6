import { Request, Response, NextFunction} from 'express';

export interface ExceptionFilter {
  catch(err: Error, req: Request, res: Response, next: NextFunction): void;
}
