const router = require("express").Router();
const taskController = require("../controllers/nurseTask.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);
// router.use(authorizeRole(["Admin"]));
//Add NurseTask
router.post("/", authorizeRole(["Doctor", "Admin"]), taskController.addTask);

// Get All NurseTasks
router.get("/", authorizeRole(["Nurse", "Admin"]), taskController.getTasks);

//Get NurseTask By ID
router.get("/:patientId", taskController.getTaskByPatientId);

// Update NurseTask By ID
router.put(
  "/update/:id",
  authorizeRole(["Nurse", "Admin"]),
  taskController.updateTaskById
);

// Delete NurseTask By ID
router.delete("/delete/:id", taskController.deleteTaskById);

module.exports = router;
