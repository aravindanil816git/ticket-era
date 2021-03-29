import {BOARD_PROGRESS_COLUMNS} from './Constants';

const helper = {
    getColorByProgress: (progress) => {
        switch (progress) {
            case BOARD_PROGRESS_COLUMNS.IN_PROGRESS:
                return "orange";
            case BOARD_PROGRESS_COLUMNS.DONE:
                return "blue";
            case BOARD_PROGRESS_COLUMNS.COMPLETED:
                return "green";
            default:
                return "gray";
        }
    }
}
export default helper;