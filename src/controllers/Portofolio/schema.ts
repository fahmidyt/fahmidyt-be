import * as yup from 'yup'

import { IPortofolio } from '@models/portofolio'
import wording from '@utils/wording'

const create: yup.SchemaOf<IPortofolio> = yup
  .object()
  .shape({
    name: yup.string().required(wording.required('name')),
    description: yup.string().required(wording.required('description')),
    type: yup.string().required(wording.required('type')),
    image: yup.string().required(wording.required('image')),
  })
  .required()

const update: yup.SchemaOf<Partial<IPortofolio>> = yup
  .object()
  .shape({
    name: yup.string(),
    description: yup.string(),
    image: yup.string(),
    type: yup.string(),
  })
  .required()

export default {
  create,
  update,
}
