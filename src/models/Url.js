const { Schema, model } = require("mongoose");

const UrlSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  to: { type: String, required: true },
  visits: { type: Number, default: 0 },
});

module.exports = model("Url", UrlSchema);
