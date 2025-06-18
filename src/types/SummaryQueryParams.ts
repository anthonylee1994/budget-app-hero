import {Period} from "./Period";

export interface SummaryQueryParams {
    period: Period;
    date?: string; // YYYY-MM-DD format, optional
}
