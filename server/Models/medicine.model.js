const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const medicineSchema = new Schema(
  {
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    mfgBy: { type: String, required: true },
    sideEffects: { type: String },
  },
  { timestamps: true }
);

medicineSchema.index({ name: 1, dosage: 1, mfgBy: 1 }, { unique: true });

module.exports.validateMedicine = (medicine) => {
  const schema = Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        dosage: Joi.string().required(),
        mfgBy: Joi.string().required(),
        sideEffects: Joi.string(),
      })
    )
    .required()
    .min(1);
  return schema.validate(medicine);
};

module.exports.validateMedicineUpdate = (medicine) => {
  const schema = Joi.object({
    name: Joi.string(),
    dosage: Joi.string(),
    mfgBy: Joi.string(),
    sideEffects: Joi.string(),
  });
  return schema.validate(medicine);
};

module.exports.Medicine = mongoose.model("Medicine", medicineSchema);
