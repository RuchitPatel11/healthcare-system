const router = require("express").Router();
const medicineController = require("../controllers/medicine.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);

//Add Medicine
router.post("/", authorizeRole(["Admin"]), medicineController.addMedicine);

// Get All Medicines
router.get("/", authorizeRole(["Admin"]), medicineController.getMedicines);

//Get Medicine By ID
router.get("/:id", medicineController.getMedicineById);

// Update Medicine By ID
router.put("/update/:id", medicineController.updateMedicineById);

// Delete Medicine By ID
router.delete("/delete/:id", medicineController.deleteMedicineById);

module.exports = router;
