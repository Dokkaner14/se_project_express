const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
    const User = require("../models/user");
    const dups = await User.aggregate([
      { $group: { _id: "$email", count: { $sum: 1 }, ids: { $push: "$_id" } } },
      { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
    ]);
    for (const d of dups) {
      const idsToRemove = d.ids.slice(1);
      await User.deleteMany({ _id: { $in: idsToRemove } });
      console.log("removed duplicates for", d._id, idsToRemove.length);
    }
    await User.createIndexes();
    console.log("indexes created");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
