import mongoose from 'mongoose'

const { Schema } = mongoose

export interface IPage {
  pageName: string
  detail: mongoose.Schema.Types.Mixed
}

export interface PageDocument extends IPage, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const PageSchema = new Schema<PageDocument>({
  pageName: { type: String, required: true },
  detail: { type: Schema.Types.Mixed, required: true },
})

PageSchema.index({ pageName: 1 })

const Page = mongoose.model<PageDocument>('Page', PageSchema)

export default Page
