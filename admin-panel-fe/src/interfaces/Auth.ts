import { Role } from './Role';

export interface TokenPayload {
  userID: string;
  username: string;
  email: string;
  authorizedPipelineStages: string[];
  roles: Role[];
}
