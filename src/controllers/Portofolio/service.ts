import BaseService from '@repositories/BaseService'
import Portofolio, { PortofolioDocument, IPortofolio } from '@models/portofolio'
import schema from './schema'

class PortofolioService extends BaseService<PortofolioDocument, IPortofolio> {
  constructor() {
    super(Portofolio, 'Portofolio', schema)
  }
}

export default PortofolioService
