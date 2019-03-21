import { User } from './user.model';
import { Hospital } from './hospital.model';

export class Doctor {
  constructor(
    public name?: string,
    public img?: string,
    public user?: User,
    public hospital?: Hospital,
    public _id?: string
  ) { }
}
