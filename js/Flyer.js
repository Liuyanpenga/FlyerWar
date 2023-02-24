// 抽象来看 size{w|h} offset{x|y}
function Flyer(hp, speed, size, offset, img, direction, type) {
  this.hp = hp;
  this.speed = speed;
  this.size = size;
  this.offset = offset;
  this.img = img;
  this.direction = direction;
  this.type = type;
  var ele = this.createDom(); // 得到这个元素
  // console.log('此时this上没有DOM元素',this)
  ele.obj = this; // DOM 找 JS
  this.ele = ele; // JS 找 DOM
  // console.log('此时this上有DOM元素',this)
}

// 创建到页面上
Flyer.prototype.createDom = function () {
  var img = document.createElement("img");
  img.src = this.img;
  img.width = this.size.w;
  img.height = this.size.h;
  img.style.position = "absolute";
  img.style.left = this.offset.x + "px";
  img.style.top = this.offset.y + "px";
  $game.appendChild(img);
  // 返回出去这个元素
  return img;
};

// 移动的方法
Flyer.prototype.move = function () {
  // console.log(this.ele);
  var isLive
  switch (this.direction) {
    case DOWN:
      if (isLive = this.offset.y < maxHeight - this.size.h)
        this.ele.style.top = (this.offset.y += this.speed) + "px";
      break;
    case UP:
      if (isLive = this.offset.y > 0)
        this.ele.style.top = (this.offset.y -= this.speed) + "px";
      break;
    case LEFT:
      if (isLive = this.offset.x > 0)
        this.ele.style.left = (this.offset.x -= this.speed) + "px";
      break;
    case RIGHT:
      if (isLive = this.offset.x < maxWidth - this.size.w)
        this.ele.style.left = (this.offset.x += this.speed) + "px";
      break;

  }
  if (!isLive && this !== mainPlan) {
    this.kill();
  }

  // 判断移动后是否相撞
  if (!isGameover)
    this.crash(this.offset.x, this.offset.y)
};

// 碰撞情况
// 1.如果子弹和敌机相撞，那么 子弹和敌机都 kill 得分加 1
// 2.如果主战机和敌机相撞，那么 主战机 hp -1，敌机 kill

Flyer.prototype.crash = (x, y) => {
  // 返还在特定坐标点下的 HTML 元素数组
  var elements = document.elementsFromPoint(x, y)
  var eles = {}

  for (let i = 0; i < elements.length; i++) {
    var ele = elements[i]
    if (ele.tagName === 'IMG') {
      eles[ele.obj.type] = ele.obj
    }
  }

  var len = Object.keys(eles).length
  if (len === 1) return;
  if (len === 2) {
    if (eles[ENEMY] && eles[BULLET]) {
      eles[ENEMY].kill()
      eles[BULLET].kill()
      $score1.innerText -= -1
      // $score1.innerText = $score1.innerText - (-1)
    }
    if (eles[MAIN] && eles[ENEMY]) {
      eles[ENEMY].kill()
      eles[MAIN].hp -= 1
    }
  }
  if (mainPlan.hp <= 0) {
    mainPlan.kill()
    game.over()
    isGameover = true
  }
}
// 销毁方法
Flyer.prototype.kill = function () {
  // 1. DOM元素要移除
  this.ele.remove();
  // 2. JS对象上的moveTimer需要关闭
  clearInterval(this.moveTimer);
  // 3. JS对象自身需要释放内存
  this.ele.obj = null;
  // 4. [已分离的DOM]需要释放 DOM,在js中有一个指向 this.ele占据着JS内存
  this.ele = null;
};