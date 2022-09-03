const express = require("express");
// const userControllers = require("../../controllers/user.controller");
const userControllers = require("../controllers/user.controller");
// const limiter = require("../../middleware/limiter");
// const viewCount = require("../../middleware/veiwCount");

const router = express.Router();

router
  .route("/random")
  /**
   * @api {get} /random get a random user
   
   */
  .get(userControllers.getRandomUser);
router
  .route("/all")
  /**
   * @api {get} /random get all users
   
   */
  .get(userControllers.getAllUser);
router
  .route("/save")
  /**
   * @api {post} /save a user
   
   */
  .post(userControllers.saveAuser);
router
  .route("/update/:id")
  /**
   * @api {post} /update a user
   
   */
  .patch(userControllers.updateAuser);
router
  .route("/bulk-update")
  /**
   * @api {patch} /update multiple user
   
   */
  .patch(userControllers.updateMultipleUser);
router
  .route("/delete/:id")
  /**
   * @api {delete} /delete a user
   
   */
  .delete(userControllers.deleteUser);

// router.route("/all").get(userCon);
// router.route("/save").post();
// router.route("/update").patch();
// router.route("/bulk-update").patch();
// router.route("/delete").delete();

// router
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = router;
