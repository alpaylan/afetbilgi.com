import { Box, Paper, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { pipelineStages as pipelineStagesAtom } from '../../atoms/Pipeline';
import { Action } from '../../interfaces/Action';
import { getPipelineStages } from '../../services/Pipeline';
import { getAllowedActions } from '../../util/Action';
import { getTokenPayload } from '../../util/Auth';
import { commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import Waiting from '../Waiting';
import ProfileField from './ProfileField';

const ProfilePage = () => {
  const { t } = useTranslation();

  const [pipelineStages, setPipelineStages] =
    useRecoilState(pipelineStagesAtom);

  const [loadingPipelineStages, setLoadingPipelineStages] = useState(false);

  useEffect(() => {
    setLoadingPipelineStages(true);
    getPipelineStages()
      .then((stages) => setPipelineStages(stages))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingPipelineStages(false));
  }, []);

  const tokenPayload = getTokenPayload();

  const filteredPipelineStages = pipelineStages.filter((stage) =>
    tokenPayload.authorizedPipelineStages.includes(stage.id),
  );

  const allowedActions = getAllowedActions();
  const disallowedActions = Object.keys(Action).filter(
    (action) =>
      action !== Action.ALL && !allowedActions.includes(action as Action),
  );

  const loading = loadingPipelineStages;

  return (
    <Box component='div'>
      <Waiting open={loading} />
      <Appbar />
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          paddingX: 6,
          paddingY: 3.5,
          mt: 0.1,
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography sx={commonStyles.h2}>{t('profile.title')}</Typography>
        </Box>
      </Paper>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <Typography sx={commonStyles.h3}>{tokenPayload.username}</Typography>
        <Typography sx={{ ...commonStyles.body1, mt: 1.25 }}>
          {tokenPayload.email}
        </Typography>
        <ProfileField
          fieldName={t('profile.roles')}
          value={
            isEmpty(tokenPayload.roles)
              ? '-'
              : tokenPayload.roles.map((role) => t(`role.${role}`)).join(', ')
          }
        />
        <ProfileField
          fieldName={t('profile.authorized_pipeline_stages')}
          value={
            isEmpty(filteredPipelineStages)
              ? '-'
              : filteredPipelineStages.map((stage) => stage.name).join(', ')
          }
        />
        <ProfileField
          fieldName={t('profile.authorized_actions')}
          value={
            isEmpty(allowedActions)
              ? '-'
              : allowedActions.map((action) => t(`action.${action}`)).join(', ')
          }
        />
        <ProfileField
          fieldName={t('profile.unauthorized_actions')}
          value={
            isEmpty(disallowedActions) || allowedActions.includes(Action.ALL)
              ? '-'
              : disallowedActions
                  .map((action) => t(`action.${action}`))
                  .join(', ')
          }
        />
      </Box>
    </Box>
  );
};

export default ProfilePage;
