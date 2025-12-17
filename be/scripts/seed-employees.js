require("dotenv").config();
const mongoose = require("mongoose");
const Employee = require("../src/models/Employee");

const seedData = [
  { id: "E01", name: "James Fowler", department: "Finance" },
  { id: "E02", name: "Jessica Simsons", department: "Technology" }
];

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI belum di-set di .env");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const shouldClear = process.argv.includes("--clear");

  if (shouldClear) {
    await Employee.deleteMany({});
    console.log("Cleared employees collection");
  }

  const ops = seedData.map((e) => ({
    updateOne: {
      filter: { id: e.id },
      update: { $set: e },
      upsert: true
    }
  }));

  const result = await Employee.bulkWrite(ops);
  console.log("Seed done:", {
    upserted: result.upsertedCount,
    modified: result.modifiedCount,
    matched: result.matchedCount
  });

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("Seed failed:", err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
