import { AfterViewportJsOptions } from "./av-options";
import { AfterViewportJsItem } from "./av-item";
import { AfterViewportJsGroup } from "./av-group";
import { InViewport } from "./av-viewports";

import imagesLoaded from "imagesloaded";

export class AfterViewportJs {
  public items: AfterViewportJsItem[] = [];
  public options!: AfterViewportJsOptions;

  private groups: AfterViewportJsGroup[] = [];

  constructor(
    selector: string = "[data-av]",
    options?: AfterViewportJsOptions
  ) {
    let elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      /* the group name if present */
      let gName = element.getAttribute("data-av") ?? "";

      /* the sequence of the group */
      let gSequential = element.getAttribute("data-av-sequential") ?? false;
      gSequential = gSequential !== false ? true : false;

      /* if this group resets */
      let gResets = element.hasAttribute("data-av-resets") ? true : false;

      /* if this group animate only when totally in */
      let gOnlyWhenTotallyIn = element.hasAttribute(
        "data-av-only-when-totally-in"
      )
        ? true
        : false;

      let group: AfterViewportJsGroup = {
        name: gName,
        sequential: gSequential,
        resets: gResets,
        onlyWhenTotallyIn: gOnlyWhenTotallyIn,
      };

      if (
        group.name &&
        !this.groups.find((g: AfterViewportJsGroup) => g.name == group.name)
      ) {
        this.groups.push(group);
      }

      let defaultDuration = "300";
      let latestAddedItemDuration =
        this.items.length > 0
          ? this.items[this.items.length - 1].duration
          : "0";

      /* the element animation */
      let eAnimation = element.getAttribute("data-av-animation") ?? "fade";
      /* the element animation duration */
      let eDuration =
        element.getAttribute("data-av-animation-duration") ?? defaultDuration;
      /* the element animation delay */
      let eDelay = element.getAttribute("data-av-animation-delay") ?? false;
      eDelay = eDelay ? eDelay : latestAddedItemDuration;

      this.items.push({
        element: element,
        group: group,
        animation: eAnimation,
        duration: eDuration,
        delay: eDelay,
      });

      console.log(this.items);
    });

    this.startBooting();

    window.addEventListener("load", () => {
      imagesLoaded("body", { background: true }, () => {
        this.init();
        this.addListeners();

        this.finishBooting();
      });
    });

    return this;
  }

  private startBooting(): void {
    document.querySelector("body")?.setAttribute("style", "opacity:0");
  }

  private finishBooting(): void {
    document.querySelector("body")?.setAttribute("style", "");
  }

  private getItemsInGroup(group: AfterViewportJsGroup): AfterViewportJsItem[] {
    let items = this.items.filter((i: AfterViewportJsItem) => {
      return i.group.name == group.name;
    });
    return items;
  }

  private isInViewport(item: AfterViewportJsItem): InViewport {
    const inner = item.element.getBoundingClientRect();

    const outer = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0,
    };

    // If the inner if inside the outer, just partially
    if (
      inner.bottom >= outer.top &&
      inner.right >= outer.left &&
      inner.top <= outer.bottom &&
      inner.left <= outer.right
    ) {
      // If the inner if inside the outer totally
      if (
        inner.top >= outer.top &&
        inner.left >= outer.left &&
        inner.bottom <= outer.bottom &&
        inner.right <= outer.right
      ) {
        return InViewport.In;
      }
      return InViewport.Partial;
    }
    return InViewport.Out;
  }

  protected init(): void {
    this.items.forEach((item) => {
      switch (item.animation) {
        case "fade":
          this.elAddWrapper(item);
          item.wrapper?.setAttribute(
            "class",
            `av-animation av-animation--fade av-animation-duration av-animation-duration--${item.duration} av-animation-delay`
          );
          break;

        default:
          break;
      }
    });
  }

  private listenersCallback(): void {
    this.items.forEach((item: AfterViewportJsItem) => {
      /* if the item is to be animated (in viewport, totally o partially) */
      if (
        this.isInViewport(item) == InViewport.In ||
        (!item.group.onlyWhenTotallyIn &&
          this.isInViewport(item) == InViewport.Partial)
      ) {
        /* if the group is sequential */
        if (item.group.sequential) {
          let groupItems = this.getItemsInGroup(item.group);
          let order = 0;
          groupItems.forEach((it) => {
            if (!it.wrapper?.classList.contains("av-ani-end")) {
              if (
                this.isInViewport(it) == InViewport.In ||
                (!it.group.onlyWhenTotallyIn &&
                  this.isInViewport(it) == InViewport.Partial)
              ) {
                it.wrapper?.classList.add(
                  "av-animation-delay--" + Number(it.delay) * order
                );
                it.wrapper?.classList.add("av-ani-end");
                order++;
              }
            }
          });
          /* if the group isn't sequential */
        } else {
          if (!item.wrapper?.classList.contains("av-ani-end")) {
            item.wrapper?.classList.add("av-ani-end");
          }
        }
        /* if the item is going out of the viewport i manage resets */
      } else {
        /* only if the group has the reset active */
        if (item.group.resets) {
          item.wrapper?.classList.remove("av-ani-end");
        }
      }
    });
  }

  private addListeners(): void {
    window.addEventListener(
      "scroll",
      () => {
        this.listenersCallback();
      },
      {
        passive: true,
      }
    );
    window.addEventListener(
      "resize",
      () => {
        this.listenersCallback();
      },
      {
        passive: true,
      }
    );
    window.dispatchEvent(new Event("resize"));
  }

  private elAddWrapper(item: AfterViewportJsItem): void {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "av-wrapper");
    item.element.insertAdjacentElement("afterend", wrapper);
    wrapper.appendChild(item.element);
    item.wrapper = wrapper;
  }
}
