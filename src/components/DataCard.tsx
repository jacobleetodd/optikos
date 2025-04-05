import { Chip, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { SampleDataItem } from '../types';
import { DataNullState } from './DataNullState';
import { getLastTextField } from '../utilities';

export interface PrivacyDeclarations {
  showCategories: boolean;
  showSubjects: boolean;
  showUse: boolean;
}

interface DataCardProps {
  data: SampleDataItem[];
  showPrivacyDeclarations: PrivacyDeclarations;
}

export const DataCard: FC<DataCardProps> = ({ data }) => (
  <Stack>
    {data.length === 0 && <DataNullState />}
    {data.length > 0 &&
      data.map((item) => (
        <Stack
          alignItems="center"
          border="1px solid #ccc"
          borderRadius={2}
          key={item.fides_key as string}
          marginBottom={2}
          padding={4}
          spacing={1}
        >
          <Typography variant="h6">{item.name}</Typography>
          <Stack alignItems="center" spacing={2} width="100%">
            {item.privacy_declarations.length === 0 && <DataNullState />}
            {item.privacy_declarations.length > 0 &&
              item.privacy_declarations.map((privacyDeclaration) => (
                <Stack
                  border="1px solid #ccc"
                  borderRadius={2}
                  p={1}
                  spacing={1}
                  width="100%"
                >
                  <Typography>{privacyDeclaration.name}</Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    rowGap={2}
                  >
                    {privacyDeclaration.data_categories.length === 0 &&
                      privacyDeclaration.data_subjects.length === 0 &&
                      !privacyDeclaration.data_use && <DataNullState />}
                    {privacyDeclaration.data_categories.length > 0 &&
                      privacyDeclaration.data_categories.map((dataCategory) => (
                        <Chip
                          color="primary"
                          label={getLastTextField(dataCategory)}
                          sx={{ marginX: 0.5 }}
                        />
                      ))}
                    {privacyDeclaration.data_subjects.length > 0 &&
                      privacyDeclaration.data_subjects.map((dataSubject) => (
                        <Chip
                          color="secondary"
                          label={getLastTextField(dataSubject)}
                          sx={{ marginX: 0.5 }}
                        />
                      ))}
                    {!!privacyDeclaration.data_use && (
                      <Chip
                        color="warning"
                        label={getLastTextField(privacyDeclaration.data_use)}
                        sx={{ marginX: 0.5 }}
                      />
                    )}
                  </Stack>
                </Stack>
              ))}
          </Stack>
        </Stack>
      ))}
  </Stack>
);
