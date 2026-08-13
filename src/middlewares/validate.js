export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (err) {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    }
  };
};
