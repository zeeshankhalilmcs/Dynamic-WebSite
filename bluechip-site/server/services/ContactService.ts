import { IInquiryRepository, Inquiry } from '../repositories/InquiryRepository'

export class ContactService {
  repo: IInquiryRepository
  constructor(repo: IInquiryRepository){
    this.repo = repo
  }

  async createInquiry(data: Inquiry){
    // business rules / validation should be applied before calling this
    const result = await this.repo.create(data)
    return result
  }
}
