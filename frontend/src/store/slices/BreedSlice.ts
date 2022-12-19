import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getImages } from "../../api/api";

export const getRandomImages = createAsyncThunk(
  "getRandomImages/fetchTableData",
  async (_, { getState, rejectWithValue }) => {
    const { combinations } = getState() as any;
    try {
      return await getImages(combinations.combinations);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const breedSlice = createSlice({
  name: "breed",
  initialState: {
    breedDogs: [],
    loading: false,
    error: null,
    combinations: [
      {
        breed: "",
        subBreed: "",
        imageCount: "1",
      },
    ],
    images: [],
  },
  reducers: {
    setAllBreed(state, action) {
      state.breedDogs = action.payload;
    },
    setCombination(state, action) {
      const { id, breed, subBreed, imageCount } = action.payload;

      state.combinations[id] = {
        ...state.combinations[id],
        breed: breed ? breed : state.combinations[id].breed,
        subBreed:
          subBreed || breed ? subBreed : state.combinations[id].subBreed,
        imageCount: imageCount ? imageCount : state.combinations[id].imageCount,
      };
    },
    addRowField(state) {
      state.combinations.push({
        breed: "",
        subBreed: "",
        imageCount: "1",
      });
    },
  },
  extraReducers: {
    [getRandomImages.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getRandomImages.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    [getRandomImages.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setAllBreed, setCombination, addRowField } = breedSlice.actions;
export default breedSlice.reducer;
