import { CapsType } from "@/types/caps.type";
import { AuthType } from "@/types/auth.type";
import { ResultType } from "@/types/result.type";
import { RoleType } from "@/types/role.type";
import { ServiceType } from "@/types/service.type";

export type UserType = {
  id: number;
  login: string;
  pwd: string;
  fullName: string;
  email: string;
  phone: string;
  caps: CapsType[];
  role: RoleType;
  auths: AuthType[];
  services: ServiceType[];
  resultsSurvey: ResultType[];
};
