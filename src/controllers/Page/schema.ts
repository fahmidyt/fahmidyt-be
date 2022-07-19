import * as yup from 'yup'

import { IPage } from '@models/page'
import wording from '@utils/wording'

const create: yup.SchemaOf<IPage> = yup
  .object()
  .shape({
    pageName: yup.string().required(wording.required('pageName')),
    detail: yup.object().required(wording.required('detail')),
  })
  .required()

const update: yup.SchemaOf<Partial<IPage>> = yup
  .object()
  .shape({
    pageName: yup.string(),
    detail: yup.string(),
  })
  .required()

export default {
  create,
  update,
}
