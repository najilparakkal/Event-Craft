"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../adaptors/admin/authController"));
const dashBoardController_1 = __importDefault(require("../../adaptors/admin/dashBoardController"));
const AdminMiddleware_1 = require("../middlewares/AdminMiddleware");
const adminRouter = express_1.default.Router();
adminRouter.post("/api/admin/login", authController_1.default.adminChecking);
adminRouter.post("/api/admin/Users", AdminMiddleware_1.adminAuth, dashBoardController_1.default.usersListing);
adminRouter.post("/api/admin/Vendors", AdminMiddleware_1.adminAuth, dashBoardController_1.default.vendorsListing);
adminRouter.put("/api/admin/block", AdminMiddleware_1.adminAuth, dashBoardController_1.default.blockorUnblock);
adminRouter.patch("/api/admin/blockUser", AdminMiddleware_1.adminAuth, dashBoardController_1.default.blockorUnblockUser);
adminRouter.post("/api/admin/addCategory", AdminMiddleware_1.adminAuth, dashBoardController_1.default.addCategory);
adminRouter.get("/api/admin/getCategory", AdminMiddleware_1.adminAuth, dashBoardController_1.default.getCategory);
adminRouter.patch("/api/admin/removeCategory", AdminMiddleware_1.adminAuth, dashBoardController_1.default.removeCategory);
adminRouter.get("/api/admin/request", AdminMiddleware_1.adminAuth, dashBoardController_1.default.listRequest);
adminRouter.post("/api/admin/rejectVendor", AdminMiddleware_1.adminAuth, dashBoardController_1.default.reject);
adminRouter.post("/api/admin/acceptVendor", AdminMiddleware_1.adminAuth, dashBoardController_1.default.accept);
adminRouter.get('/api/admin/dashboard', AdminMiddleware_1.adminAuth, dashBoardController_1.default.getDashboard);
adminRouter.get('/api/admin/cancelBookings', AdminMiddleware_1.adminAuth, dashBoardController_1.default.getBookings);
adminRouter.patch('/api/admin/refund/:bookingId', AdminMiddleware_1.adminAuth, dashBoardController_1.default.refundBooking);
adminRouter.get('/api/admin/bills', AdminMiddleware_1.adminAuth, dashBoardController_1.default.bills);
adminRouter.get('/api/admin/reports', AdminMiddleware_1.adminAuth, dashBoardController_1.default.reports);
adminRouter.put('/api/admin/blockVendor/:reportId/:vendorId', AdminMiddleware_1.adminAuth, dashBoardController_1.default.blockVenodr);
adminRouter.put('/api/admin/readReport/:reportId', AdminMiddleware_1.adminAuth, dashBoardController_1.default.readReport);
adminRouter.get('/api/admin/bookingCount', AdminMiddleware_1.adminAuth, dashBoardController_1.default.booking);
adminRouter.put('/api/admin/readBill/:billId', AdminMiddleware_1.adminAuth, dashBoardController_1.default.readBill);
exports.default = adminRouter;
