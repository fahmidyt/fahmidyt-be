import mongoose from 'mongoose'

const { Schema } = mongoose

// model interface
export interface IPortofolio {
  name: string
  type: string
  image: string
  description: string
}

export interface PortofolioDocument extends IPortofolio, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

// model schema
const PortofolioSchema = new Schema<PortofolioDocument>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
})

PortofolioSchema.index({ name: 1 })

const Portofolio = mongoose.model<PortofolioDocument>(
  'Portofolio',
  PortofolioSchema
)

export default Portofolio
