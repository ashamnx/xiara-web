import { IControllerOptions } from "./IControllerOptions";
export declare function Controller(controllerOptions?: IControllerOptions): (target: any) => void;
export declare function ANY(path?: string, policies?: any[]): (target: any, name: string) => void;
export declare function GET(path?: string, policies?: any[]): (target: any, name: string) => void;
export declare function POST(path?: string, policies?: any[]): (target: any, name: string) => void;
export declare function PUT(path?: string, policies?: any[]): (target: any, name: string) => void;
export declare function DELETE(path?: string, policies?: any[]): (target: any, name: string) => void;
export declare function PATCH(path?: string, policies?: any[]): (target: any, name: string) => void;
