(function (w, d) {
  'use strict'
  const resource = document.createElement('link')
  resource.setAttribute('rel', 'stylesheet')
  resource.setAttribute('href', 'css/gall7.min.css')
  document.getElementsByTagName('head')[0].appendChild(resource)
  const getConfig = typeof w['IGConfig'] === 'undefined' || w['IGConfig'] // eslint-disable-line
  const IG = {}
  IG.folder = getConfig['folder'] || 'big/' // eslint-disable-line
  IG.imageContainer = getConfig['imageContainer'] || 'images-container' // eslint-disable-line
  IG.timer = typeof getConfig['delaySeconds'] === 'number' && isFinite(getConfig['delaySeconds']) ? getConfig['delaySeconds'] * 1000 : 2000 // eslint-disable-line
  IG.showButtonsOnPlay = typeof getConfig['showButtonsOnPlay'] === 'undefined' ? true : !!getConfig['showButtonsOnPlay'] // eslint-disable-line
  IG.showButtons = typeof getConfig['showButtons'] === 'undefined' ? true : !!getConfig['showButtons'] // eslint-disable-line
  IG.imagesArray = []// all elements array
  IG.isAutoPlayOn = false
  IG.isActive = false
  IG.indexOfImage = 0
  IG.timeOut = 0
  IG.frag = d.createDocumentFragment()// all stuff for creating main gallery window
  IG.clos = d.createElement('button')
  IG.ilef = d.createElement('button')
  IG.irig = d.createElement('button')
  IG.imag = d.createElement('div')
  IG.cent = d.createElement('div')
  IG.left = d.createElement('div')
  IG.rigt = d.createElement('div')
  IG.insi = d.createElement('div')
  IG.cent.appendChild(IG.rigt).appendChild(IG.irig).id = 'irig7'
  IG.cent.appendChild(IG.insi)
  IG.cent.appendChild(IG.left).appendChild(IG.ilef).id = 'ilef7'
  IG.cent.appendChild(IG.clos).id = 'clos7'
  IG.imag.appendChild(IG.cent).id = 'cent7'
  IG.frag.appendChild(IG.imag).id = 'imag7'
  IG.rigt.id = 'rigt7'
  IG.insi.id = 'insi7'
  IG.left.id = 'left7'
  IG.irig.setAttribute('aria-label', 'Next')
  IG.ilef.setAttribute('aria-label', 'Previous')
  IG.clos.setAttribute('aria-label', 'Close')
  IG.clos.setAttribute('title', 'Press Esc to close')
  // IG.imag.setAttribute('tabindex', '-1')
  IG.imag.className = 'hide7'

  // show download and autoplay buttons if (true = default)
  if (IG.showButtons) {
    IG.wdow = d.createElement('button')
    IG.play = d.createElement('button')
    IG.wdow.setAttribute('aria-label', 'Download')
    IG.play.setAttribute('aria-label', 'Play')
    IG.foot = d.createElement('div')
    IG.alts = d.createElement('div')
    IG.onow = d.createElement('div')
    IG.fine = d.createElement('div')
    IG.down = d.createElement('span')
    IG.foot.id = 'foot7'
    IG.onow.id = 'onow7'
    IG.down.id = 'down7'
    IG.wdow.id = 'wdow7'
    IG.fine.id = 'stat7'
    IG.onow.appendChild(IG.alts).id = 'alts7'
    IG.imag.appendChild(IG.foot).appendChild(IG.play).id = 'play7'
    IG.imag.appendChild(IG.onow).appendChild(IG.wdow).appendChild(IG.down)
    IG.foot.appendChild(IG.fine)
  }
  d.body.appendChild(IG.frag)// append document fragment to <body>

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.isAutoPlayOn = true
    if (IG.showButtons) this.play.className = 'acts7'

    this.timeOut = setTimeout(function () {
      this.right().show()
      if (!this.showButtonsOnPlay) {
        this.left.className = this.rigt.className = this.clos.className = 'hide7'
        if (this.showButtons) this.foot.className = this.onow.className = 'hide7'
      }
      this.indexOfImage === this.imagesArray.length - 1 && this.clear()
    }.bind(this), this.timer)
  }

  // autoplay and image loaded helper to remove class 'loader'
  IG.loadComplete = function () {
    // if (typeof e !== 'undefined' && e.parentElement) e.parentElement.className = ''
    this.insi.className = ''
    this.isAutoPlayOn && this.autoPlayLoop()
  }

  // image is loaded method
  IG.loaded = function () {
    this.imgs.onload = this.loadComplete.bind(this)
  }

  // downloads method
  IG.downloads = function () {
    const a = d.createElement('a')// create link
    const fileName = this.imgs.src.split('/').pop()// add class active for button animation
    this.onow.dataset.selected = fileName
    a.setAttribute('rel', 'noreferrer')
    a.setAttribute('download', fileName)
    a.href = this.imgs.src
    a.target = '_blank'
    a.click()
    a.remove()
  }

  // to left button method loop from images index
  IG.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.imagesArray.length - 1
    // this.ilef.focus()
    return this
  }

  // to right button method loop from images index
  IG.right = function () {
    if (this.indexOfImage < this.imagesArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    // this.irig.focus()
    return this
  }

  // clear method to reset all values
  IG.clear = function () {
    clearTimeout(this.timeOut)
    this.timeOut = 0
    this.isAutoPlayOn = false
    if (this.showButtons) this.foot.className = this.onow.className = this.play.className = ''
    if (!this.showButtonsOnPlay) this.clos.className = ''
    this.leftRigthBtnsShow()
    return this
  }

  // function on close
  IG.close = function () {
    this.clear()
    this.isActive = false
    this.imag.className = 'hide7'
    d.documentElement.style.overflow = 'visible'// back to initial state of overflow
  }

  // Left right buttons show/check method
  IG.leftRigthBtnsShow = function () {
    this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
    this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hide7' : ''
  }

  // show image method to show image when loaded
  IG.show = function () {
    if (!this.isActive) { // don't rewrite values if active and set active gallery
      this.isActive = true
      d.documentElement.style.overflow = 'hidden'// this stops from scroll when tab pressed and hides scrollbar
      this.imag.className = ''
    }
    this.leftRigthBtnsShow()
    this.insi.className = 'spin7'
    this.imgs && this.insi.removeChild(this.imgs) // if image exist remove and later recreate it
    this.imgs = d.createElement('img')
    const fullName = this.imagesArray[this.indexOfImage].src
    const fileName = fullName.split('/').pop()
    this.loaded()
    this.insi.appendChild(this.imgs)
    this.imgs.src = fileName.slice(0, -3) === 'svg' ? fullName : fullName.replace(fileName, this.folder + fileName)
    this.imgs.setAttribute('alt', this.imagesArray[this.indexOfImage].getAttribute('alt'))
    this.imgs.onerror = function (e) {
      // escape from infininte loop
      e.target.onerror = null
      e.target.src = this.imagesArray[this.indexOfImage].src
    }.bind(this)

    if (this.showButtons) {
      this.alts.innerText = decodeURI(fileName)
      this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.imagesArray.length
    }
  }

  // listen for clicked on image element and load show method
  IG.listenForIG = function (e) {
    const target = e.target
    if (target.tagName === 'IMG') {
      this.indexOfImage = this.imagesArray.indexOf(target) > -1 ? this.imagesArray.indexOf(target) : 0// set image index on click
      this.show()
      e.stopImmediatePropagation()
    }
  }

  // assign container elements with custom or (default = images-container) class or BODY (default = BODY)
  const container = d.getElementsByClassName(IG.imageContainer).length > 0
    ? d.getElementsByClassName(IG.imageContainer)
    : d.getElementsByTagName('body')

  const containersArray = []
  for (let l = container.length - 1; l >= 0; l--) containersArray.push(container[l])

  // Loop from elements and add to array
  for (let i = containersArray.length - 1; i >= 0; i--) {
    const img = containersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) IG.imagesArray.push(img[j])
  }

  if (containersArray[0] && containersArray[0].tagName === 'BODY') d.body.addEventListener('click', function (e) { IG.listenForIG(e) })
  else for (let k = containersArray.length - 1; k >= 0; k--) containersArray[k].addEventListener('click', function (e) { IG.listenForIG(e) })

  const k = {
    'ArrowLeft': function () { IG.clear().lefts().show() }, // eslint-disable-line
    'ArrowRight': function () { IG.clear().right().show() }, // eslint-disable-line
    'Escape': function () { IG.close() }, // eslint-disable-line
    ' ': function () { IG.isAutoPlayOn ? IG.clear() : IG.autoPlayLoop() } // eslint-disable-line
  }

  const c = {
    'left7': k['ArrowLeft'], // eslint-disable-line
    'rigt7': k['ArrowRight'], // eslint-disable-line
    'play7': k[' '], // eslint-disable-line
    'clos7': k['Escape'], // eslint-disable-line
    'wdow7': function () { IG.imagesArray[IG.indexOfImage].src.split('/').pop() !== IG.onow.dataset.selected && IG.clear().downloads() } // eslint-disable-line
  }

  // add click addEventListener to image div (gallery window)
  IG.imag.addEventListener('click', function (e) {
    const id = e.target.id
    if (!c[id]) return IG.isAutoPlayOn && IG.clear()
    c[id]()
  })

  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', function (e) {
    if (!k[e.key] || !IG.isActive || e.isComposing || e.key === 229) return
    k[e.key]()
    // e.preventDefault()
    // e.stopImmediatePropagation()
  })
  // everything to handle swipe left/right
  // https://code-maven.com/swipe-left-right-vanilla-javascript
  const minHorizontalMove = 30
  const maxVerticalMove = 30
  const withinMs = 1000
  let startXPos
  let startYPos
  let startTime

  function touchStart (event) {
    startXPos = event.touches[0].pageX
    startYPos = event.touches[0].pageY
    startTime = new Date()
  }

  function touchEnd (event) {
    const endXPos = event.changedTouches[0].pageX
    const endYPos = event.changedTouches[0].pageY
    const endTime = new Date()
    const moveX = endXPos - startXPos
    const moveY = endYPos - startYPos
    const elapsedTime = endTime - startTime
    if (Math.abs(moveX) > minHorizontalMove && Math.abs(moveY) < maxVerticalMove && elapsedTime < withinMs) {
      if (moveX < 0) c['rigt7']() // eslint-disable-line
      else c['left7']() // eslint-disable-line
    }
  }
  IG.imag.addEventListener('touchstart', touchStart, { passive: true })
  IG.imag.addEventListener('touchend', touchEnd)
  // everything to handle swipe left/right ends
})(window, document)
