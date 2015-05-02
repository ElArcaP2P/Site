"use strict";var SERVICE_URL="http://192.168.0.10:1337/";angular.module("elArcaP2P",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ngMaterial","ngMdIcons"]).run(["$rootScope","$location","$window",function(e,o,a){e.$on("$stateChangeSuccess",function(){a.ga&&a.ga("send","pageview",{page:o.path()})})}]).config(["$stateProvider","$urlRouterProvider","$mdThemingProvider",function(e,o,a){e.state("map",{url:"/",templateUrl:"app/map/map.html",controller:"MapCtrl"}).state("acerca_de",{url:"acerca_de",parent:"map",templateUrl:"app/map/empty.html",controller:"QueCtrl"}).state("subite",{url:"subite/:lat,:lng",parent:"map",templateUrl:"app/map/empty.html",controller:"SubiteCtrl"}),o.otherwise("/"),a.theme("default").primaryPalette("blue-grey").accentPalette("red")}]),angular.module("elArcaP2P").factory("Srv",["$http",function(e){return self.sendForm=function(o,a){return e({method:"POST",url:SERVICE_URL+"forms/"+o,data:a})},self.getMarkers=function(o){return e({method:"GET",url:SERVICE_URL+"markers",data:o})},self}]),angular.module("elArcaP2P").factory("Markers",["$http",function(e){return self.sendForm=function(o,a){return e({method:"POST",url:SERVICE_URL+"forms/"+o,data:a})},self.getMarkers=function(o){return e({method:"GET",url:SERVICE_URL+"markers",data:o})},self}]),angular.module("elArcaP2P").factory("GeoLoc",function(){var e={lat:-34.919787,lng:-57.933096400000004};return"geolocation"in navigator&&navigator.geolocation.getCurrentPosition(function(o){e.lat=o.coords.latitude,e.lng=o.coords.longitude}),e}),angular.module("elArcaP2P").controller("SubiteCtrl",["$scope","$stateParams","$mdToast","$mdDialog","$http","$location","$templateCache","GeoLoc","Srv",function(e,o,a,t,n,i,l,r,d){function c(e){var o=angular.element(document.body);t.show({parent:o,template:e,controller:u})["finally"](function(){i.path("/")})}n({method:"GET",url:"app/routes/subite/subite.html",cache:l}).success(function(e){c(e)}).error(function(){});var u=function(a,t){function n(){return function(e,o){a.form.position=[o.lng(),o.lat()],a.location.center=o,a.$apply("location")}}function l(e){return function(o,a){e.form.position=[a.lng(),a.lat()],c.geocode({latLng:a},function(o,a){a==google.maps.GeocoderStatus.OK&&(e.form.lugar=o[0].formatted_address,e.$apply("form.lugar"))})}}e.$on("$stateChangeStart",function(){t.hide()}),a.closeDialog=function(){t.hide(),i.path("/")},a.form={tipo:"tipo",subtipo:!1,position:[parseFloat(o.lng||r.lng),parseFloat(o.lat||r.lat)]},a.$watch("form.tipo",function(e){a.state="app/routes/subite/step_"+e+".html"}),a.$watch("form.subtipo",function(e){e&&(a.state="app/routes/subite/step_col_"+e+".html")}),a.location={center:new google.maps.LatLng(a.form.position[1],a.form.position[0])};var c=new google.maps.Geocoder;c.geocode({latLng:{lng:a.form.position[0],lat:a.form.position[1]}},function(e,o){o==google.maps.GeocoderStatus.OK&&(a.form.lugar=e[0].formatted_address,a.$apply("form.lugar"))}),a.$on("geocomplete:result",n()),a.$on("location:position",l(a)),a.loading=!1,a.enviar=function(){a.loading=!0,d.sendForm("subite",a.form).then(function(){a.loading=!1}),a.state="app/routes/subite/step_gracias.html"},a.donar=function(){a.enviar(),$("#donacion").submit()}};u.$inject=["scope","$mdDialog"]}]),angular.module("elArcaP2P").controller("QueCtrl",["$scope","$mdDialog","$http","$location","$templateCache",function(e,o,a,t,n){function i(e){var a=angular.element(document.body);o.show({parent:a,template:e,controller:r})["finally"](function(){t.path("/")})}a({method:"GET",url:"app/routes/que/que.html",cache:n}).success(function(e){i(e)}).error(function(){});var l={base:"app/routes/que/que_base.html",nosotros:"app/routes/que/nosotros/nosotros.html",presentacion:"app/routes/que/presentacion/presentacion.html"},r=function(o,a){e.$on("$stateChangeStart",function(){a.hide()}),o.state=l.base,o.fullScreen=!1,o.closeDialog=function(){a.hide()},o["goto"]=function(e,a){o.state=l[e],o.fullScreen=a||!1}};r.$inject=["scope","$mdDialog"]}]),angular.module("elArcaP2P").directive("spinner",function(){return console.log("sarasa"),{restrict:"E",templateUrl:"app/directives/spinner/spinner.html",replace:!0,scope:{},link:function(){}}}),angular.module("elArcaP2P").directive("scale2parent",function(){return{restrict:"A",scope:{},link:function(e,o){function a(){o.height(o.parent().height())}function t(){var e,o=document.createElement("fakeelement"),a={WebkitTransition:"webkitTransitionEnd",transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend"};for(e in a)if(void 0!==o.style[e])return a[e]}$(window).on("resize",a);var n=t();n&&window.addEventListener(n,function(){a(),console.log("Transition complete!  This is the callback, no library needed!")})}}}),angular.module("elArcaP2P").directive("removeParentFlex",function(){return{restrict:"A",scope:{},link:function(e,o,a){var t=a.removeParentFlex.split(",");angular.forEach(t,function(e){o.parents(e).removeAttr("flex")})}}}),angular.module("elArcaP2P").directive("map",["$rootScope",function(){return{restrict:"A",scope:{map:"=",events:"="},link:function(e,o){var a=L.map(o.attr("id")),t=e.events||{};angular.forEach(t,function(e,o){a.on(o,e)}),e.map=a}}}]),angular.module("elArcaP2P").directive("location",["$rootScope",function(e){return{restrict:"A",scope:{config:"="},link:function(o,a){var t={zoom:13,center:o.config.center,scrollwheel:!1},n=new google.maps.Map(a[0],t),i=new google.maps.Marker({position:o.config.center,map:n,title:"Aca!",draggable:!0,animation:google.maps.Animation.DROP});i.addListener("dragend",function(){var a=i.getPosition();(a.lat()!=o.config.center.lat()||a.lng()!=o.config.center.lng())&&e.$broadcast("location:position",a)}),n.addListener("click",function(a){var t=a.latLng;(t.lat()!=o.config.center.lat()||t.lng()!=o.config.center.lng())&&(i.setPosition(t),e.$broadcast("location:position",t))}),o.$watch("config.center",function(e){n.setCenter(e),i.setPosition(e)})}}}]),angular.module("elArcaP2P").directive("geocomplete",["$rootScope",function(e){return{restrict:"A",scope:{config:"="},link:function(o,a){var t={},n=new google.maps.places.Autocomplete(a[0],t),i=new google.maps.Geocoder;n.addListener("place_changed",function(){var o=n.getPlace();return o.geometry?void e.$broadcast("geocomplete:result",o.geometry.location):void i.geocode({address:o.name},function(o,a){return a==google.maps.GeocoderStatus.OK?void e.$broadcast("geocomplete:result",o[0].geometry.location):void 0})}),$(a).attr("placeholder","")}}}]),angular.module("elArcaP2P").controller("NavbarCtrl",["$scope",function(){}]);var SERVICE_URL="/";angular.module("elArcaP2P").controller("MapCtrl",["$scope","$state","Srv",function(e,o,a){function t(o){0!=r&&o.popup==r.getPopup()&&(e.map.removeLayer(r),r=!1)}var n,i={Comic:L.tileLayer("http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.{format}?access_token={access_tocken}",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',access_tocken:"pk.eyJ1IjoibmFjYWx0IiwiYSI6InA1MXJqaDAifQ.-ijEh3Iqt1y34rIr5lbPOg",mapid:"nacalt.fc0fff05",format:"png32"}),Hibrida:new L.Google("HYBRID"),Satelite:new L.Google("SATELLITE")},l={fecha:L.AwesomeMarkers.icon({icon:"fa-headphones",prefix:"fa",markerColor:"green"}),hospedaje:L.AwesomeMarkers.icon({icon:"fa-bed",prefix:"fa",markerColor:"red"}),colaboracion_economica:L.AwesomeMarkers.icon({icon:"fa-money",prefix:"fa",markerColor:"green"}),colaboracion_creativa:L.AwesomeMarkers.icon({icon:"fa-heart",prefix:"fa",markerColor:"red"}),colaboracion_logistica:L.AwesomeMarkers.icon({icon:"fa-car",prefix:"fa",markerColor:"red"}),media_texto:L.AwesomeMarkers.icon({icon:"fa-comment",prefix:"fa",markerColor:"cadetblue"}),media_imagen:L.AwesomeMarkers.icon({icon:"fa-camera",prefix:"fa",markerColor:"cadetblue"}),media_video:L.AwesomeMarkers.icon({icon:"fa-video-camera",prefix:"fa",markerColor:"cadetblue"})};e.$watch("map",function(o){o&&(a.getMarkers().success(function(a){var t=L.markerClusterGroup();n=L.geoJson(a,{onEachFeature:function(e){var o=e.properties.tipo;e.properties.subtipo&&(o+="_"+e.properties.subtipo);var a=L.marker(e.geometry.coordinates.reverse(),{icon:l[o]}).addTo(t);a.bindPopup(e.properties.nombre)}}),o.addLayer(i.Comic),o.addLayer(t),o.addControl(new L.Control.Layers(i,{})),e.map.fitBounds(t.getBounds())}),e.$watch("map"))});var r=!1,d=function(a){0!=r&&e.map.removeLayer(r),r=L.marker(a.latlng).addTo(e.map);var t=$('<button class="md-raised md-primary md-button md-default-theme" tabindex="0">¡Propone un destino!</button>').click(function(){o.go("subite",{lat:a.latlng.lat,lng:a.latlng.lng})})[0];r.bindPopup(t).openPopup()};e.evMap={click:d,popupclose:t}}]),angular.module("elArcaP2P").controller("MainCtrl",["$scope",function(){}]),angular.module("elArcaP2P").run(["$templateCache",function(e){e.put("app/main/main.html",'<div layout="vertical" layout-fill=""><md-content layout-fill="" role="main"><md-content ng-include="\'app/map/map.html\'"></md-content></md-content></div>'),e.put("app/map/empty.html",""),e.put("app/map/map.html",'<div id="map" map="map" events="evMap"></div><ui-view></ui-view>'),e.put("components/navbar/navbar.html",'<md-toolbar id="navbar" class="900"><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Settings">El Arcap2p</md-button><span flex="" layout="row" layout-align="center center"><md-button ui-sref="subite" aria-label="¡Subite!"><md-tooltip>¡Se parte del Arca!</md-tooltip>¡Subite!</md-button></span><div class="menu" layout-align="start center"><md-tooltip>¿Que? ¿Quienes?</md-tooltip><md-button ui-sref="acerca_de" aria-label="Acerca de">Acerca de</md-button></div></div></md-toolbar>'),e.put("app/directives/spinner/spinner.html",'<div class="spinner-container"><svg class="spinner" width="65px" height="65px" viewbox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>'),e.put("app/routes/que/que.html",'<md-dialog ng-class="{\'md-dialog-fullsize\': fullScreen}" aria-label="List dialog"><md-content ng-include="state"></md-content></md-dialog>'),e.put("app/routes/que/que_base.html",'<div layout="row" layout-margin="" layout-fill="" layout-align="center center"><div flex=""><md-button class="md-primary md-raised" ng-click="goto(\'presentacion\',true)">¿Que es el El Arca?</md-button></div><div flex=""><md-button class="md-primary md-raised" ng-click="goto(\'nosotros\')">¿Quienes somos?</md-button></div></div>'),e.put("app/routes/subite/step_col_creativa.html",'<div layout="column"><md-input-container><label>Hacenos tu propuesta</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div class="lugar" layout="column"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div layout="row" layout-align="end end"><md-button ng-click="enviar()" class="md-raised md-primary">Enviar</md-button></div>'),e.put("app/routes/subite/step_col_economica.html",'<div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div layout="column"><md-input-container><label>Comentarios</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div class="lugar" layout="column"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div layout="row" layout-align="end end"><md-button ng-click="donar()" class="md-raised md-primary">Continuar</md-button></div><form id="donacion" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="hosted_button_id" value="VAKA9R3MZ5PR4"> <input type="hidden" name="lc" value="ES"></form>'),e.put("app/routes/subite/step_col_logistica.html",'<div layout="column"><md-input-container><label>Hacenos tu propuesta</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div class="lugar" layout="column"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div layout="row" layout-align="end end"><md-button ng-click="enviar()" class="md-raised md-primary">Enviar</md-button></div>'),e.put("app/routes/subite/step_colaboracion.html",'<md-radio-group ng-model="form.subtipo"><md-radio-button value="creativa">Creativamente</md-radio-button><md-radio-button value="economica">Económicamente</md-radio-button><md-radio-button value="logistica">Logísticamente</md-radio-button></md-radio-group>'),e.put("app/routes/subite/step_fecha.html",'<div layout="column"><md-input-container><label>Contanos tu propuesta</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div layout="column" class="lugar"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div ng-if="false" layout="row" id="lugarCont"><md-content id="lugar" flex="" location=""></md-content></div><div layout="row" layout-align="end end"><md-button ng-click="enviar()" class="md-raised md-primary">Enviar</md-button></div>'),e.put("app/routes/subite/step_gracias.html",'<div ng-if="loading" layout-align="center center"><spinner></spinner></div><div class="gracias" remove-parent-flex="md-dialog" ng-show="!loading"><div layout="" layout-sm="column"><img src="http://2.bp.blogspot.com/-VxNPVSlfayI/U0sbnOEG50I/AAAAAAAAAoU/1ccYGlcdr6E/s1600/monkeydance.gif" alt="¡Like a Chango!"></div><h2>¡Gracias!</h2></div>'),e.put("app/routes/subite/step_hospedaje.html",'<div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div layout="column"><md-input-container><label>Comentarios</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div class="lugar" layout="column"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div ng-if="false" layout="row" id="lugarCont"><md-content id="lugar" flex="" location=""></md-content></div><div layout="row" layout-align="end end"><md-button ng-click="enviar()" class="md-raised md-primary">Enviar</md-button></div>'),e.put("app/routes/subite/step_talleres.html",'<md-radio-group ng-model="form.tipo"><md-radio-button value="talleres_nacho">¿Con Nacho?</md-radio-button><md-radio-button value="talleres_yan">¿Con Yan?</md-radio-button></md-radio-group>'),e.put("app/routes/subite/step_talleres_nacho.html",'<div layout="" layout-sm="column" layout-align="center center"><md-select flex="" placeholder="¿Que taller?" ng-model="form.taller"><md-option value="tarot">Introduccion a Linux, es hora de progresar</md-option><md-option value="improvisación">Aprende a programar, de la nada</md-option><md-option value="improvisación">Sistemas distribuidos, de la nube al telefono</md-option></md-select></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div layout="column"><md-input-container><label>Comentarios</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div class="lugar" layout="column"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div layout="row" layout-align="end end"><md-button ng-click="enviar()" class="md-raised md-primary">Enviar</md-button></div>'),e.put("app/routes/subite/step_talleres_yan.html",'<div layout="" layout-sm="column" layout-align="center center"><md-select flex="" placeholder="¿Que taller?" ng-model="form.taller"><md-option value="tarot">Introducción al Tarot de Marsella</md-option><md-option value="improvisación">Improvisación musical y escritura creativa</md-option></md-select></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Tu nombre</label> <input ng-model="form.nombre"></md-input-container><md-input-container flex=""><label>Email</label> <input ng-model="form.email"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Teléfono</label> <input ng-model="form.telefono"></md-input-container></div><div layout="column"><md-input-container><label>Comentarios</label> <textarea ng-model="form.mensage"></textarea></md-input-container></div><div class="lugar" layout="column"><md-input-container flex=""><label>Lugar</label> <input ng-model="form.lugar" geocomplete=""></md-input-container><div id="lugar" class="map" location="" config="location"></div></div><div layout="row" layout-align="end end"><md-button ng-click="enviar()" class="md-raised md-primary">Enviar</md-button></div>'),e.put("app/routes/subite/step_tipo.html",'<md-radio-group ng-model="form.tipo"><md-radio-button value="fecha">¿Querés invitarnos a tocar a tu pueblo, tu ciudad o tu casa?</md-radio-button><md-radio-button value="talleres">¿Te interesan nuestros talleres?</md-radio-button><md-radio-button value="hospedaje">¿Querés hospedarnos?</md-radio-button><md-radio-button value="colaboracion">¿Querés participar?</md-radio-button></md-radio-group>'),e.put("app/routes/subite/subite.html",'<md-dialog flex="" layout-padding="" aria-label="List dialog"><md-content layout-padding=""><div ng-include="state"></div></md-content></md-dialog>'),e.put("app/routes/que/nosotros/nosotros.html",'<div class="nosotros"><md-tabs md-dynamic-height="" md-border-bottom=""><md-tab label="Musicador"><md-content class="md-padding"><h1 class="md-display-2">Yan Adrover</h1><p>Como solista, en trío, cuarteto, orquesta. Amplificado, de piso, acústico, eléctrico. De los clubs más grandes del mundo en Ibiza, salas de prestigio en París, Amsterdam y Bruselas a centros culturales. De trovador a músico sesionista para Kym Mazelle -James Brown y Maceo Parker-. De orquestas iraníes, griegas y catalanas a componer para Chanel. Yan Adrover se adapta a todos los formatos básicamente porque es músico y eso hace, música. Se desempeñó como diseñador, como coordinador y miembro de colectivos interdisciplinarios de danza, teatro y audiovisuales. También como realizador de clips para Circo Divino. Fundó Incall, donde se trabaja con tecnologías de la información aplicadas a la gestión cultural y producción artística como Conciertos de Sillón y la plataforma Hayunrío. Ideó Laboratorio Y en París, junto a bailarines, actores y músicos argentinos, franceses, belgas y chilenos.</p><p>En el 2014 presentó Hayunrío en el Teatro Coliseo Podestá, La Plata, con más de sesenta artistas en escena, localidades agotadas y la grabación de un DVD. En el 2015, fue incluido en la selección personal de Lisandro Aristimuño, Música Sin Fines de Lucro.</p><a target="_blank" href="http://yanadrover.com/">¿Queres saber mas del trabajo de Yan?</a></md-content></md-tab><md-tab label="Programista"><md-content class="md-padding"><h1 class="md-display-2">Nacho Althabe</h1><p>Un rockstart de la web evangelizador de los procesos distribuidos y Javascript.</p><p>Nacho se formo en cuevas, pasando infinitas noches de nerdeada navegando los eternos mares del saber digital. Le gusta transmitir, en muchos sentidos. Desde conocimientos hasta eventos.</p><a target="_blank" href="https://ar.linkedin.com/in/nachoalthabe">¿Te interesa saber de su prontuario?</a></md-content></md-tab></md-tabs></div>'),e.put("app/routes/que/presentacion/presentacion.html",'<div class="presentacion"><iframe scale2parent="" src="https://docs.google.com/presentation/d/1nUVZIWlCh9eCpMojcH0p8SbLuE90OkYR8lhg1I5kc7s/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>')}]);