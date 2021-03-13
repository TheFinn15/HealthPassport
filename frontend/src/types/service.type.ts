import {ResultType} from "@/types/result.type";
import {UserType} from "@/types/user.type";
import {CapsType} from "@/types/caps.type";

export type ServiceType = {
  id: number
  name: number
  type: string
  resultSurvey: ResultType[]
  info: string
  partner: object
  user: UserType,
  userCaps: CapsType[]
}
