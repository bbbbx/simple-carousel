# simple-carousel

🎠 Just a simple carousel component. [Live demo](http://venusworld.cn/simple-carousel/)

## Usage

Firstly, add `simple-carousel.css` to your HTML file:

```html
<link rel="stylesheet" href="./src/simple-carousel.css" />
```

Second, Add `simple-carousel.js` to your HTML body's bottom, and build a carousel:

```html
<body>
<!-- construct your HTML DOM as following
     use a <div /> wrap a <ul />
     and <ul /> wraps some <li><img src="..." alt="..." /></li>
     put your images in <img /> tags -->
<div id="carousel1">
  <ul class="list">
    <li><img src="http://via.placeholder.com/600x400" alt="http://via.placeholder.com/600x400" /></li>
    <li><img src="http://via.placeholder.com/600x400" alt="http://via.placeholder.com/600x400" /></li>
    <li><img src="http://via.placeholder.com/600x400" alt="http://via.placeholder.com/600x400" /></li>
    <li><img src="http://via.placeholder.com/600x400" alt="http://via.placeholder.com/600x400" /></li>
    <li><img src="http://via.placeholder.com/600x400" alt="http://via.placeholder.com/600x400" /></li>
  </ul>
</div>

<!-- import `simple-carousel.js` file to your page -->
<script type="text/javascript" src="./src/simple-carousel.js"></script>
<script type="text/javascript">
  var carousel1 = document.querySelector('#carousel1');
  // build carousel
  simpleCarousel.build(carousel1);
</script>
</body>
```

Ok, you done!

Your page should look like:

![./example.gif](./example.gif)

## Configure

The API is only one: `window.simpleCarousel.build(Node, option)`.

Where `Node` is a HTML Node, and `option` is a Object.

**option.autoplay**

`true` for auto play image carousel, default is `false`.

**option.slidetime**

Each image sliding duration, unit is ms, default is 500.

**option.interval**

Adjoining images sliding time, unit is ms, default is 3000.

**option.width**

Frame width, unit is px, default is 600px.

**option.height**

Frame height, unit is px, default is 400px.

For example:
```js
window.simpleCarousel.build(carousel, {
  autoplay: true,
  slidetime: 1000,
  width: '800px',
  height: '600px'
});
```

## Contributions

Any issues and contributions are welcome, feel free if you wanted. :)

## License

[MIT](./LICENSE)