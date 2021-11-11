const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    DistrictList
  } = require("../controller/API/ListController");
  // Get district list
router.get("/Districtlist",[jwtauth], async (req, res) => {
    try {
      let item = await DistrictList(req);
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
  router.get("/Wardlist",[jwtauth], async (req, res) => {
    try {
      let item = await WardList(req);
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
  router.get("/Grouplist",[jwtauth], async (req, res) => {
    try {
      let item = await GroupList(req);
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
  router.get("/CustomerTypeList",[jwtauth], async (req, res) => {
    try {
      let item = await CustomerTypeList(req);
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
  router.get("/PackageList",[jwtauth], async (req, res) => {
    try {
      let item = await PackageList(req);
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
  router.get("/localbodyList", async (req, res) => {
    try {
      let item = await localbody(req);
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
  module.exports = router;