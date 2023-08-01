// @mui
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Stack } from '@mui/material';
import { format } from 'date-fns';

// ----------------------------------------------------------------------

type Article = {
  __typename: 'Article';
  id: string;
  title: string;
  content: string;
  sourceUrl: string;
  speechUrl: string;
  userId: string;
  user: {
    __typename: 'User';
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  userArticlesId?: string | null;
};

type Props = {
  row: Article | null;
  selected: boolean;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  setOpenAudio: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

export default function ArticleTableRow({
  row,
  selected,
  setOpenAudio,
  setAudioUrl,
  setTitle,
  setContent,
}: Props) {
  const confirm = useBoolean();

  const popover = usePopover();

  const handleClick = () => {
    setAudioUrl(row?.speechUrl ?? '');
    setTitle(row?.title ?? '');
    setContent(row?.content ?? '');
    setOpenAudio(true);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Stack sx={{ p: 1 }}>
            <IconButton onClick={handleClick}>
              <Iconify icon="solar:play-broken" />
            </IconButton>
          </Stack>
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap variant="body2" href={row?.sourceUrl} sx={{ cursor: 'pointer' }}>
                <Typography variant="body2" noWrap>
                  {row?.title && row?.title.length > 30
                    ? `${row.title.slice(0, 30)}...`
                    : row?.title}
                </Typography>
              </Link>
            }
            secondary={
              <Typography variant="body2" noWrap>
                {format(new Date(row?.createdAt ?? ''), 'dd/MM/yyyy')}
              </Typography>
            }
          />
        </TableCell>

        <TableCell>
          {row?.content && row?.content.length > 80
            ? `${row.content.slice(0, 80)}...`
            : row?.content}
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:play-broken" />
          Play
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error">
            Delete
          </Button>
        }
      />
    </>
  );
}
