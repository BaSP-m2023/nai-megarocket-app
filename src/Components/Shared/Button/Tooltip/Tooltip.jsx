import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export function DeleteTooltip({ testId }) {
  return (
    <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon id={testId} sx={{ width: '18px', height: '18px' }} />
      </IconButton>
    </Tooltip>
  );
}

export function EditTooltip({ testId }) {
  return (
    <Tooltip title="Edit">
      <IconButton>
        <EditIcon id={testId} sx={{ width: '18px', height: '18px' }} />
      </IconButton>
    </Tooltip>
  );
}
