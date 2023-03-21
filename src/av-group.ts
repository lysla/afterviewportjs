export type AfterViewportJsGroup = AfterViewportJsGroupInterface;

interface AfterViewportJsGroupInterface {
  name: string;
  sequential: any;
  resets: boolean;
  onlyWhenTotallyIn: boolean;
}
