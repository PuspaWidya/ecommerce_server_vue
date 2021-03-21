const errorHandler = (err, req, res, next) => {
    // res.status(err.status).json({message : err.message})
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({
        message: err.message
      })
    }
    else if (err.code === 401) {
      res.status(err.code).json({
        message: err.message
      })
    } else if (err.code === 402) {
      res.status(err.code).json({
        message: err.message
      })
    } else if (err.code === 403) {
      res.status(err.code).json({
        message: err.message
      })
    }else if (err.code === 404) {
      res.status(err.code).json({
        message: 'Invalid email or password'
      })
    }else{
      res.status(500).json({
        message: 'internal server error'
      })
    }
  }
  
  module.exports = errorHandler