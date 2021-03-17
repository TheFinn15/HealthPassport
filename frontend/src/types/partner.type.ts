import { ServiceType } from "@/types/service.type";
import {UserType} from "@/types/user.type";

export type PartnerType = {
  id: number
  name: string
  timeWork: string
  url: string
  about: string
  user: UserType
  services: ServiceType[]
};
