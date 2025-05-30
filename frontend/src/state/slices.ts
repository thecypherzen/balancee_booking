import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api.js";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/state/types.js";

// types
type StationsFilterType = {
  carType: string;
  services: string[];
  carMake: string;
};

type StationsState = {
  stations: StationsDataType | null;
  error: any | null;
  filters: StationsFilterType | null;
  isLoading: boolean;
};

type StationsDataType = Record<string, any>[];

// slice
const stationsSlice = createSlice({
  name: "stations",
  initialState: {
    stations: null,
    error: null,
    filters: null,
    isLoading: false,
  },
  reducers: {
    setFilters: (
      state: StationsState,
      action: PayloadAction<StationsFilterType>,
    ) => {
      state.filters = action.payload;
    },
    setStations: (
      state: StationsState,
      action: PayloadAction<Record<string, any>>,
    ) => {
      state.stations = action.payload as StationsDataType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStations.fulfilled, (state: StationsState, { payload }) => {
        state.stations = payload as Record<string, any>[];
        state.isLoading = false;
      })
      .addCase(getStations.pending, (state: StationsState) => {
        state.isLoading = true;
      })
      .addCase(getStations.rejected, (state: StationsState, { payload }) => {
        state.stations = null;
        state.error = payload;
        state.isLoading = false;
      });
  },
});

// asynchronous handlers
// fetch service stations based on filters
const getStations = createAsyncThunk<
  Record<string, any>,
  StationsFilterType,
  { rejectValue: Record<string, any>; dispatch: AppDispatch }
>(
  "stations/filter",
  async (filters: StationsFilterType, { rejectWithValue, dispatch }) => {
    const params = new URLSearchParams();
    filters.services.forEach((service) => params.append("services", service));
    params.append("carType", filters.carType);
    params.append("carMake", filters.carMake);
    try {
      const res = await api.get(`/stations?${params.toString()}`);
      console.log(res);
      dispatch(stationsSlice.actions.setStations(res?.data));
    } catch (err) {
      console.log(err);
      return rejectWithValue({ error: err });
    }
  },
);

const stationsSliceReducer = stationsSlice.reducer;

export { getStations, stationsSliceReducer };
export const { setFilters } = stationsSlice.actions;
