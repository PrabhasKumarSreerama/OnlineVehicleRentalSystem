const express = require("express");
const {
  addVehicle,
  getVehicles,
  fetchVehicleById,
  updateVehicle,
  deleteVehicle,
  changeAvailability,
} = require("../controllers/vehicleController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, isAdmin, addVehicle);
router.get("/", getVehicles);
router.get("/:id", fetchVehicleById);
router.put("/:id", verifyToken, isAdmin, updateVehicle);
router.delete("/:id", verifyToken, isAdmin, deleteVehicle);
router.patch("/:id/availability", verifyToken, isAdmin, changeAvailability);

module.exports = router;
