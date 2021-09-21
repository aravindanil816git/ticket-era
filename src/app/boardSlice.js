import { createSlice } from '@reduxjs/toolkit';
import { BOARD_PROGRESS_COLUMNS , TICKET_DONE_REASONS} from '../lib/Constants';
import helper from '../lib/Helper';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        value: helper.getStorageData("t2d_tasks") || [],
    },
    reducers: {
        addNewTicket: (state, action) => {
            const tickets = [...state.value, action.payload]
            state.value = tickets;
            helper.setStorageData("t2d_tasks", tickets)
        },
        updateTicketStatus: (state, action) => {
            debugger;
            const tickets = [...state.value];
            const index = tickets.findIndex(tkt => tkt.id === action.payload.id);

            if (action.payload.title && action.payload.title !== tickets[index].title){
                tickets[index].title = action.payload.title;
            }

            if (action.payload.description && action.payload.description !== tickets[index].description){
                tickets[index].description = action.payload.description;
            }


            if (action.payload.progress && action.payload.progress !== tickets[index].progress){
                tickets[index].progress = action.payload.progress
                if (action.payload.progress === BOARD_PROGRESS_COLUMNS.DONE.value) {
                    tickets[index].endDate = Date.now();
                    tickets[index].closeReason = action.payload.closeReason;
                }
                if (action.payload.progress === BOARD_PROGRESS_COLUMNS.COMPLETED.value) {
                    tickets[index].endDate = Date.now();
                    tickets[index].closeReason = TICKET_DONE_REASONS.COMPLETED;
                }
            }
            console.log(tickets);
            state.value = tickets;
            helper.setStorageData("t2d_tasks", tickets)
        },
        updateCompletionTime: (state, action) => {
            debugger;
            const tickets = [...state.value];
            const index = tickets.findIndex(tkt => tkt.id === action.payload.id)
            tickets[index].completionDate = Date.now();
            tickets[index].progress = BOARD_PROGRESS_COLUMNS.COMPLETED.value;
            tickets[index].closeReason = action.payload.closeReason;
            state.value = tickets;
            helper.setStorageData("t2d_tasks", tickets)
        },
    },
});

export const { addNewTicket, updateTicketStatus, updateCompletionTime } = boardSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBoard = state => state.board.value;

export default boardSlice.reducer;

/*
[{
            id: "tkt_567",
            title: "Prod Bug",
            progress: "NOT STARTED",
            description: "Fix the production Bug",
            startDate: Date.now(),
            endDate: "",
            closeReason:""
        },
        {
            id: "tkt_750",
            title: "Staging Bug",
            progress: "IN PROGRESS",
            description: "Fix the staging Bug",
            startDate: Date.now(),
            endDate: "",
            closeReason:""
        }]
*/