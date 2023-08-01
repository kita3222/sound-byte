// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//
import ReactAudioPlayer from 'react-audio-player';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { AudioDialogProps } from './types';

// ----------------------------------------------------------------------

export default function AudioDialog({
  title,
  content,
  url,
  open,
  onClose,
  ...other
}: AudioDialogProps) {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    async function f() {
      const response = await fetch(url);
      if (response.status === 403) {
        setIsValid(false);
      }
    }

    f();
  }, [url]);

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent sx={{ typography: 'body2' }}>
        <Stack spacing={3}>
          {content && content}
          {isValid ? (
            <ReactAudioPlayer src={url} autoPlay controls />
          ) : (
            <Alert severity="error">The time period for accessing the audio has passed.</Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
