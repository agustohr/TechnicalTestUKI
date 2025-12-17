const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

employeeSchema.set("toJSON", {
  transform: (_doc, ret) => {
    return {
      id: ret.id,
      name: ret.name,
      department: ret.department
    };
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
