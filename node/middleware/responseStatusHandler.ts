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

  res.error = (message = "Error", data = null, status = 400) => {
    console.error({ error: data })
    return res.status(status).json({
      status,
      message,
      data,
    })
  }

  next()
}

export default responseStatusHandler
