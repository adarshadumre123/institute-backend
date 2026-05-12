// export const adminOnly = (req, res, next) => {

//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Admin access only",
//     });
//   }

//   next();
// };


// export const teacherOnly = (req, res, next) => {

//   if (req.user.role !== "teacher") {
//     return res.status(403).json({
//       success: false,
//       message: "Teacher access only",
//     });
//   }

//   next();
// };

export const roleMiddleware = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};