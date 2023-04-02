# afterviewportjs

_Work in Progress!_ Ready to use, lightweight and vanilla, scroll animation library with images load control.

For examples and demo [look here](https://lysla.github.io/afterviewportjs/)

## Installation

### npm

Execute in terminal in your project directory.

```
npm i @lysla/afterviewportjs
```

Import module in your JS.

```js
/* Data attribute usage only */
import "@lysla/afterviewportjs";

/* Javascript ES6 usage */
import AfterViewportJs from "@lysla/afterviewportjs";
```

### manually

Download this repository and include in your HTML page .js and .css file you will find within the `dist` directory.

```html
<link rel="stylesheet" href="./path/to/afterviewportjs/style.css" />
```

```html
<script src="./path/to/afterviewportjs/afterviewportjs.js"></script>
```

## Usage

### via data-av attributes

With this library you can easily use data attributes to animate anything directly from html.

#### Basic

Every html element you assign the data attribute to, will be animated on scroll.

```html
<div data-av>
  <!-- any content here -->
</div>

<img data-av src="image.webp" />
```

> Warning! You **can't** use this module directly for elements that are positioned absolute or fixed. If you need to, nest the element as a child of a absolute/fixed parent.

Not okay:

```html
<div style="position:absolute" data-av></div>
```

Okay:

```html
<div style="position:absolute">
  <div data-av></div>
</div>
```

### via javascript

You can create animation groups and items programmatically via javascript.

### Basic

You need to assign any selector to the html elements you want to animate.

```html
<div class="example-class">
  <!-- any content here -->
</div>

<img src="image.webp" id="example-id" />
```

Then initialize the library with each selector you need.

```js
import AfterViewportJs from "@lysla/afterviewportjs";

new AfterViewportJs(".example-class", {});
```

You can change general and specific settings for each item via the `options` parameter.

```js
import AfterViewportJs from "@lysla/afterviewportjs";

new AfterViewportJs(".example-class", {
  group: "example-class",
  sequential: true,
  resets: true,
  onlyWhenTotallyIn: false,
  animation: "av-style-03",
  duration: "800",
  optionsItem: [
    {
      animation: "av-style-04",
      duration: "800",
      sequentialOrder: 1,
    },
    {
      animation: "av-style-02",
      duration: "800",
      sequentialOrder: 2,
    },
  ],
});
```

> Attributes specified under the `optionsItem` field take priority on whatever defined for the whole group. All options take priority on any data attribute.

<br>
<br>

## Options

| Attribute                    | Option                       | Description                                                                                                                                                                                                                                                                                                                                                                                            | Default value | Possible values                                  | Examples                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-av                      | `group: string`              | _Data attributes:_ **Mandatory** for every element that needs to be animated via data attributes. Can be used to group different set of elements to be animated in different ways.<br><br>_Javascipt_: The elements are identified via selector and the group name it's set in the options object.                                                                                                     | no value      | no value<br>string                               | _Data attributes:_ <br><br>`<div data-av></div>`<br><br>`<div data-av="my-group-name"></div>` <br><br> _Javascript:_ <br><br> `new AfterViewportJs(".example-class", { group: "example-group" });`                                                                                                                                                                                                                      |
| data-av-animation            | `animation: string`          | Change the type of animation on scroll for the element                                                                                                                                                                                                                                                                                                                                                 | av-style-01   | av-style-01<br>av-style-02<br>...<br>av-style-20 | _Data attributes:_ <br><br>`<div data-av data-av-animation="av-style-01"></div>` <br><br> _Javascript:_ <br><br> `new AfterViewportJs(".example-class", { animation: "av-style-02" });`                                                                                                                                                                                                                                 |
| data-av-animation-duration   | `duration: string`           | Change the duration (in ms) of the animation for the element                                                                                                                                                                                                                                                                                                                                           | 300           | any value multiple of 100 between 0 and 5000     | _Data attributes:_ <br><br>`<div data-av data-av-animation-duration="700"></div>` <br><br> _Javascript:_ <br><br> `new AfterViewportJs(".example-class", { duration: "900" });`                                                                                                                                                                                                                                         |
| data-av-animation-delay      | `delay: string`              | Change the delay (in ms) of the animation for the element                                                                                                                                                                                                                                                                                                                                              | 0             | any value multiple of 100 between 0 and 5000     | _Data attributes:_ <br><br>`<div data-av data-av-animation-delay="700"></div>` <br><br> _Javascript:_ <br><br> `new AfterViewportJs(".example-class", { delay: "900" });`                                                                                                                                                                                                                                               |
| data-av-resets               | `resets: boolean`            | If present, the element will animate everytime it's back into viewport. Otherwise, it will animate only the first time.                                                                                                                                                                                                                                                                                | false         | no value<br>boolean                              | _Data attributes:_ <br><br>`<div data-av data-av-resets></div>` <br><br>_Javascript:_ <br><br> `new AfterViewportJs(".example-class", { resets: true });`                                                                                                                                                                                                                                                               |
| data-av-only-when-totally-in | `onlyWhenTotallyIn: boolean` | If present, the elements will start the animation only when fully inside the viewport. Otherwise, it will start even when the elements are partially inside. _This attribute relates to the whole group of elements, see data-av attribute to create multiple groups._                                                                                                                                 | false         | no value<br>boolean                              | _Data attributes:_ <br><br>`<div data-av data-av-only-when-totally-in></div>` <br><br>_Javascript:_ <br><br> `new AfterViewportJs(".example-class", { onlyWhenTotallyIn: true });`                                                                                                                                                                                                                                      |
| data-av-sequential           | `sequential: boolean`        | _Data attributes:_ If present, a sequence of elements animation will start for _all elements of the same group_. A order of the sequence can be given to each element, specifying a number as value. <br><br>_Javascript:_ While you need to set the sequential attribute for the whole group, you can use the field `optionsItem` to set a preferred `sequentialOrder` for each element of the group. | false         | no value<br>number<br>boolean                    | _Data attributes:_ <br><br>`<div data-av data-av-sequential></div>`<br><br>`<div data-av="my-group-name" data-av-sequential="3"></div><div data-av="my-group-name" data-av-sequential="2"></div><div data-av="my-group-name" data-av-sequential="1"></div>` <br><br>_Javascript:_ <br><br> `new AfterViewportJs(".example-class", { sequential: true, optionsItem: [{ sequentialOrder: 2 }, { sequentialOrder: 1 }]});` |
| n\a                          | `optionsItem: array<object>` | _Javascript only._ You can override some* group proprieties using this array option field.<br><br><small>* `animation`, `duration`, `delay`, `sequentialOrder`</small>                                                                                                                                                                                                                                 | no value      | no value<br>object                               | _Javascript only:_ <br><br> `new AfterViewportJs(".example-class", { optionsItem: [{ animation: "av-style-04", duration: "800", delay: "1000",sequentialOrder: 2 }]});`                                                                                                                                                                                                                                                 |
