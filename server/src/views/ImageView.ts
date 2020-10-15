import ImagesModel from '../models/ImagesModel'

export default {
  render(image: ImagesModel) {
    return {
      id: image.id,
      url: `http://192.168.1.105:3333/uploads/${image.path}`
    }
  },

  renderMany(images: ImagesModel[]) {
    return images.map(image => this.render(image))
  }
}