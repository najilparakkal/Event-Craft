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
adminRouter.get("/api/admin/request",dashBoardController.listRequest)
adminRouter.post("/api/admin/rejectVendor",dashBoardController.reject)
adminRouter.post("/api/admin/acceptVendor",dashBoardController.accept)
adminRouter.get('/api/admin/dashboard',dashBoardController.getDashboard)
adminRouter.get('/api/admin/cancelBookings',dashBoardController.getBookings)
adminRouter.patch('/api/admin/refund/:bookingId',dashBoardController.refundBooking)
adminRouter.get('/api/admin/bills',dashBoardController.bills)

export default adminRouter  