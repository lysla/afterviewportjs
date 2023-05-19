export type AfterViewportJsOptionsItem =
  Partial<AfterViewportJsOptionsItemInterface>;

interface AfterViewportJsOptionsItemInterface {
  animation?: string;
  duration?: string;
  delay?: string;
  sequentialOrder?: string;
  parallax?: any;
  inline?: boolean;
}
