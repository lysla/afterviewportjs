import { AfterViewportJsOptions } from "./av-options";
export declare class AfterViewportJs {
    options: AfterViewportJsOptions;
    private groups;
    constructor(selector?: string, options?: AfterViewportJsOptions);
    private startBooting;
    private finishBooting;
    private isInViewport;
    protected init(): void;
    private listenersCallback;
    private addListeners;
    private elAddWrapper;
}
