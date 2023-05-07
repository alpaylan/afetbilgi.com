import { Box, DialogContent, FormControl } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { DropzoneArea } from 'react-mui-dropzone';
import { commonColors } from '../util/Style';

interface UploadCSVProps {
  setFile: (file: File) => void;
}

const UploadCSV = (props: UploadCSVProps) => {
  const classes = useStyles();

  const csvMimeTypes =
    '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, ' +
    'application/x-csv, text/comma-separated-values, text/x-comma-separated-values';

  const handleFile = (file: File[]) => {
    props.setFile(file[0]);
  };

  return (
    <Box
      component='div'
      sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      <DialogContent>
        <FormControl
          component='fieldset'
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <DropzoneArea
            dropzoneClass={classes.dropzone}
            acceptedFiles={[csvMimeTypes]}
            filesLimit={1}
            showFileNames
            onChange={handleFile}
          />
        </FormControl>
      </DialogContent>
    </Box>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    dropzone: {
      position: 'relative',
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 24,
      minHeight: '100px',
      backgroundColor: commonColors.gray2,
      border: 'dashed',
      borderColor: commonColors.gray3,
      cursor: 'pointer',
    },
  }),
);

export default UploadCSV;
