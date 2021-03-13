import {ServiceType} from "@/types/service.type";

export type PartnerType = {
  id: number
  name: string
  timeWork: string
  url: string
  about: string,
  services: ServiceType[]
}
