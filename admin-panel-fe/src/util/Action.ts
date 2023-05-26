import { flatten, uniq } from 'lodash';
import { Action } from '../interfaces/Action';
import { Role } from '../interfaces/Role';
import { getTokenPayload } from './Auth';

export const getAllowedActionsForRole = (role: Role): Action[] => {
  switch (role) {
    case Role.ADMIN:
      return [Action.ALL];
    case Role.TRANSLATOR:
      return [Action.TRANSLATE_ROWS];
    default:
      return [];
  }
};

export const getAllowedActions = (): Action[] => {
  const tokenPayload = getTokenPayload();

  return uniq(
    flatten(tokenPayload.roles.map((role) => getAllowedActionsForRole(role))),
  );
};

export const isAllowed = (action: Action): boolean => {
  const allowedActions = getAllowedActions();
  return allowedActions.includes(action) || allowedActions.includes(Action.ALL);
};
