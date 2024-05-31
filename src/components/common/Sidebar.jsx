import React, { useEffect, useState } from 'react';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors } from '@mui/material';
import { images } from "../../assets";
import Animate from "./Animate";
import { Link, useLocation } from 'react-router-dom';

const menus = [
  {
    title: "Item Add",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "add_item"
  },
  {
    title: "Item List",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "item_list"
  }
];

const Sidebar = ({ sidebarWidth }) => {
  const location = useLocation();
  const [activeState, setActiveState] = useState("");

  useEffect(() => {
    // Set the activeState based on the current location pathname
    setActiveState(location.pathname.substring(1)); // Remove the leading slash
  }, [location.pathname]);

  const MenuItem = (props) => {
    return (
      <ListItem key={props.index} disableGutters disablePadding sx={{ py: 0.5 }}>
        <Link to={`/${props.item.state}`} style={{ textDecoration: 'none' }}>
          <ListItemButton sx={{
            borderRadius: "10px",
            width: "100%", // Set width to 100% for wider items
            bgcolor: props.isActive ? colors.blue[900]: "",
            color: props.isActive ? colors.common.white : "",
            "&:hover": {
              bgcolor: props.isActive ? colors.blue[600] : "",
              color: props.isActive ? colors.common.white : "",
            }
          }}>
            <ListItemIcon sx={{
              minWidth: "40px",
              color: props.isActive ? colors.common.white : ""
            }}>
              {props.item.icon}
            </ListItemIcon>
            <ListItemText primary={
              <Typography fontWeight={600} style={{ minWidth: "100px" }}>
                {props.item.title}
              </Typography>
            } />
          </ListItemButton>
        </Link>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none"
        },
        // Add background color here
        bgcolor: "#FAF2D3" // Replace "your-color-here" with your desired color
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Animate type="fade" delay={1}>
          <img src={images.logo} alt="logo" height={60} />
        </Animate>
      </Box>
      {/* logo */}

      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          elevation={0}
          square
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
          }}
        >
          {/* menu group */}
          <List>
            {menus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeState}
              />
            ))}
          </List>
          {/* menu group */}
        </Paper>
      </Animate>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 }
      }}
    >
      {/* large screen */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderWidth: 0,
            bgcolor: "transparent",
            "::-webkit-scrollbar": {
              display: "none"
            }
          }
        }}
        open
      >
        {drawer}
      </Drawer>
      {/* large screen */}
    </Box>
  );
};

export default Sidebar;