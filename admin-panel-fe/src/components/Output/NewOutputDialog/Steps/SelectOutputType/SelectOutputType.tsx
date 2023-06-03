import { Box } from '@mui/material';
import {
  NewOutputDialogState,
  OutputKind,
} from '../../../../../interfaces/Output/Output';
import OutputOption from './OutputOption';

interface SelectOutputTypeProps {
  currentState: NewOutputDialogState;
  onChange: (newState: NewOutputDialogState) => void;
}

const SelectOutputType = (props: SelectOutputTypeProps) => {
  const enabledOutputKinds = [OutputKind.PAGE];
  const disabledOutputKinds = [
    OutputKind.NOSQL_DATABASE,
    OutputKind.SQL_DATABASE,
    OutputKind.API_ENDPOINT,
    OutputKind.WEBHOOK,
    OutputKind.GOOGLE_SHEETS,
  ];

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyContent: 'center',
        pt: 1.5,
      }}
    >
      {enabledOutputKinds.map((outputKind) => (
        <OutputOption
          kind={outputKind}
          selected={props.currentState.kind === outputKind}
          onSelect={() =>
            props.onChange({
              ...props.currentState,
              kind: outputKind,
            })
          }
        />
      ))}
      {disabledOutputKinds.map((outputKind) => (
        <OutputOption kind={outputKind} disabled selected={false} />
      ))}
    </Box>
  );
};

export default SelectOutputType;
