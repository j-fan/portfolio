function initSite(){
  navBar.init()
  content.init()
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
      var navBarHeight = 60
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
        console.log(activePage.children)
        for(var i=0; i < items.length;i++){
          var item = items[i]
          content.setElemHeight(item)
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
    content.cascadeShowChildren(page)
  },
  cascadeShowChildren : function(page){
    var items = page.children
    for(var i = 0; i<items.length; i++){
      var item = items[i]
      item.classList.remove('active')
      var duration = 200
      setTimeout(content.showElem, duration * i + 400, item)
    }
  },
  showElem : function(elem){
    content.setElemHeight(elem)
    elem.classList.add("active")
  },
  setElemHeight : function(elem){
    elem.style.height = "auto"
    var height = elem.offsetHeight
    elem.style.height = height + "px"
  }
}

document.addEventListener("DOMContentLoaded",initSite())
