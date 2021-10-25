import ApiRepository, { FindAllRequestParams } from './api.repository'
import {
  CreateReleaseForm,
  PublishReleaseForm,
  UpdateReleaseForm,
} from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { ReleaseSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/release.serializer'
import { ReleasesSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/releases.serializer'

export class ReleasesRepository extends ApiRepository {
  findAll({ page, per }: FindAllRequestParams): Promise<ReleasesSerializer> {
    page = page || 1
    per = per || 20
    return this.get(`/releases`, { params: { page, per } })
  }

  findOne(id: number): Promise<ReleaseSerializer> {
    return this.get(`/releases/${id}`)
  }

  create(form: CreateReleaseForm): Promise<ReleaseSerializer> {
    return this.post(`/releases`, form)
  }

  update(form: UpdateReleaseForm): Promise<ReleaseSerializer> {
    const id = form.release.id
    return this.patch(`/releases/${id}`, form)
  }

  publish(form: PublishReleaseForm): Promise<ReleaseSerializer> {
    const id = form.release.id
    return this.patch(`/releases/${id}/publish`, form)
  }

  delete(id: number): Promise<void> {
    return this.del(`/releases/${id}`)
  }
}
