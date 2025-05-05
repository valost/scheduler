import styles from './TimePickDropdown.module.scss';
import { TextField, Box } from '@mui/material';
import { LocalizationProvider, TimePicker, TimeView } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type Props = {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  shouldDisableTime: (value: Dayjs, view: TimeView) => boolean;
  disabled?: boolean;
}

export const TimePickDropdown = ({
  label,
  value,
  onChange,
  shouldDisableTime,
  disabled = false,
}: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ borderRadius: '14px' }}>
        <TimePicker
          label={label}
          value={value}
          onChange={onChange}
          ampm={false}
          slots={{ textField: TextField }}
          disabled={disabled}
          shouldDisableTime={shouldDisableTime}
          slotProps={{
            textField: {
              sx: {
                '& .MuiInputBase-root': {
                  borderRadius: '14px',
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}