import type { Request, Response, NextFunction } from "express"

const responseStatusHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (message = "Success", data = null, status = 200) => {
    return res.status(status).json({
      status,
      message,
      data,
    })
  }

  res.error = (message = "Error", status = 400, data = null) => {
    return res.status(status).json({
      status,
      message,
      data,
    })
  }

  next()
}

export default responseStatusHandler
