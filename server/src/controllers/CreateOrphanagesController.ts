import { Request, Response } from "express";
import {getRepository} from 'typeorm'
import orphanageView from '../views/OrphanagesView'
import * as Yup from 'yup'

import OrphanageModel from '../models/OrphanagesModel'

export default class CreateOrphanagesController {
  async index (request: Request, response: Response) {
    const orphanageRepository = getRepository(OrphanageModel)

    const orphanages = await orphanageRepository.find({
      relations: ['images']
    })

    return response.json(orphanageView.renderMany(orphanages))
  };

  async show (request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(OrphanageModel)

    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return response.json(orphanageView.render(orphanage))
  };


  async create(request: Request, response: Response) {
    const {
      name,
      longitude,
      latitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
    const ImageRequest = request.files as Express.Multer.File[];

    const orphanageRepository = getRepository(OrphanageModel)

    const images = ImageRequest.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      longitude,
      latitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      longitude: Yup.number().required(),
      latitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    })

    schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanageRepository.create(data)

    await orphanageRepository.save(orphanage)

    return response.status(201).json(orphanage)
  }
}