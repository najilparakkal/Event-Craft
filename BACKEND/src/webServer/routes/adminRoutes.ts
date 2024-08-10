import  express  from "express";
import authController from "../../adaptors/admin/authController";
import dashBoardController from "../../adaptors/admin/dashBoardController";
import { refund,adminAuth} from "../middlewares/AdminMiddleware";
const adminRouter = express.Router()

adminRouter.post("/api/admin/login",authController.adminChecking)
adminRouter.post("/api/admin/Users",adminAuth,dashBoardController.usersListing)
adminRouter.post("/api/admin/Vendors",adminAuth,dashBoardController.vendorsListing)
adminRouter.put("/api/admin/block",adminAuth,dashBoardController.blockorUnblock)
adminRouter.patch("/api/admin/blockUser",adminAuth,dashBoardController.blockorUnblockUser)
adminRouter.post("/api/admin/addCategory",adminAuth,dashBoardController.addCategory)
adminRouter.get("/api/admin/getCategory",adminAuth,dashBoardController.getCategory)
adminRouter.patch("/api/admin/removeCategory",adminAuth,dashBoardController.removeCategory)
adminRouter.get("/api/admin/request",adminAuth,dashBoardController.listRequest)
adminRouter.post("/api/admin/rejectVendor",adminAuth,dashBoardController.reject)
adminRouter.post("/api/admin/acceptVendor",adminAuth,dashBoardController.accept)
adminRouter.get('/api/admin/dashboard',adminAuth,dashBoardController.getDashboard)
adminRouter.get('/api/admin/cancelBookings',adminAuth,dashBoardController.getBookings)
adminRouter.patch('/api/admin/refund/:bookingId',adminAuth,dashBoardController.refundBooking)
adminRouter.get('/api/admin/bills',adminAuth,dashBoardController.bills)
adminRouter.get('/api/admin/reports',adminAuth,dashBoardController.reports)
adminRouter.put('/api/admin/blockVendor/:reportId/:vendorId',adminAuth,dashBoardController.blockVenodr)
adminRouter.put('/api/admin/readReport/:reportId',adminAuth,dashBoardController.readReport)
adminRouter.get('/api/admin/bookingCount',adminAuth,dashBoardController.booking)
adminRouter.put('/api/admin/readBill/:billId',adminAuth,dashBoardController.readBill)
export default adminRouter  