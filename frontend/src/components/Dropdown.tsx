import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import { getBreedsList } from "../api/api";
import CustomSelect from "./Select";
import { TextField, Button, useTheme } from "@mui/material";
import {
  addRowField,
  setAllBreed,
  setCombination,
} from "../store/slices/BreedSlice";
import { AppDispatch, RootState } from "../store/store";

export default function Dropdown({ id }: { id: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const allBreed = useSelector((state: RootState) => state.breed.breedDogs);
  const combinations = useSelector(
    (state: RootState) => state.breed.combinations
  );

  const theme = useTheme();

  const [breedList, setBreedList] = React.useState<string[] | []>([]);
  const [subBreedList, setSubBreedList] = React.useState<string[] | []>([]);

  function handleChangeBreed(event: SelectChangeEvent): void {
    dispatch(
      setCombination({ id, breed: event.target.value as string, subBreed: "" })
    );
    return;
  }
  const handleChangeSubBread = (event: SelectChangeEvent) => {
    dispatch(setCombination({ id, subBreed: event.target.value as string }));
  };
  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCombination({ id, imageCount: event.target.value as string }));
  };

  function addRow() {
    dispatch(addRowField());
  }

  React.useEffect(() => {
    getBreedsList().then((res: Object) => {
      console.log("res,", res);
      dispatch(setAllBreed(res));
      let keys = Object.keys(res);
      setBreedList(keys);
    });
  }, [dispatch]);

  React.useMemo(() => {
    if (combinations[id as number]["breed"].length > 0) {
      setSubBreedList(allBreed[combinations[id as number].breed]);
    }
  }, [combinations[id as number].breed]);

  console.log("dark", theme);

  return (
    <Box
      sx={{
        minWidth: 120,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        mb: 1,
      }}
    >
      <CustomSelect
        label={"Breed"}
        value={combinations[id].breed}
        handleChange={handleChangeBreed}
        list={breedList}
        key={"Breed"}
      />
      <CustomSelect
        label={"Sub-breed"}
        value={combinations[id].subBreed}
        handleChange={handleChangeSubBread}
        list={subBreedList}
        key={"SubBreed"}
      />
      <TextField
        id="count"
        label="Image Count"
        type="number"
        value={combinations[id].imageCount}
        onChange={handleCount}
        inputProps={{
          min: 1,
          max: 50,
        }}
        sx={{
          ".Mui-focused": {
            color: "text.primary",
          },
        }}
      />
      {id === combinations.length - 1 && (
        <Button sx={{ m: 1, color: "text.primary" }} onClick={addRow}>
          +
        </Button>
      )}
    </Box>
  );
}
