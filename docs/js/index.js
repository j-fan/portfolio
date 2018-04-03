function initSite(){
  navBar.init()
  content.init()
  overlay.init()
}

var navBar = {
  init : function(){
    navBar.initButtons()
    navBar.addNavBarScrollAnim()
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

    var contentTop = content.offsetTop - navBarHeight
    window.scrollTo({
     top: contentTop,
     left: 0,
     behavior: 'smooth'
    });
  },
  addNavBarScrollAnim : function(){
    window.addEventListener("scroll", function(){
      var navBar = document.querySelector("#nav-bar")
      var navBarHeight = 120
      var pos = navBar.getBoundingClientRect().top
      var banner = document.querySelector("#banner")
      if(pos <= navBarHeight){
        navBar.classList.remove("banner-mode")
        banner.classList.remove("banner-mode")
      } else {
        navBar.classList.add("banner-mode")
        banner.classList.add("banner-mode")
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
  cascadeShowChildren : function(page,duration,delay){
    var items = page.children
    for(var i = 0; i<items.length; i++){
      var item = items[i]
      item.classList.remove('active')
      setTimeout(content.showElem, duration * i + delay, item)
    }
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
        console.log("3d hover")
        var overlay = e.currentTarget
        var xAmount = (window.innerWidth/2 - e.clientX) /10
        var yAmount = (window.innerHeight/2 - e.clientY) /10
        var inner = overlay.querySelector(".overlay-inner")
        inner.style.transform = "rotateY(" + xAmount + "deg)" +
                                  " rotateX(" + yAmount + "deg)"
      })
    })
    // window.addEventListener("mousemove",overlay.hover3d)
  }

}

document.addEventListener("DOMContentLoaded",initSite())
