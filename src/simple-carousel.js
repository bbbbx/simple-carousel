(function () {
  var simpleCarousel = {};
  window.simpleCarousel = simpleCarousel;  // export simpleCarousel

  /**
   * build a carousel
   * @param {Node} carousel
   * @param {Object} option 
   */
  simpleCarousel.build = function (carousel, option) {

    // start option default value
    option = option || {};
    option.autoplay = option.autoplay || false;  // autoplay flag
    option.slidetime = option.slidetime || 500;  // image slideing time
    option.interval = option.interval || 3000;   // image slide interval time
    option.width = option.width || '600px';      // frame widht
    option.height = option.height || '400px';    // frame height
    option.borderRadius = option.borderRadius || '0px';    // frame corner radius
    if (option.slidetime > option.interval) {
      option.slidetime = option.interval;
      console.warn('option.slidetime must be less than option.interval!');
    }
    // end option default value
    const list = carousel.querySelector('.list');     // list of images
    const width = Number.parseFloat(option.width);    // item's width of list 
    const height = Number.parseFloat(option.height);  // item's height of list 
    const length = Number.parseInt(Number.parseInt(list.children.length));  // number of list before append `firstLi` and `lastLi`

    var firstLi = document.createElement('li');    // create a <li /> element to append to `list`'s tail
    var lastLi = document.createElement('li');     // create a <li /> element to insert to `list`'s head
    var firstImg = document.createElement('img');  // append <img /> to `firstLi`
    var lastImg = document.createElement('img');   // append <img /> to `lastLi`

    var prev = document.createElement('a');  // prev arrow
    var next = document.createElement('a');  // next arrow
    var buttonContainer = document.createElement('div');  // bottom button container
    var buttons;           // bottom buttons' count
    var index = 1;         // number of current showing image 
    var animated = false;  // image slides flag
    var timer;             // image

    carousel.classList.add('carousel');
    carousel.style.borderRadius = option.borderRadius;
    carousel.style.position = 'relative';
    carousel.style.overflow = 'hidden'
    carousel.style.margin = 0;
    carousel.style.padding = 0;
    carousel.style.width = option.width;
    carousel.style.height = option.height;
    list.style.position = 'absolute';
    list.style.left = -width + 'px';
    list.style.height = height + 'px';
    list.style.width = width * (length + 2) + 'px';
    list.style.zIndex = 1;
    list.style.overflow = 'hidden';
    list.style.margin = 0;
    list.style.padding = 0;

    firstImg.src = list.children[list.children.length - 1].children[0].src;
    firstImg.alt = list.children[list.children.length - 1].children[0].alt;
    lastImg.src = list.children[0].children[0].src;
    lastImg.alt = list.children[0].children[0].alt;
    firstLi.appendChild(firstImg);
    lastLi.appendChild(lastImg);
    list.insertBefore(firstLi, list.children[0]);
    list.appendChild(lastLi);

    buttonContainer.className = 'buttons';
    prev.className = 'arrow arrow-left';
    next.className = 'arrow arrow-right';
    prev.href = next.href = 'javascript:;';
    prev.innerHTML = '&lt;';
    next.innerHTML = '&gt;';

    // append bottom button <span /> to `buttonContainer`
    for (var i = 0; i < length; i++) {
      var button = document.createElement('span');
      button.dataset.index = i + 1;
      buttonContainer.appendChild(button);
    }

    carousel.appendChild(buttonContainer);
    carousel.appendChild(prev);
    carousel.appendChild(next);
    buttonContainer.style.marginLeft = Number.parseFloat(getComputedStyle(buttonContainer).width) / -2 + 'px';

    buttons = carousel.querySelector('.buttons').getElementsByTagName('span');

    for (var i = 0; i < list.children.length; i++) {
      list.children[i].style.width = option.width;
      list.children[i].style.height = option.height;
      list.children[i].style.float = 'left';
      list.children[i].style.listStyleType = 'none';
      list.children[i].style.backgroundColor = 'black';
      list.children[i].children[0].style.height = '100%';
      list.children[i].children[0].style.display = 'block';
      list.children[i].children[0].style.margin = '0 auto';
    }

    //--------------//--------------//--------------//--------------//--------------//--------------//--------------

    function showButton() {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('on');
      }
      buttons[index - 1].classList.add('on');
    }

    function animate(offset) {
      animated = true;
      var newLeft = Number.parseInt(list.style.left) + offset;
      var time = option.slidetime;  // 位移总时间
      var interval = 10;  // 位移间隔时间
      var speed = offset / (time / interval);  // 每次位移量，负表示向右移。正表示向左移

      var timer = setInterval(function () {
        list.style.left = Number.parseInt(list.style.left) + speed + 'px';
        if (Number.parseInt(list.style.left) === newLeft) {  // JS 动画位移完成
          animated = false;  // 设置动画结束标志位
          clearInterval(timer);  // 清除 setInterval

          list.style.left = newLeft > -width ? buttons.length * -width + 'px' : list.style.left;
          list.style.left = newLeft < buttons.length * -width ? -width + 'px' : list.style.left;
        }
      }, interval);
    }

    function autoPlay() {
      timer = setInterval(function () {
        next.click();
      }, option.interval);
    }

    function stopPlay() {
      clearInterval(timer);
    }

    // 点击下一张图片
    next.addEventListener('click', function () {
      if (!animated) {
        index = index === buttons.length ? 1 : index + 1;  // index 是否等于 buttons.length-1 
        showButton();
        animate(-width);
      }
    });
    // 点击上一张图片
    prev.addEventListener('click', function () {
      if (!animated) {
        index = index === 1 ? buttons.length : index - 1;
        showButton();
        animate(width);
      }
    });
    // 点击底下按钮
    buttonContainer.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() !== 'span') return; // 点击的不是 <span />

      if (!animated) {
        var eIndex = Number.parseInt(e.target.dataset.index);
        if (eIndex === index) return;  // 无需改变 left
        var offset = (eIndex - index) * -width;
        animate(offset);
        index = eIndex;
        showButton();
      }
    });

    showButton();
    if (option.autoplay) {
      carousel.addEventListener('mouseover', function () {
        stopPlay();
      });
      carousel.addEventListener('mouseout', function () {
        autoPlay();
      });
      autoPlay();
    } else {
      stopPlay();
    }
  }
})();