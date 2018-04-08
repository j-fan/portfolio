function initSite(){
  firstLoadAnims.init()
  navBar.init()
  content.init()
  overlay.init()
  scrollAnims.init()
}

var firstLoadAnims = {
  init : function(){
    var banner = document.querySelector("#banner")
    banner.classList.add("active")
    var nav = document.querySelector("#nav-bar")
    nav.classList.add("active")
  }
}

var navBar = {
  init : function(){
    navBar.initButtons()
  },
  buttons : document.querySelectorAll(".nav-item"),
  initButtons : function(){
    for(var i=0; i < navBar.buttons.length; i++ ) {
      var button = navBar.buttons[i]
      button.addEventListener("click",function(e){
        navBar.unsetButtons()
        e.currentTarget.classList.add("active")
        content.showPage(e.currentTarget.classList[1])
        navBar.scrollToMainContent()
      })
    }
  },
  unsetButtons : function(){
      navBar.buttons.forEach(function(button){
      button.classList.remove("active")
    })
  },
  scrollToMainContent : function(){
    var content = document.querySelector("#content")
    content.classList.remove("banner-mode")
    var navBar = document.querySelector("#nav-bar")
    var navBarHeight = navBar.clientHeight

    var contentTop = content.offsetTop - navBarHeight + 1
    window.scrollTo({
     top: contentTop,
     left: 0,
     behavior: 'smooth'
    });
  },


}

var scrollAnims = {
  init : function(){
    window.addEventListener("scroll", function(){
      //nav bar animation
      //also hide visible active pages
      var navBar = document.querySelector("#nav-bar")
      var navBarHeight = navBar.offsetHeight
      var pos = navBar.getBoundingClientRect().top
      var banner = document.querySelector("#banner")

      if(pos <= navBarHeight && navBar.classList.contains("banner-mode")){
        console.log("remove")
        navBar.classList.remove("banner-mode")
        banner.classList.remove("banner-mode")
      }
      if(pos > navBarHeight && !navBar.classList.contains("banner-mode")){
        console.log("add")
        navBar.classList.add("banner-mode")
        banner.classList.add("banner-mode")
      }
      //items (posts) animations
      // var items = document.querySelectorAll(".page.active .item")
      // for(var i =0;i<items.length;i++){
      //   if(content.checkVisible(items[i])){
      //     content.showElem(items[i])
      //   }
      // }
      //banner text animation
      if(window.innerWidth > 400){
        var banner = document.querySelector("#banner")
        var shiftAmount = banner.getBoundingClientRect().top
        for(var i = 0; i< banner.children.length ; i ++){
          var child = banner.children[i]
          child.style.transition = "none"
          child.style.transform = "translateY(" + shiftAmount/i + "px)"
        }
      }


    })

  }
}

var content = {
  pages : document.querySelectorAll(".page"),
  init : function(){
    window.addEventListener('resize',function(event){
      console.log("resizing")
      var activePage = document.querySelector(".page.active")
      if(activePage){
        var items = activePage.children
        for(var i=0; i < items.length;i++){
          var item = items[i]
          content.setElemHeight(item)
          if(item.querySelector(".overlay")){
            content.setToParentSize(item.querySelector(".overlay"))
          }
        }
      }
    })
    //trigger project pages when item clicked
    var items = document.querySelectorAll(".item")
    items.forEach(function(item){
      var overlay = item.querySelector(".overlay")
      var projectClose = item.querySelector(".project-page .close")
      if(overlay){
        overlay.addEventListener("click",function(e){
          var projectPage = e.currentTarget.parentElement.querySelector(".project-page")
          projectPage.classList.add("active")
          document.body.classList.add("no-scroll")
          var content = projectPage.querySelector(".project-content").children
          for(var i=0;i<content.length;i++){
            content[i].classList.add("active")
          }
        })
      }
      if(projectClose){
        projectClose.addEventListener("click",function(e){
          var projectPage = e.currentTarget.parentElement
          var content = projectPage.querySelector(".project-content").children
          for(var i=0;i<content.length;i++){
            content[i].classList.remove("active")
          }

          projectPage.classList.remove("active")
          document.body.classList.remove("no-scroll")


        })
      }
    })
  },
  showPage : function(pageName){
    for(var i=0;i<content.pages.length;i++){
      var page  = content.pages[i]
      if(pageName == page.classList[1]){
        page.classList.add("active")
        content.showItems(i)
      } else {
        page.classList.remove("active")
      }
    }
  },
  showItems : function(pageNum){
    var page = content.pages[pageNum]
    content.cascadeShowChildren(page,200,200)
  },
  cascadeShowChildren : function(page,duration,delay,limit){
    var items = page.children
    if(!limit || limit < 0 || limit >= items.length){
      limit = items.length
    }
    for(var i = 0; i<items.length; i++){
      var item = items[i]
      item.classList.remove('active')
      if(i < limit){
        setTimeout(content.showElem, duration * i + delay, item)
      }
    }
  },
  checkVisible : function (elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  },
  showElem : function(elem){
    content.setElemHeight(elem)
    elem.classList.add("active")
    if(elem.querySelector(".overlay")){
      content.setToParentSize(elem.querySelector(".overlay"))
    }
  },
  setElemHeight : function(elem){
    elem.style.height = "auto"
    var height = elem.naturalHeight
    elem.style.height = height + "px"
  },
  setToParentSize: function(elem){
    var parentHeight = elem.parentElement.clientHeight - 4
    elem.style.height = parentHeight + "px"
    var parentWidth = elem.parentElement.clientWidth
    elem.style.width = parentWidth + "px"
  }
}

var overlay = {
  init : function(){
    var overlays = document.querySelectorAll(".overlay")
    overlays.forEach(function(overlay){
      overlay.addEventListener("mousemove",function(e){
        var overlay = e.currentTarget
        var xAmount = (window.innerWidth/2 - e.clientX) /-20
        var yAmount = (window.innerHeight/2 - e.clientY) /20
        var inner = overlay.querySelector(".overlay-inner")
        inner.style.transform = "rotateY(" + xAmount + "deg)" +
                                  " rotateX(" + yAmount + "deg)"
      })
    })
  }

}


document.querySelector("#banner-bg").addEventListener("load",initSite())
