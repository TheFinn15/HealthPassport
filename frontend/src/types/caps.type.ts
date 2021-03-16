import { CapLevelType } from "@/types/capLevel.type";
import { ServiceType } from "@/types/service.type";

export type CapsType = {
  id: number;
  userId: number;
  name: string;
  info: string;
  hazardLevel: CapLevelType;
  ill: ServiceType;
};
