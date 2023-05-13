import { Box, Typography } from '@mui/material';
import { commonColors, commonStyles } from '../../util/Style';

interface ProfileFieldProps {
  fieldName: string;
  value: string;
}

const ProfileField = (props: ProfileFieldProps) => {
  return (
    <Box
      component='div'
      sx={{ display: 'flex', flexDirection: 'row', marginTop: 1.25 }}
    >
      <Typography
        sx={{
          ...commonStyles.body1,
          color: commonColors.gray5,
          marginRight: 0.5,
        }}
      >
        {`${props.fieldName}: `}
      </Typography>
      <Typography sx={commonStyles.body1}>{props.value}</Typography>
    </Box>
  );
};

export default ProfileField;
