import { AppBar, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { FC, MouseEvent, useState } from 'react';
import { ViewType } from '../App';
interface NavigationMenuProps {
  handleViewChange: (selection: ViewType) => void;
}
interface NavigationMenuProps {
  handleViewChange: (selection: ViewType) => void;
}

export const NavigationMenu: FC<NavigationMenuProps> = ({
  handleViewChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        color="transparent"
        position="static"
        sx={{ alignItems: 'start', boxShadow: 'none' }}
      >
        <IconButton
          aria-label="menu"
          edge="start"
          onClick={handleMenuOpen}
          size="large"
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        keepMounted
        onClose={handleMenuClose}
        open={isMenuOpen}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <MenuItem
          onClick={() => {
            handleViewChange('home');
            handleMenuClose();
          }}
        >
          Home View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleViewChange('tree');
            handleMenuClose();
          }}
        >
          Tree View
        </MenuItem>
      </Menu>
    </>
  );
};
