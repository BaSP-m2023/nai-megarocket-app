import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;
const collapsedWidth = 60;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    marginTop: '9vh',
    backgroundColor: '#212121',
    color: 'white',
    width: collapsedWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    '&.expanded': {
      width: drawerWidth
    }
  }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  color: 'white',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem'
  },
  '&.active': {
    color: theme.palette.primary.main
  }
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.2rem'
  },
  '&.active': {
    color: theme.palette.primary.main
  }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&.active, &:hover': {
    backgroundColor: '#2196f3'
  },
  '&.active': {
    backgroundColor: 'transparent'
  }
}));
const Sidebar = ({ routes, rol }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <StyledDrawer
      variant="permanent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      PaperProps={{ className: expanded ? 'expanded' : '' }}
    >
      <List>
        {routes.map((route, index) => (
          <StyledListItem
            button
            component={NavLink}
            to={route.link}
            id={`sidebar-link-${rol}-${route.name.toLowerCase()}`}
            key={index}
          >
            <StyledListItemIcon
              classes={{ root: location.pathname === route.link ? 'active' : '' }}
            >
              {React.createElement(route.icon)}
            </StyledListItemIcon>
            <StyledListItemText
              classes={{ root: location.pathname === route.link ? 'active' : '' }}
              primary={route.name}
            />
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
