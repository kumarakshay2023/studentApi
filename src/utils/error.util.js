import {
    ValidationError,
    UniqueConstraintError,
    DatabaseError,
    ConnectionError,
    ForeignKeyConstraintError,
    TimeoutError,
  } from "sequelize";
  import env from "#configs/env";
  import chalk from "chalk";
  
  /****
   ** Global error handler function that logs errors and handles different types of Sequelize errors.
   **
   ** @param {Error} error - The error object to be handled
   ** @param {Object} req - The request object
   ** @param {Object} res - The response object
   ** @param {Function} next - The next middleware function
   ** @return {Object} - The response object with appropriate error handling
   **/
  export const globalErrorHandler = (error, req, res, next) => {
    // console.log(req.body);
    console.error(
      chalk.red(
        `Error ${error.stack ? `Stack--> ${error.stack} \n` : ``}${
          error.message ? `Message --> ${error.message}` : ``
        }`
      )
    );
  
    if (error instanceof ValidationError) {
      return res.status(400).json({
        status: false,
        message: "Validation Error",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }
  
    // Handle foreign key errors
    if (error instanceof ForeignKeyConstraintError) {
      return res.status(400).json({
        status: false,
        message: "Foreign Key Constraint Error",
        errors: {
          fields: error.fields[0],
          message: `${error.fields[0]} is invalid or doesn't exist`,
        },
      });
    }
  
    // Handle unique constraint errors
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        status: false,
        message: "Email already exists",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }
  
    // Handle database errors
    if (error instanceof DatabaseError) {
      return res.status(500).json({
        status: false,
        message: "Database error occurred",
        details: error.message,
      });
    }
  
    // Handle connection errors
    if (error instanceof ConnectionError) {
      return res.status(503).json({
        status: false,
        message: "Database connection error",
        details: error.message,
      });
    }
  
    if (error instanceof TimeoutError) {
      return res.status(504).json({
        status: false,
        message: "Database query timeout",
        details: "The request took too long to process. Please try again later.",
      });
    }
  
    if (error.original && error.original.code === "ER_LOCK_WAIT_TIMEOUT") {
      return res.status(504).json({
        status: false,
        message: "Database lock timeout",
        details:
          "The database is experiencing heavy load or deadlocks. Try again later.",
      });
    }
  
    if (error.code === "ETIMEDOUT") {
      return res.status(504).json({
        status: false,
        message: "Server request timeout",
        details:
          "The request took too long to respond. Please check your network or try again later.",
      });
    }
  
    if (error.code === "ECONNRESET") {
      return res.status(504).json({
        status: false,
        message: "Connection reset by server",
        details: "The server closed the connection unexpectedly.",
      });
    }
  
    if (error.code === "EPIPE") {
      return res.status(504).json({
        status: false,
        message: "Broken connection",
        details:
          "The connection was interrupted before the response was completed.",
      });
    }
  
    if (error.httpStatus && error.message) {
      return res
        .status(error.httpStatus)
        .json({ status: false, message: error.message });
    }
  
    if (typeof error === "string") next(error);
  
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      details: env.NODE_ENV === "development" ? error.message : undefined, // Expose details only in development
    });
  };
  