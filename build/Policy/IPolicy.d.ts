export interface IPolicy {
    verify(req: any, res: any, next: any): any;
}
