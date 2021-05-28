export class Alert {
    id: string | undefined;
    type: AlertType;
    message: string | undefined;
    autoClose: boolean | undefined;
    keepAfterRouteChange: boolean | undefined;
    fade: boolean | undefined;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
        this.type = AlertType.Error;
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}