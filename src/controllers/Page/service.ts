import BaseService from '@repositories/BaseService'
import Page, { PageDocument, IPage } from '@models/page'
import schema from './schema'

class PageService extends BaseService<PageDocument, IPage> {
  constructor() {
    super(Page, 'Page', schema)
  }
}

export default PageService
