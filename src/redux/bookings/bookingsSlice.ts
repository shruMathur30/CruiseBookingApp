import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "Up Coming" | "In Draft" | "Completed" | "Canceled";
  image: string;
}

interface BookingsState {
  list: Booking[];
}

const initialState: BookingsState = {
  list: [
    {
      id: "#BI02145632",
      title: "Step Into Merlion Cruise",
      date: "23 April 2025, 05:00PM",
      location: "Dubai - Abu Dhabi",
      status: "Up Coming",
      image: "UpcomingImg.png",
    },
    {
      id: "2",
      title: "Step Into Merlion Cruise",
      date: "23 April 2025, 05:00PM",
      location: "Dubai - Abu Dhabi",
      status: "In Draft",
      image: "DraftImg.png",
    },
    {
       id: "#BI02145633",
      title: "Step Into Merlion Cruise",
      date: "23 April 2025, 05:00PM",
      location: "Dubai - Abu Dhabi",
      status: "Completed",
      image: "CompletedImg.png",
    },
    {
       id: "#BI02145634",
      title: "Step Into Merlion Cruise",
      date: "23 April 2025, 05:00PM",
      location: "Dubai - Abu Dhabi",
      status: "Canceled",
      image: "CanceledImg.png",
    }
  ],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: Booking["status"] }>) => {
      const booking = state.list.find((b) => b.id === action.payload.id);
      if (booking) booking.status = action.payload.status;
    },
  },
});

export const { updateBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
