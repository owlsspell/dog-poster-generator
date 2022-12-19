import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { stringToUpperCase } from "../helpers/stringToUpperCase";

export default function CustomSelect({
  label,
  value,
  handleChange,
  list,
}: {
  label: string;
  value: string;
  handleChange: (e: any) => void;
  list: string[] | [];
}) {
  return (
    <FormControl fullWidth>
      <InputLabel
        id={label}
        sx={{
          "&.Mui-focused": {
            color: "text.secondary",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="select-label"
        id="simple-select"
        value={value}
        label={label}
        onChange={handleChange}
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                backgroundColor: "background.hover",
              },
            },
          },
        }}
      >
        {list.length > 0 &&
          list.map((item: string) => {
            return (
              <MenuItem
                value={item}
                key={item}
                sx={{
                  backgroundColor: "background.default",
                  "&:focus,&:before,&:after,&:hover,&.Mui-selected": {
                    backgroundColor: "background.hover",
                  },
                }}
              >
                {stringToUpperCase(item)}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
