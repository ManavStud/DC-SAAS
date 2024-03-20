const Scan = require("../models/scans.js");
const AndroguardScan = require("../models/androguard-scans.js");

const getScans = (req, res, next) => {
  const domain = req.params.domain;
  const tool = req.params.tool;
  const id = req.params.id;
  Scan.find({ domain, tool, user_id: id })
    .then((scans) => {
      res.json(scans);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getAndroidScans = (req, res, next) => {
  const domain = req.params.domain;
  const tool = req.params.tool;
  const id = req.params.id;
  AndroguardScan.find({ domain, tool, user_id: id })
    .then((scans) => {
      res.json(scans);
    })
    .catch((err) => {
      res.send(err);
    });
};

const saveScan = async (tool, domain, result, user_id, input) => {
  // const { tool, domain, result, user_id, input } = props;
  // console.log(props);
  if (
    tool != "" &&
    domain != "" &&
    result != "" &&
    user_id != "" &&
    input != ""
  ) {
    try {
      const newScan = new Scan({
        user_id: user_id,
        domain: domain,
        tool: tool,
        result: result,
        input: input,
      });
      await newScan.save();
      return {
        status: "success",
        message: "Scan saved successfully!",
      };
    } catch (error) {
      console.log(error);
      return { status: "failed", message: "Unable to add the scan" };
    }
  } else {
    return {
      status: "failed",
      message: "All fields are mandatory!",
    };
  }
};
const createScan = async (req, res, next) => {
  const { tool, domain, result, user_id, input } = req.body;
  console.log(tool, domain, result, user_id, input);
  if (
    tool != "" &&
    domain != "" &&
    result != "" &&
    user_id != "" &&
    input != ""
  ) {
    try {
      const newScan = new AndroguardScan({
        user_id: user_id,
        domain: domain,
        tool: tool,
        result: result,
        input: input,
      });
      await newScan.save();
      return res.json({
        status: "success",
        message: "Scan saved successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ status: "failed", message: "Unable to add the scan" });
    }
  } else {
    return {
      status: "failed",
      message: "All fields are mandatory!",
    };
  }
};

const updateScan = (req, res, next) => {
  const scanId = req.params.id;
  Scan.findByIdAndUpdate(scanId, req.body, { new: true })
    .then((scan) => {
      if (!scan) {
        const error = new Error("Scan not found");
        error.status = 404;
        throw error;
      }
      res.json(scan);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteScan = (req, res, next) => {
  const scanId = req.params.id;
  User.findByIdAndDelete(scanId)
    .then((scan) => {
      if (!scan) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      res.json("User deleted");
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getScans,
  updateScan,
  deleteScan,
  saveScan,
  createScan,
  getAndroidScans,
};
