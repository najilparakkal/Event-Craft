import  express  from "express";
import authController from "../../adaptors/admin/authController";
import dashBoardController from "../../adaptors/admin/dashBoardController";
import refund from "../middlewares/AdminMiddleware";
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
adminRouter.patch('/api/admin/refund/:bookingId',refund,dashBoardController.refundBooking)
adminRouter.get('/api/admin/bills',dashBoardController.bills)
adminRouter.get('/api/admin/reports',dashBoardController.reports)
adminRouter.put('/api/admin/blockVendor/:reportId/:vendorId',dashBoardController.blockVenodr)
adminRouter.put('/api/admin/readReport/:reportId',dashBoardController.readReport)
adminRouter.get('/api/admin/bookingCount',dashBoardController.booking)
adminRouter.put('/api/admin/readBill/:billId',dashBoardController.readBill)
export default adminRouter  