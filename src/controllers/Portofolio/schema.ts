import yup, { SchemaOf } from "yup";

import { IPortofolio } from "@models/portofolio";
import wording from '@utils/wording'

const create: SchemaOf<IPortofolio> = yup
  .object({
    name: yup.string().required(wording.required('name')),
    description: yup.string().required(wording.required('description')),
    type: yup.string().required(wording.required('type')),
    image: yup.string().required(wording.required('image'))
  })
  .required();



export default {
  create,
};
