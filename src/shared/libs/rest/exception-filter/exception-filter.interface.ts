import { Request, Response, NextFunction} from 'express';

export interface ExceptionFilter {
  //Должно быть 4  параметра, чтобы узнавал Express
  catch(err: Error, req: Request, res: Response, next: NextFunction): void;
}
