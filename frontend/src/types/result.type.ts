import {ServiceType} from "@/types/service.type";
import {UserType} from "@/types/user.type";

export type ResultType = {
  id: number;
  user: UserType
  survey: ServiceType;
  info: string;
  passingTime: string;
  readyTime: string;
  isSick: boolean;
};
