export interface FailureResponse<E extends string> {
    success: false;
    error: E;
}
