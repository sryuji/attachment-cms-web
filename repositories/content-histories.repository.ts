import ApiRepository from './api.repository'
import { ContentHistoriesSerializer } from '~/types/attachment-cms-server/app/content-histories/serializer/content-histories.serializer'
import { ContentHistorySerializer } from '~/types/attachment-cms-server/app/content-histories/serializer/content-history.serializer'
import { UpdateContentHistoryForm } from '~/types/attachment-cms-server/app/content-histories/dto/update-content-history.dto'
import { CreateContentHistoryForm } from '~/types/attachment-cms-server/app/content-histories/dto/create-content-history.dto'
import { ClientValidationError } from '~/utils/errors'

export class ContentHistoriesRepository extends ApiRepository {
  findAll({
    releaseId,
    page = 1,
    per = 20,
  }: {
    releaseId: number
    page: number
    per: number
  }): Promise<ContentHistoriesSerializer> {
    return this.get(`/content-histories`, { params: { releaseId, page, per } })
  }

  findOne(id: number): Promise<ContentHistorySerializer> {
    if (!id) throw new ClientValidationError({ message: 'Need id' })
    return this.get(`/content-histories/${id}`)
  }

  create(form: CreateContentHistoryForm): Promise<ContentHistorySerializer> {
    return this.post(`/content-histories`, form)
  }

  update(form: UpdateContentHistoryForm): Promise<ContentHistorySerializer> {
    const id = form.contentHistory.id
    if (!id) throw new Error('Need id')
    return this.patch(`/content-histories/${id}`, form)
  }

  delete(id: number): Promise<void> {
    if (!id) throw new Error('Need id')
    return this.del(`/content-histories/${id}`)
  }
}
