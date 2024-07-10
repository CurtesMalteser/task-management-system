import { API_CONFIG } from "../config/apiConfig";

const URL = {
    TASKS: `${API_CONFIG.BASE_URL}/tasks`,
    TASK_BY_ID: `${API_CONFIG.BASE_URL}/task/:id`,
    TASK: `${API_CONFIG.BASE_URL}/task`,
};

export default URL;