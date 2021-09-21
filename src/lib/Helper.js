import {BOARD_PROGRESS_COLUMNS} from './Constants';

const helper = {
    getColorByProgress: (progress) => {
        switch (progress) {
            case BOARD_PROGRESS_COLUMNS.IN_PROGRESS.value:
                return "warning";
            case BOARD_PROGRESS_COLUMNS.DONE.value:
                return "processing";
            case BOARD_PROGRESS_COLUMNS.COMPLETED.value:
                return "success";
            default:
                return "default";
        }
    },
    setDelay: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    renderDateString: (dateUTCStr) => {
        const newDate = new Date(dateUTCStr);
        return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    },
    setStorageData: (key, value) => {
        // if(localStorage.getItem(key)) {
        //     var exstValue = localStorage.getItem(key);
        //     value = value;
        // }
        localStorage.setItem(key,JSON.stringify(value));
    },
    getStorageData: (key) => {
       return JSON.parse(localStorage.getItem(key));
    }
}
export default helper;