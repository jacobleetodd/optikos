import './App.css';
import { getUniqueData, sanitizePrivacyData } from './utilities';
import { sample_data } from './sample_data';
import { Grid, Stack, Typography } from '@mui/material';
import { DataCard, PrivacyDeclarations } from './components/DataCard';
import { useState } from 'react';
import { NavigationMenu } from './components/NavigationMenu';
import { TreeChart } from './components/TreeChart';
import { Controls } from './components/Controls';

export type ViewType = 'home' | 'tree';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showPrivacyDeclarations, setShowPrivacyDeclarations] =
    useState<PrivacyDeclarations>({
      showCategories: true,
      showSubjects: true,
      showUse: true,
    });

  const [searchValue, setSearchValue] = useState<string>('');

  const uniqueData = getUniqueData(sample_data, 'fides_key');

  const filteredData = sanitizePrivacyData(
    uniqueData,
    showPrivacyDeclarations,
    searchValue
  );

  const handlePrivacyDeclarationsChanges = (key: keyof PrivacyDeclarations) => {
    setShowPrivacyDeclarations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Stack height="90vh" width="100%" spacing={2}>
      <NavigationMenu handleViewChange={(newView) => setCurrentView(newView)} />
      {currentView === 'home' && (
        <>
          <Controls
            handlePrivacyDeclarationsChanges={handlePrivacyDeclarationsChanges}
            handleSearchChange={handleSearchChange}
            searchValue={searchValue}
            showPrivacyDeclarations={showPrivacyDeclarations}
          />
          <Grid container spacing={4}>
            <Grid size={4}>
              <Typography variant="h4">Systems</Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="h4">Databases</Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="h4">Integrations</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ overflow: 'auto' }}>
            <Grid size={4}>
              <DataCard
                data={filteredData.filter(
                  (item) =>
                    item.system_type === 'Application' ||
                    item.system_type === 'Service'
                )}
                showPrivacyDeclarations={showPrivacyDeclarations}
              />
            </Grid>
            <Grid size={4}>
              <DataCard
                data={filteredData.filter(
                  (item) => item.system_type === 'Database'
                )}
                showPrivacyDeclarations={showPrivacyDeclarations}
              />
            </Grid>
            <Grid size={4}>
              <DataCard
                data={filteredData.filter(
                  (item) => item.system_type === 'Integration'
                )}
                showPrivacyDeclarations={showPrivacyDeclarations}
              />
            </Grid>
          </Grid>
        </>
      )}
      {currentView === 'tree' && (
        <Stack height="90%">
          <Typography variant="h4" marginBottom={2}>
            Tree View
          </Typography>
          <TreeChart data={sample_data} />
        </Stack>
      )}
    </Stack>
  );
}

export default App;
