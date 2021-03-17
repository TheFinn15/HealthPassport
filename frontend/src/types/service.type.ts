import { ResultType } from "@/types/result.type";
import { UserType } from "@/types/user.type";
import { CapsType } from "@/types/caps.type";
import {PartnerType} from "@/types/partner.type";

export type ServiceType = {
  id: number;
  name: number;
  type: string;
  info: string;
  partner: PartnerType;
};
