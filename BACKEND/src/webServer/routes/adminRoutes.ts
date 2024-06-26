import  express  from "express";
import authController from "../../adaptors/admin/authController";
import dashBoardController from "../../adaptors/admin/dashBoardController";
const adminRouter = express.Router()

adminRouter.post("/api/admin/login",authController.adminChecking)
adminRouter.post("/api/admin/Users",dashBoardController.usersListing)
adminRouter.post("/api/admin/Vendors",dashBoardController.vendorsListing)
adminRouter.put("/api/admin/block",dashBoardController.blockorUnblock)
adminRouter.patch("/api/admin/blockUser",dashBoardController.blockorUnblockUser)


export default adminRouter