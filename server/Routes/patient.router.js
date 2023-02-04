const router = require("express").Router();
const patientController = require("../controllers/patient.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);
//Add Patient
router.post(
  "/",
  authorizeRole(["Nurse", "Admin"]),
  patientController.addPatient
);

// Get All Patients
router.get(
  "/",
  authorizeRole(["Doctor", "Admin"]),
  patientController.getPatients
);

//Get Patient By ID
router.get("/:id", patientController.getPatientById);

// Update Patient By ID
router.put(
  "/update/:id",
  authorizeRole(["Doctor", "Admin"]),
  patientController.updatePatientById
);

// Delete Patient By ID
router.delete("/delete/:id", patientController.deletePatientById);

module.exports = router;
