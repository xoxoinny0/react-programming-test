import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** Ajax 처리를 위한 메들웨어 함수 정의 */
export const getCovid = createAsyncThunk(
  "Covid19Slice/getCovid",
  async (payload, { rejectWithValue }) => {
    let result = null;
    const URL = `covid19?date_gte=${payload.gte}&date_lte=${payload.lte}`;
    // const URL = 'covid19?date_gte=2022-05-10&date_lte=2022-05-15'

    try {
      const response = await axios.get(URL);
      result = response.data;
      console.log(result);
    } catch (err) {
      result = rejectWithValue(err.response);
    }

    return result;
  }
);

const Covid19Slice = createSlice({
  name: "Covid19Slice",
  // 이 모듈이 관리하고자하는 상태값들을 명시
  initialState: {
    data: null,
    loading: false,
    error: null,
    gte: '2022-05-01',
    lte: '2022-05-05',
  },
  reducers: {
    setGte: (state, action) => {
      state.gte = action.payload.gte;
    },
    setLte: (state, action) => {
      state.lte = action.payload.lte;
    },
  },
  extraReducers: {
    [getCovid.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getCovid.fulfilled]: (state, { payload, meta }) => {
      return {
        data: payload,
        loading: false,
        error: null,
        gte: meta.arg.gte,
        lte: meta.arg.lte,
      };
    },
    [getCovid.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Errror",
        },
      };
    },
  },
});

export const { setGte, setLte } = Covid19Slice.actions;

export default Covid19Slice.reducer;
