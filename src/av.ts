import { AfterViewportJsOptions } from "./av-options";
import { AfterViewportJsItem } from "./av-item";
import { AfterViewportJsGroup } from "./av-group";
import { InViewport } from "./av-viewports";

import imagesLoaded from "imagesloaded";

export class AfterViewportJs {
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

      /* creation of the groups array */
      let group: AfterViewportJsGroup = {
        name: gName,
        sequential: gSequential,
        resets: gResets,
        onlyWhenTotallyIn: gOnlyWhenTotallyIn,
        items: [],
      };

      if (
        !this.groups.find((g: AfterViewportJsGroup) => g.name == group.name)
      ) {
        this.groups.push(group);
      }
    });

    /* assignment of the relative items to the group */
    this.groups.forEach((group) => {
      let elements = document.querySelectorAll(`[data-av="${group.name}"]`);
      elements.forEach((element) => {
        let defaultDuration = "300";
        let latestAddedItemDuration =
          group.items.length > 0
            ? group.items[group.items.length - 1].duration
            : "0";
        let latestAddedItemDelay =
          group.items.length > 0
            ? group.items[group.items.length - 1].delay
            : "0";

        /* the element animation */
        let eAnimation = element.getAttribute("data-av-animation") ?? "fade";
        /* the element animation duration */
        let eDuration =
          element.getAttribute("data-av-animation-duration") ?? defaultDuration;
        /* the element animation delay */
        let eDelay = element.getAttribute("data-av-animation-delay") ?? 0;
        eDelay = eDelay
          ? eDelay
          : Number(latestAddedItemDuration) + Number(latestAddedItemDelay);

        group.items.push({
          element: element,
          group: group,
          animation: eAnimation,
          duration: eDuration,
          delay: eDelay,
        });
      });
    });

    console.log(this.groups);

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
    this.groups.forEach((group) => {
      group.items.forEach((item) => {
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
    });
  }

  private listenersCallback(): void {
    this.groups.forEach((group: AfterViewportJsGroup) => {
      group.items.forEach((item: AfterViewportJsItem) => {
        /* if the item is to be animated (in viewport, totally o partially) */
        if (
          this.isInViewport(item) == InViewport.In ||
          (!group.onlyWhenTotallyIn &&
            this.isInViewport(item) == InViewport.Partial)
        ) {
          /* if the group is sequential */
          if (group.sequential) {
            let order = 1;
            /* only if its not already animated i continue with the sequence */
            if (!item.wrapper?.classList.contains("av-ani-end")) {
              /* and only if its in viewport i continue with the sequence */
              if (
                this.isInViewport(item) == InViewport.In ||
                (!group.onlyWhenTotallyIn &&
                  this.isInViewport(item) == InViewport.Partial)
              ) {
                item.wrapper?.classList.add(
                  "av-animation-delay--" + Number(item.delay) * order
                );
                item.wrapper?.classList.add("av-ani-end");
                order++;
              }
            }
            /* if the group isn't sequential */
          } else {
            if (!item.wrapper?.classList.contains("av-ani-end")) {
              item.wrapper?.classList.add("av-ani-end");
            }
          }
          /* if the item is going out of the viewport i manage resets */
        } else {
          /* only if the group has the reset active */
          if (group.resets) {
            item.wrapper?.classList.remove("av-ani-end");
          }
        }
      });
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
