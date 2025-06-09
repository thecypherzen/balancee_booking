import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api.js";
import type { PayloadAction } from "@reduxjs/toolkit";

// types
type StationsFilterType = {
  carType: string;
  services: string[];
  carMake: string;
};

type StationsStateType = {
  stations: StationsDataType | null;
  error: StateErrorType | null;
  filters: StationsFilterType | null;
  isLoading: boolean;
};

type StationsDataType = Array<Record<string, any>>;

type StateErrorType = {
  message: string;
  [key: string]: any;
};

// Stations slice
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
      state: StationsStateType,
      action: PayloadAction<StationsFilterType>,
    ) => {
      state.filters = action.payload;
    },
    setStations: (
      state: StationsStateType,
      action: PayloadAction<StationsDataType>,
    ) => {
      state.stations = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getStations.fulfilled,
        (state: StationsStateType, { payload }) => {
          state.stations = payload as StationsDataType;
          state.isLoading = false;
        },
      )
      .addCase(getStations.pending, (state: StationsStateType) => {
        state.isLoading = true;
      })
      .addCase(
        getStations.rejected,
        (state: StationsStateType, { payload }) => {
          state.stations = null;
          state.error = payload?.error;
          state.isLoading = false;
        },
      );
  },
});

// asynchronous handlers
// fetch service stations based on filters
const getStations = createAsyncThunk<
  Record<string, any>,
  StationsFilterType,
  { rejectValue: Record<string, any> }
>(
  "stations/filter",
  async (filters: StationsFilterType, { rejectWithValue }) => {
    const params = new URLSearchParams();
    filters.services.forEach((service) => params.append("services", service));
    params.append("carType", filters.carType);
    params.append("carMake", filters.carMake);
    try {
      const res = await api.get(`/stations?${params.toString()}`);
      console.log(res);
      return res?.data?.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue({
        error: {
          message:
            err?.response?.data?.error ?? err?.message ?? "Some Error occured",
          statusCode: err?.response?.status ?? 500,
        },
      });
    }
  },
);

const stationsSliceReducer = stationsSlice.reducer;

export { getStations, stationsSliceReducer };
export const { setFilters } = stationsSlice.actions;
export type {
  StationsDataType,
  StateErrorType,
  StationsFilterType,
  StationsStateType,
};
