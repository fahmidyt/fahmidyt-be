import mongoose from "mongoose";

const { Schema } = mongoose;

// model interface
export interface IPortofolio {
  name: string;
  type: string;
  image: string;
  description: string;
}

// model schema
const PortofolioSchema = new Schema<IPortofolio>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Portofolio = mongoose.model<IPortofolio>("Portofolio", PortofolioSchema);

export default Portofolio;
