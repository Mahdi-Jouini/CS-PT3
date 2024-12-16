import { useState } from 'react';
import { Box, Fade, IconButton } from '@mui/material';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';

export default function MessageBox({ open }) {
    
  const [collapsed, setCollapsed] = useState();
  const [isOpen, setIsOpen] = useState(open);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };
  const onClose = () => {
    setIsOpen(false);
  };
    console.log(isOpen);
    
    if (!isOpen) return null;
    return (
    <Box>
        <Box sx={{
            width: 350,
            position: 'fixed',
            bottom: collapsed ? 10 : 400,
            right: 50,
            zIndex: 1001,
            bgcolor: 'blue'
        }}>
            <IconButton onClick={onClose} aria-label="delete" size="small">
                <FullscreenExitRoundedIcon/>
            </IconButton>
            <IconButton onClick={handleToggle} aria-label="delete" size="small">
            {collapsed ? <FullscreenExitRoundedIcon/> : < MinimizeRoundedIcon />}
            </IconButton>
        </Box>
      <Fade in={!collapsed} unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 50,
            zIndex: 1000,
            bgcolor: 'red',
            width: 350,
            height: 400,
          }}
        >
          {/* Add your content here */}
        </Box>
      </Fade>
    </Box>
  );
}
