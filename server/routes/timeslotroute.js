const express = require("express");
const router = express.Router();

const {
    createTimeslot,
    getTimeslotsList,
    getTimeslotData,
    updateTimeslot,
    deleteTimeslot,
    
} = require("../controller/timeslot/timeslot.controller");

//Create new category
router.post("/", async (req, res) => {
    
  try {
    let item = await createTimeslot(req);
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

//Get categories list
router.get("/list", async (req, res) => {
  try {
    let item = await getTimeslotsList(req);
    res.status(200).json({
      status: 200,
      data: item,
    
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

//Get category data
router.get("/:timeslot_id", async (req, res) => {
  try {
    let item = await getTimeslotData(req);
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

//Update category data
router.put("/:timeslot_id", async (req, res) => {
  try {
    let item = await updateTimeslot(req);
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});
//Delete category data
router.delete("/:timeslot_id", async (req, res) => {
  try {
    let item = await deleteTimeslot(req);
    res.status(200).json({
      status: 200,
      message: "Item deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;