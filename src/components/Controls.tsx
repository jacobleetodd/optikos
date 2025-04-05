import { FormControlLabel, Stack, Switch, TextField } from '@mui/material';
import { FC } from 'react';
import { PrivacyDeclarations } from './DataCard';

interface ControlsProps {
  handleSearchChange: (value: string) => void;
  handlePrivacyDeclarationsChanges: (key: keyof PrivacyDeclarations) => void;
  searchValue: string;
  showPrivacyDeclarations: PrivacyDeclarations;
}

export const Controls: FC<ControlsProps> = ({
  handleSearchChange,
  handlePrivacyDeclarationsChanges,
  searchValue,
  showPrivacyDeclarations,
}) => {
  return (
    <Stack
      border="1px solid #ccc"
      borderRadius={2}
      direction="row"
      padding={2}
      spacing={2}
    >
      <FormControlLabel
        control={
          <Switch
            checked={showPrivacyDeclarations.showCategories}
            color="primary"
            onChange={() => handlePrivacyDeclarationsChanges('showCategories')}
          />
        }
        label="Categories"
      />
      <FormControlLabel
        control={
          <Switch
            checked={showPrivacyDeclarations.showSubjects}
            color="secondary"
            onChange={() => handlePrivacyDeclarationsChanges('showSubjects')}
          />
        }
        label="Subjects"
      />
      <FormControlLabel
        control={
          <Switch
            checked={showPrivacyDeclarations.showUse}
            color="warning"
            onChange={() => handlePrivacyDeclarationsChanges('showUse')}
          />
        }
        label="Use"
      />
      <TextField
        fullWidth
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Filter by privacy declaration name..."
        size="small"
        value={searchValue}
        variant="outlined"
      />
    </Stack>
  );
};
