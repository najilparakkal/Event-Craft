import  express  from "express";
import authController from "../../adaptors/admin/authController";
import dashBoardController from "../../adaptors/admin/dashBoardController";
const adminRouter = express.Router()

adminRouter.post("/api/admin/login",authController.adminChecking)
adminRouter.post("/api/admin/Users",dashBoardController.usersListing)
adminRouter.post("/api/admin/Vendors",dashBoardController.vendorsListing)
adminRouter.put("/api/admin/block",dashBoardController.blockorUnblock)
adminRouter.patch("/api/admin/blockUser",dashBoardController.blockorUnblockUser)
adminRouter.post("/api/admin/addCategory",dashBoardController.addCategory)
adminRouter.get("/api/admin/getCategory",dashBoardController.getCategory)
adminRouter.patch("/api/admin/removeCategory",dashBoardController.removeCategory)
adminRouter.put("/api/admin/addRequest",dashBoardController.request)
adminRouter.get("/api/admin/request",dashBoardController.listRequest)
adminRouter.post("/api/admin/rejectVendor",dashBoardController.reject)
adminRouter.post("/api/admin/acceptVendor",dashBoardController.accept)


export default adminRouter  