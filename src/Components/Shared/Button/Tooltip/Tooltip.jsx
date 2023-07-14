import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export function DeleteTooltip() {
  return (
    <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon sx={{ width: '18px', height: '18px' }} />
      </IconButton>
    </Tooltip>
  );
}

export function EditTooltip() {
  return (
    <Tooltip title="Edit">
      <IconButton>
        <EditIcon sx={{ width: '18px', height: '18px' }} />
      </IconButton>
    </Tooltip>
  );
}
