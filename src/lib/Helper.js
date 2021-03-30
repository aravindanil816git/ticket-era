import {BOARD_PROGRESS_COLUMNS} from './Constants';

const helper = {
    getColorByProgress: (progress) => {
        switch (progress) {
            case BOARD_PROGRESS_COLUMNS.IN_PROGRESS:
                return "warning";
            case BOARD_PROGRESS_COLUMNS.DONE:
                return "processing";
            case BOARD_PROGRESS_COLUMNS.COMPLETED:
                return "success";
            default:
                return "default";
        }
    },
    renderDateString: (dateUTCStr) => {
        const newDate = new Date(dateUTCStr);
        return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    }
}
export default helper;