import OrphanageModel from '../models/OrphanagesModel'
import ImagesView from './ImageView'

export default {
  render(orphanage: OrphanageModel) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: ImagesView.renderMany(orphanage.images)
    }
  },

  renderMany(orphanage: OrphanageModel[]) {
    return orphanage.map(orphanage => this.render(orphanage))
  }
}