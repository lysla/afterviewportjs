import { AfterViewportJsOptions } from "./av-options";
export declare class AfterViewportJs {
    options: AfterViewportJsOptions;
    private groups;
    private previousScrollTop;
    private currentScrollTop;
    constructor(selector?: string, options?: AfterViewportJsOptions);
    private isInViewport;
    protected init(): void;
    private listenersCallback;
    private addListeners;
    private elAddWrapper;
}
