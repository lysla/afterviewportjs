# afterviewportjs

_Work in Progress!_ Ready to use, lightweight and vanilla, scroll animation library with images load control.

For examples and demo [look here](https://lysla.dev)

## Installation

### npm

Execute in terminal in your project directory.

```
npm i @lysla/afterviewportjs
```

Import and initialize the module in your JS.

```js
import afterViewportJs from "@lysla/afterviewportjs";

new afterViewportJs();
```

### manually

Download this repository and include in your HTML page .js and .css file.

```html
<link rel="stylesheet" href="./path/to/afterviewportjs/css/style.css" />
```

```html
<script src="./path/to/afterviewportjs/js/afterviewportjs.js"></script>
```

## Usage

### via data-av attributes

At the moment, the module supports configuration with data attributes only.

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

_Work in progress_

## Options

| Attribute                    | Description                                                                                                                                                                       | Default value | Possible values                                | Examples                                                                                                                                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-av                      | **Mandatory** for every element that needs to be animated. Can be used to group different set of elements to be animated in different ways.                                       | no value      | no value<br>string                             | `<div data-av></div>`<br><br>`<div data-av="my-group-name"></div>`                                                                                                                                                               |
| data-av-animation            | Change the type of animation on scroll for the element                                                                                                                            | av-style-1    | av-style-1<br>av-style-2<br>...<br>av-style-20 | `<div data-av data-av-animation="av-style-1"></div>`                                                                                                                                                                             |
| data-av-animation-duration   | Change the duration (in ms) of the animation for the element                                                                                                                      | 300           | any value multiple of 100 between 0 and 5000   | `<div data-av data-av-animation-duration="700"></div>`                                                                                                                                                                           |
| data-av-animation-delay      | Change the delay (in ms) of the animation for the element                                                                                                                         | 0             | any value multiple of 100 between 0 and 5000   | `<div data-av data-av-animation-delay="700"></div>`                                                                                                                                                                              |
| data-av-resets               | If present, the element will animate everytime it's back into viewport. Otherwise, it will animate only the first time.                                                           | no value      | no value                                       | `<div data-av data-av-resets></div>`                                                                                                                                                                                             |
| data-av-only-when-totally-in | If present, the element will start the animation only when fully inside the viewport. Otherwise, it will start even when the element is partially inside.                         | no value      | no value                                       | `<div data-av data-av-only-when-totally-in></div>`                                                                                                                                                                               |
| data-av-sequential           | If present, a sequence of elements animation will start for _all elements of the same group_. A order of the sequence can be given to each element, specifying a number as value. | no value      | no value<br>number                             | `<div data-av data-av-sequential></div>`<br><br>`<div data-av="my-group-name" data-av-sequential="3"></div><div data-av="my-group-name" data-av-sequential="2"></div><div data-av="my-group-name" data-av-sequential="1"></div>` |
