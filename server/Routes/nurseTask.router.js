const router = require("express").Router();
const taskController = require("../controllers/nurseTask.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);
//Add NurseTask
router.post("/", authorizeRole(["Doctor"]), taskController.addTask);

// Get All NurseTasks
router.get("/", authorizeRole(["Nurse"]), taskController.getTasks);

//Get NurseTask By ID
router.get("/:id", taskController.getTaskById);

// Update NurseTask By ID
router.put("/:id", authorizeRole(["Nurse"]), taskController.updateTaskById);

// Delete NurseTask By ID
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
