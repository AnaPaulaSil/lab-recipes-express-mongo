const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* CAMPOS 
- name: String
- email: String
- favorites: [ObjectsId]
- dislikes: [ObjectsId]
*/

const clientSchema = new Schema({
  // TODO: write the schema
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  deslikes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

const ClientModel = mongoose.model("Client", clientSchema);

module.exports = ClientModel;
