import { AfterViewportJsOptionsItem } from "./av-options-item";
export type AfterViewportJsOptions = Partial<AfterViewportJsOptionsInterface>;
interface AfterViewportJsOptionsInterface {
    group?: string;
    sequential?: boolean;
    resets?: boolean;
    onlyWhenTotallyIn?: boolean;
    animation?: string;
    duration?: string;
    delay?: string;
    optionsItem?: Array<AfterViewportJsOptionsItem>;
}
export {};
