      // 创建主战机
      function MainPlan() {
        // 2、子类调用父类构造函数，绑定 this
        Flyer.apply(this,arguments)
        // console.log(this)
        // console.log(MainPlan.prototype.constructor)
        this.type = MAIN
        // 4、自身的构造函数中,调用切入方法
        this.moveBefore()
      }
      // 1、继承原型但又互不影响
      MainPlan.prototype = Object.create(Flyer.prototype)
      // 3、原型继承了父类构造函数的 constructor，修正回来 
      MainPlan.prototype.constructor = MainPlan
      // 要切入的函数 获取 direction
      MainPlan.prototype.moveBefore = function(){
        var that = this
        onkeypressFn = function(e){
          switch(e.key){
            case DOWN: case UP: case LEFT:  case RIGHT:
              that.direction = e.key
              that.move()
          }
        }
        window.addEventListener('keypress',onkeypressFn,{passive:true})
      }