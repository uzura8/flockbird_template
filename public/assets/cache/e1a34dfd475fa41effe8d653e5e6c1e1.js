(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['./blueimp-helper'],factory);}else{window.blueimp=window.blueimp||{};window.blueimp.Gallery=factory(window.blueimp.helper||window.jQuery);}}(function($){'use strict';function Gallery(list,options){if(document.body.style.maxHeight===undefined){return null;}
if(!this||this.options!==Gallery.prototype.options){return new Gallery(list,options);}
if(!list||!list.length){this.console.log('blueimp Gallery: No or empty list provided as first argument.',list);return;}
this.list=list;this.num=list.length;this.initOptions(options);this.initialize();}
$.extend(Gallery.prototype,{options:{container:'#blueimp-gallery',slidesContainer:'div',titleElement:'h3',displayClass:'blueimp-gallery-display',controlsClass:'blueimp-gallery-controls',singleClass:'blueimp-gallery-single',leftEdgeClass:'blueimp-gallery-left',rightEdgeClass:'blueimp-gallery-right',playingClass:'blueimp-gallery-playing',slideClass:'slide',slideLoadingClass:'slide-loading',slideErrorClass:'slide-error',slideContentClass:'slide-content',toggleClass:'toggle',prevClass:'prev',nextClass:'next',closeClass:'close',playPauseClass:'play-pause',typeProperty:'type',titleProperty:'title',urlProperty:'href',displayTransition:true,clearSlides:true,stretchImages:false,toggleControlsOnReturn:true,toggleSlideshowOnSpace:true,enableKeyboardNavigation:true,closeOnEscape:true,closeOnSlideClick:true,closeOnSwipeUpOrDown:true,emulateTouchEvents:true,stopTouchEventsPropagation:false,hidePageScrollbars:true,disableScroll:true,carousel:false,continuous:true,unloadElements:true,startSlideshow:false,slideshowInterval:5000,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:undefined,event:undefined,onopen:undefined,onopened:undefined,onslide:undefined,onslideend:undefined,onslidecomplete:undefined,onclose:undefined,onclosed:undefined},carouselOptions:{hidePageScrollbars:false,toggleControlsOnReturn:false,toggleSlideshowOnSpace:false,enableKeyboardNavigation:false,closeOnEscape:false,closeOnSlideClick:false,closeOnSwipeUpOrDown:false,disableScroll:false,startSlideshow:true},console:window.console&&typeof window.console.log==='function'?window.console:{log:function(){}},support:(function(element){var support={touch:window.ontouchstart!==undefined||(window.DocumentTouch&&document instanceof DocumentTouch)},transitions={webkitTransition:{end:'webkitTransitionEnd',prefix:'-webkit-'},MozTransition:{end:'transitionend',prefix:'-moz-'},OTransition:{end:'otransitionend',prefix:'-o-'},transition:{end:'transitionend',prefix:''}},elementTests=function(){var transition=support.transition,prop,translateZ;document.body.appendChild(element);if(transition){prop=transition.name.slice(0,-9)+'ransform';if(element.style[prop]!==undefined){element.style[prop]='translateZ(0)';translateZ=window.getComputedStyle(element).getPropertyValue(transition.prefix+'transform');support.transform={prefix:transition.prefix,name:prop,translate:true,translateZ:!!translateZ&&translateZ!=='none'};}}
if(element.style.backgroundSize!==undefined){support.backgroundSize={};element.style.backgroundSize='contain';support.backgroundSize.contain=window.getComputedStyle(element).getPropertyValue('background-size')==='contain';element.style.backgroundSize='cover';support.backgroundSize.cover=window.getComputedStyle(element).getPropertyValue('background-size')==='cover';}
document.body.removeChild(element);};(function(support,transitions){var prop;for(prop in transitions){if(transitions.hasOwnProperty(prop)&&element.style[prop]!==undefined){support.transition=transitions[prop];support.transition.name=prop;break;}}}(support,transitions));if(document.body){elementTests();}else{$(document).on('DOMContentLoaded',elementTests);}
return support;}(document.createElement('div'))),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,initialize:function(){this.initStartIndex();if(this.initWidget()===false){return false;}
this.initEventListeners();this.onslide(this.index);this.ontransitionend();if(this.options.startSlideshow){this.play();}},slide:function(to,speed){window.clearTimeout(this.timeout);var index=this.index,direction,naturalDirection,diff;if(index===to||this.num===1){return;}
if(!speed){speed=this.options.transitionSpeed;}
if(this.support.transform){if(!this.options.continuous){to=this.circle(to);}
direction=Math.abs(index-to)/(index-to);if(this.options.continuous){naturalDirection=direction;direction=-this.positions[this.circle(to)]/this.slideWidth;if(direction!==naturalDirection){to=-direction*this.num+to;}}
diff=Math.abs(index-to)-1;while(diff){diff-=1;this.move(this.circle((to>index?to:index)-diff-1),this.slideWidth*direction,0);}
to=this.circle(to);this.move(index,this.slideWidth*direction,speed);this.move(to,0,speed);if(this.options.continuous){this.move(this.circle(to-direction),-(this.slideWidth*direction),0);}}else{to=this.circle(to);this.animate(index*-this.slideWidth,to*-this.slideWidth,speed);}
this.onslide(to);},getIndex:function(){return this.index;},getNumber:function(){return this.num;},prev:function(){if(this.options.continuous||this.index){this.slide(this.index-1);}},next:function(){if(this.options.continuous||this.index<this.num-1){this.slide(this.index+1);}},play:function(time){var that=this;window.clearTimeout(this.timeout);this.interval=time||this.options.slideshowInterval;if(this.elements[this.index]>1){this.timeout=this.setTimeout((!this.requestAnimationFrame&&this.slide)||function(to,speed){that.animationFrameId=that.requestAnimationFrame.call(window,function(){that.slide(to,speed);});},[this.index+1,this.options.slideshowTransitionSpeed],this.interval);}
this.container.addClass(this.options.playingClass);},pause:function(){window.clearTimeout(this.timeout);this.interval=null;this.container.removeClass(this.options.playingClass);},add:function(list){var i;if(!list.concat){list=Array.prototype.slice.call(list);}
if(!this.list.concat){this.list=Array.prototype.slice.call(this.list);}
this.list=this.list.concat(list);this.num=this.list.length;if(this.num>2&&this.options.continuous===null){this.options.continuous=true;this.container.removeClass(this.options.leftEdgeClass);}
this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass);for(i=this.num-list.length;i<this.num;i+=1){this.addSlide(i);this.positionSlide(i);}
this.positions.length=this.num;this.initSlides(true);},resetSlides:function(){this.slidesContainer.empty();this.unloadAllSlides();this.slides=[];},handleClose:function(){var options=this.options;this.destroyEventListeners();this.pause();this.container[0].style.display='none';this.container.removeClass(options.displayClass).removeClass(options.singleClass).removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass);if(options.hidePageScrollbars){document.body.style.overflow=this.bodyOverflowStyle;}
if(this.options.clearSlides){this.resetSlides();}
if(this.options.onclosed){this.options.onclosed.call(this);}},close:function(){var that=this,closeHandler=function(event){if(event.target===that.container[0]){that.container.off(that.support.transition.end,closeHandler);that.handleClose();}};if(this.options.onclose){this.options.onclose.call(this);}
if(this.support.transition&&this.options.displayTransition){this.container.on(this.support.transition.end,closeHandler);this.container.removeClass(this.options.displayClass);}else{this.handleClose();}},circle:function(index){return(this.num+(index%this.num))%this.num;},move:function(index,dist,speed){this.translateX(index,dist,speed);this.positions[index]=dist;},translate:function(index,x,y,speed){var style=this.slides[index].style,transition=this.support.transition,transform=this.support.transform;style[transition.name+'Duration']=speed+'ms';style[transform.name]='translate('+x+'px, '+y+'px)'+
(transform.translateZ?' translateZ(0)':'');},translateX:function(index,x,speed){this.translate(index,x,0,speed);},translateY:function(index,y,speed){this.translate(index,0,y,speed);},animate:function(from,to,speed){if(!speed){this.slidesContainer[0].style.left=to+'px';return;}
var that=this,start=new Date().getTime(),timer=window.setInterval(function(){var timeElap=new Date().getTime()-start;if(timeElap>speed){that.slidesContainer[0].style.left=to+'px';that.ontransitionend();window.clearInterval(timer);return;}
that.slidesContainer[0].style.left=(((to-from)*(Math.floor((timeElap/speed)*100)/100))+
from)+'px';},4);},preventDefault:function(event){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}},stopPropagation:function(event){if(event.stopPropagation){event.stopPropagation();}else{event.cancelBubble=true;}},onresize:function(){this.initSlides(true);},onmousedown:function(event){if(event.which&&event.which===1&&event.target.nodeName!=='VIDEO'){event.preventDefault();(event.originalEvent||event).touches=[{pageX:event.pageX,pageY:event.pageY}];this.ontouchstart(event);}},onmousemove:function(event){if(this.touchStart){(event.originalEvent||event).touches=[{pageX:event.pageX,pageY:event.pageY}];this.ontouchmove(event);}},onmouseup:function(event){if(this.touchStart){this.ontouchend(event);delete this.touchStart;}},onmouseout:function(event){if(this.touchStart){var target=event.target,related=event.relatedTarget;if(!related||(related!==target&&!$.contains(target,related))){this.onmouseup(event);}}},ontouchstart:function(event){if(this.options.stopTouchEventsPropagation){this.stopPropagation(event);}
var touches=(event.originalEvent||event).touches[0];this.touchStart={x:touches.pageX,y:touches.pageY,time:Date.now()};this.isScrolling=undefined;this.touchDelta={};},ontouchmove:function(event){if(this.options.stopTouchEventsPropagation){this.stopPropagation(event);}
var touches=(event.originalEvent||event).touches[0],scale=(event.originalEvent||event).scale,index=this.index,touchDeltaX,indices;if(touches.length>1||(scale&&scale!==1)){return;}
if(this.options.disableScroll){event.preventDefault();}
this.touchDelta={x:touches.pageX-this.touchStart.x,y:touches.pageY-this.touchStart.y};touchDeltaX=this.touchDelta.x;if(this.isScrolling===undefined){this.isScrolling=this.isScrolling||Math.abs(touchDeltaX)<Math.abs(this.touchDelta.y);}
if(!this.isScrolling){event.preventDefault();window.clearTimeout(this.timeout);if(this.options.continuous){indices=[this.circle(index+1),index,this.circle(index-1)];}else{this.touchDelta.x=touchDeltaX=touchDeltaX/(((!index&&touchDeltaX>0)||(index===this.num-1&&touchDeltaX<0))?(Math.abs(touchDeltaX)/this.slideWidth+1):1);indices=[index];if(index){indices.push(index-1);}
if(index<this.num-1){indices.unshift(index+1);}}
while(indices.length){index=indices.pop();this.translateX(index,touchDeltaX+this.positions[index],0);}}else if(this.options.closeOnSwipeUpOrDown){this.translateY(index,this.touchDelta.y+this.positions[index],0);}},ontouchend:function(event){if(this.options.stopTouchEventsPropagation){this.stopPropagation(event);}
var index=this.index,speed=this.options.transitionSpeed,slideWidth=this.slideWidth,isShortDuration=Number(Date.now()-this.touchStart.time)<250,isValidSlide=(isShortDuration&&Math.abs(this.touchDelta.x)>20)||Math.abs(this.touchDelta.x)>slideWidth/2,isPastBounds=(!index&&this.touchDelta.x>0)||(index===this.num-1&&this.touchDelta.x<0),isValidClose=!isValidSlide&&this.options.closeOnSwipeUpOrDown&&((isShortDuration&&Math.abs(this.touchDelta.y)>20)||Math.abs(this.touchDelta.y)>this.slideHeight/2),direction,indexForward,indexBackward,distanceForward,distanceBackward;if(this.options.continuous){isPastBounds=false;}
direction=this.touchDelta.x<0?-1:1;if(!this.isScrolling){if(isValidSlide&&!isPastBounds){indexForward=index+direction;indexBackward=index-direction;distanceForward=slideWidth*direction;distanceBackward=-slideWidth*direction;if(this.options.continuous){this.move(this.circle(indexForward),distanceForward,0);this.move(this.circle(index-2*direction),distanceBackward,0);}else if(indexForward>=0&&indexForward<this.num){this.move(indexForward,distanceForward,0);}
this.move(index,this.positions[index]+distanceForward,speed);this.move(this.circle(indexBackward),this.positions[this.circle(indexBackward)]+distanceForward,speed);index=this.circle(indexBackward);this.onslide(index);}else{if(this.options.continuous){this.move(this.circle(index-1),-slideWidth,speed);this.move(index,0,speed);this.move(this.circle(index+1),slideWidth,speed);}else{if(index){this.move(index-1,-slideWidth,speed);}
this.move(index,0,speed);if(index<this.num-1){this.move(index+1,slideWidth,speed);}}}}else{if(isValidClose){this.close();}else{this.translateY(index,0,speed);}}},ontouchcancel:function(event){if(this.touchStart){this.ontouchend(event);delete this.touchStart;}},ontransitionend:function(event){var slide=this.slides[this.index];if(!event||slide===event.target){if(this.interval){this.play();}
this.setTimeout(this.options.onslideend,[this.index,slide]);}},oncomplete:function(event){var target=event.target||event.srcElement,parent=target&&target.parentNode,index;if(!target||!parent){return;}
index=this.getNodeIndex(parent);$(parent).removeClass(this.options.slideLoadingClass);if(event.type==='error'){$(parent).addClass(this.options.slideErrorClass);this.elements[index]=3;}else{this.elements[index]=2;}
if(target.clientHeight>this.container[0].clientHeight){target.style.maxHeight=this.container[0].clientHeight;}
if(this.interval&&this.slides[this.index]===parent){this.play();}
this.setTimeout(this.options.onslidecomplete,[index,parent]);},onload:function(event){this.oncomplete(event);},onerror:function(event){this.oncomplete(event);},onkeydown:function(event){switch(event.which||event.keyCode){case 13:if(this.options.toggleControlsOnReturn){this.preventDefault(event);this.toggleControls();}
break;case 27:if(this.options.closeOnEscape){this.close();event.stopImmediatePropagation();}
break;case 32:if(this.options.toggleSlideshowOnSpace){this.preventDefault(event);this.toggleSlideshow();}
break;case 37:if(this.options.enableKeyboardNavigation){this.preventDefault(event);this.prev();}
break;case 39:if(this.options.enableKeyboardNavigation){this.preventDefault(event);this.next();}
break;}},handleClick:function(event){var options=this.options,target=event.target||event.srcElement,parent=target.parentNode,isTarget=function(className){return $(target).hasClass(className)||$(parent).hasClass(className);};if(isTarget(options.toggleClass)){this.preventDefault(event);this.toggleControls();}else if(isTarget(options.prevClass)){this.preventDefault(event);this.prev();}else if(isTarget(options.nextClass)){this.preventDefault(event);this.next();}else if(isTarget(options.closeClass)){this.preventDefault(event);this.close();}else if(isTarget(options.playPauseClass)){this.preventDefault(event);this.toggleSlideshow();}else if(parent===this.slidesContainer[0]){this.preventDefault(event);if(options.closeOnSlideClick){this.close();}else{this.toggleControls();}}else if(parent.parentNode&&parent.parentNode===this.slidesContainer[0]){this.preventDefault(event);this.toggleControls();}},onclick:function(event){if(this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)){delete this.touchDelta;return;}
return this.handleClick(event);},updateEdgeClasses:function(index){if(!index){this.container.addClass(this.options.leftEdgeClass);}else{this.container.removeClass(this.options.leftEdgeClass);}
if(index===this.num-1){this.container.addClass(this.options.rightEdgeClass);}else{this.container.removeClass(this.options.rightEdgeClass);}},handleSlide:function(index){if(!this.options.continuous){this.updateEdgeClasses(index);}
this.loadElements(index);if(this.options.unloadElements){this.unloadElements(index);}
this.setTitle(index);},onslide:function(index){this.index=index;this.handleSlide(index);this.setTimeout(this.options.onslide,[index,this.slides[index]]);},setTitle:function(index){var text=this.slides[index].firstChild.title,titleElement=this.titleElement;if(titleElement.length){this.titleElement.empty();if(text){titleElement[0].appendChild(document.createTextNode(text));}}},setTimeout:function(func,args,wait){var that=this;return func&&window.setTimeout(function(){func.apply(that,args||[]);},wait||0);},imageFactory:function(obj,callback){var that=this,img=this.imagePrototype.cloneNode(false),url=obj,backgroundSize=this.options.stretchImages,called,element,callbackWrapper=function(event){if(!called){event={type:event.type,target:element};if(!element.parentNode){return that.setTimeout(callbackWrapper,[event]);}
called=true;$(img).off('load error',callbackWrapper);if(backgroundSize){if(event.type==='load'){element.style.background='url("'+url+'") center no-repeat';element.style.backgroundSize=backgroundSize;}}
callback(event);}},title;if(typeof url!=='string'){url=this.getItemProperty(obj,this.options.urlProperty);title=this.getItemProperty(obj,this.options.titleProperty);}
if(backgroundSize===true){backgroundSize='contain';}
backgroundSize=this.support.backgroundSize&&this.support.backgroundSize[backgroundSize]&&backgroundSize;if(backgroundSize){element=this.elementPrototype.cloneNode(false);}else{element=img;img.draggable=false;}
if(title){element.title=title;}
$(img).on('load error',callbackWrapper);img.src=url;return element;},createElement:function(obj,callback){var type=obj&&this.getItemProperty(obj,this.options.typeProperty),factory=(type&&this[type.split('/')[0]+'Factory'])||this.imageFactory,element=obj&&factory.call(this,obj,callback);if(!element){element=this.elementPrototype.cloneNode(false);this.setTimeout(callback,[{type:'error',target:element}]);}
$(element).addClass(this.options.slideContentClass);return element;},loadElement:function(index){if(!this.elements[index]){if(this.slides[index].firstChild){this.elements[index]=$(this.slides[index]).hasClass(this.options.slideErrorClass)?3:2;}else{this.elements[index]=1;$(this.slides[index]).addClass(this.options.slideLoadingClass);this.slides[index].appendChild(this.createElement(this.list[index],this.proxyListener));}}},loadElements:function(index){var limit=Math.min(this.num,this.options.preloadRange*2+1),j=index,i;for(i=0;i<limit;i+=1){j+=i*(i%2===0?-1:1);j=this.circle(j);this.loadElement(j);}},unloadElements:function(index){var i,diff;for(i in this.elements){if(this.elements.hasOwnProperty(i)){diff=Math.abs(index-i);if(diff>this.options.preloadRange&&diff+this.options.preloadRange<this.num){this.unloadSlide(i);delete this.elements[i];}}}},addSlide:function(index){var slide=this.slidePrototype.cloneNode(false);slide.setAttribute('data-index',index);this.slidesContainer[0].appendChild(slide);this.slides.push(slide);},positionSlide:function(index){var slide=this.slides[index];slide.style.width=this.slideWidth+'px';if(this.support.transform){slide.style.left=(index*-this.slideWidth)+'px';this.move(index,this.index>index?-this.slideWidth:(this.index<index?this.slideWidth:0),0);}},initSlides:function(reload){var clearSlides,i;if(!reload){this.positions=[];this.positions.length=this.num;this.elements={};this.imagePrototype=document.createElement('img');this.elementPrototype=document.createElement('div');this.slidePrototype=document.createElement('div');$(this.slidePrototype).addClass(this.options.slideClass);this.slides=this.slidesContainer[0].children;clearSlides=this.options.clearSlides||this.slides.length!==this.num;}
this.slideWidth=this.container[0].offsetWidth;this.slideHeight=this.container[0].offsetHeight;this.slidesContainer[0].style.width=(this.num*this.slideWidth)+'px';if(clearSlides){this.resetSlides();}
for(i=0;i<this.num;i+=1){if(clearSlides){this.addSlide(i);}
this.positionSlide(i);}
if(this.options.continuous&&this.support.transform){this.move(this.circle(this.index-1),-this.slideWidth,0);this.move(this.circle(this.index+1),this.slideWidth,0);}
if(!this.support.transform){this.slidesContainer[0].style.left=(this.index*-this.slideWidth)+'px';}},unloadSlide:function(index){var slide,firstChild;slide=this.slides[index];firstChild=slide.firstChild;if(firstChild!==null){slide.removeChild(firstChild);}},unloadAllSlides:function(){var i,len;for(i=0,len=this.slides.length;i<len;i++){this.unloadSlide(i);}},toggleControls:function(){var controlsClass=this.options.controlsClass;if(this.container.hasClass(controlsClass)){this.container.removeClass(controlsClass);}else{this.container.addClass(controlsClass);}},toggleSlideshow:function(){if(!this.interval){this.play();}else{this.pause();}},getNodeIndex:function(element){return parseInt(element.getAttribute('data-index'),10);},getNestedProperty:function(obj,property){property.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(str,singleQuoteProp,doubleQuoteProp,arrayIndex,dotProp){var prop=dotProp||singleQuoteProp||doubleQuoteProp||(arrayIndex&&parseInt(arrayIndex,10));if(str&&obj){obj=obj[prop];}});return obj;},getDataProperty:function(obj,property){if(obj.getAttribute){var prop=obj.getAttribute('data-'+
property.replace(/([A-Z])/g,'-$1').toLowerCase());if(typeof prop==='string'){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(prop)){try{return $.parseJSON(prop);}catch(ignore){}}
return prop;}}},getItemProperty:function(obj,property){var prop=obj[property];if(prop===undefined){prop=this.getDataProperty(obj,property);if(prop===undefined){prop=this.getNestedProperty(obj,property);}}
return prop;},initStartIndex:function(){var index=this.options.index,urlProperty=this.options.urlProperty,i;if(index&&typeof index!=='number'){for(i=0;i<this.num;i+=1){if(this.list[i]===index||this.getItemProperty(this.list[i],urlProperty)===this.getItemProperty(index,urlProperty)){index=i;break;}}}
this.index=this.circle(parseInt(index,10)||0);},initEventListeners:function(){var that=this,slidesContainer=this.slidesContainer,proxyListener=function(event){var type=that.support.transition&&that.support.transition.end===event.type?'transitionend':event.type;that['on'+type](event);};$(window).on('resize',proxyListener);$(document.body).on('keydown',proxyListener);this.container.on('click',proxyListener);if(this.support.touch){slidesContainer.on('touchstart touchmove touchend touchcancel',proxyListener);}else if(this.options.emulateTouchEvents&&this.support.transition){slidesContainer.on('mousedown mousemove mouseup mouseout',proxyListener);}
if(this.support.transition){slidesContainer.on(this.support.transition.end,proxyListener);}
this.proxyListener=proxyListener;},destroyEventListeners:function(){var slidesContainer=this.slidesContainer,proxyListener=this.proxyListener;$(window).off('resize',proxyListener);$(document.body).off('keydown',proxyListener);this.container.off('click',proxyListener);if(this.support.touch){slidesContainer.off('touchstart touchmove touchend touchcancel',proxyListener);}else if(this.options.emulateTouchEvents&&this.support.transition){slidesContainer.off('mousedown mousemove mouseup mouseout',proxyListener);}
if(this.support.transition){slidesContainer.off(this.support.transition.end,proxyListener);}},handleOpen:function(){if(this.options.onopened){this.options.onopened.call(this);}},initWidget:function(){var that=this,openHandler=function(event){if(event.target===that.container[0]){that.container.off(that.support.transition.end,openHandler);that.handleOpen();}};this.container=$(this.options.container);if(!this.container.length){this.console.log('blueimp Gallery: Widget container not found.',this.options.container);return false;}
this.slidesContainer=this.container.find(this.options.slidesContainer).first();if(!this.slidesContainer.length){this.console.log('blueimp Gallery: Slides container not found.',this.options.slidesContainer);return false;}
this.titleElement=this.container.find(this.options.titleElement).first();if(this.num===1){this.container.addClass(this.options.singleClass);}
if(this.options.onopen){this.options.onopen.call(this);}
if(this.support.transition&&this.options.displayTransition){this.container.on(this.support.transition.end,openHandler);}else{this.handleOpen();}
if(this.options.hidePageScrollbars){this.bodyOverflowStyle=document.body.style.overflow;document.body.style.overflow='hidden';}
this.container[0].style.display='block';this.initSlides();this.container.addClass(this.options.displayClass);},initOptions:function(options){this.options=$.extend({},this.options);if((options&&options.carousel)||(this.options.carousel&&(!options||options.carousel!==false))){$.extend(this.options,this.carouselOptions);}
$.extend(this.options,options);if(this.num<3){this.options.continuous=this.options.continuous?null:false;}
if(!this.support.transition){this.options.emulateTouchEvents=false;}
if(this.options.event){this.preventDefault(this.options.event);}}});return Gallery;}));
$(function(){document.getElementById('gallery_link').onclick=function(event){event=event||window.event;var target=event.target||event.srcElement,link=target.src?target.parentNode:target,options={index:link,event:event,onslideend:function(index,slide){},};var gallery=blueimp.Gallery(links,options);};});
