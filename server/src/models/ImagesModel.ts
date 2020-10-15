import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'

import OrphanageModels from './OrphanagesModel'

@Entity('images')
export default class Orphange {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => OrphanageModels, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id'})
  orphanage: OrphanageModels;
}