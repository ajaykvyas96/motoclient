export interface ConfirmDialogModel {
    title: string,
    content: string,
    result?: boolean,
    fn? : Function
}