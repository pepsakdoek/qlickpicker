!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return t={},n.m=C={"./src/index.ts":
/*!**********************!*
  !*** ./src/index.ts ***!  
  
  **********************/ 
/*! no static exports found */function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,C=1,t=arguments.length;C<t;C++)for(var n in R=arguments[C])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});
/*!
  @license
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
var _=R(/*! ./types */"./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R(/*! ./types */"./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new")};function E(e){return e.type===_.ConfigDataElementType.DIMENSION||e.type===_.ConfigDataElementType.METRIC}function r(e){return e===_.ConfigDataElementType.DIMENSION?-1:1}function a(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var C,t=(C=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return C(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return t.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var C,t,n={};return t=R,((C=e).length<t.length?C.map(function(e,R){return[e,t[R]]}):t.map(function(e,R){return[C[R],e]})).forEach(function(e){var R=e[0],C=e[1];void 0===n[C]&&(n[C]=[]),n[C].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),C={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){C[e.id]=e.value.map(function(e){return R[e]})})}),C};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){if(void 0!==R[e.id])throw new Error("styleIds must be unique. Your styleId: '"+e.id+"' is used more than once.");R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case _.DSInteractionType.FILTER:return _.InteractionType.FILTER}}function s(e,R){var C,t,n,i;if(R.configId){var a=e.fields[R.configId];if(a)return(i={}).name=a.name,i.concept=f(a.concept),i}return t=R.configId,(n=e.config.data.find(function(e){return e.elements.find(function(e){return e.id===t})}))?(C=n.elements.find(function(e){return e.id===t}),(i={}).name=C.name,i.concept=f(C.type),i):void 0}function c(e){var R={};return e.forEach(function(e){var C=e.id,t=e.value;R[C]={value:t,supportedActions:e.supportedActions.map(n)}}),R}function f(e){switch(e){case _.ConfigDataElementType.DIMENSION:return _.ConceptType.DIMENSION;case _.ConfigDataElementType.METRIC:return _.ConceptType.METRIC;case _.ConceptType.METRIC:return _.ConceptType.METRIC;case _.ConceptType.DIMENSION:return _.ConceptType.DIMENSION}}function l(e){var R,C=(R=e,Object.keys(R.fields).map(function(e){var C,t,n,i,a,o=R.fields[e],E={};return E.id=o.id,E.name=o.name,E.description=o.description,E.type=o.type,E.concept=o.concept,(a=R.style[o.id])&&(E.style=a.value),(C=R.config,t=o.id,n=void 0,(i=C.data.find(function(e){return e.elements.find(function(e){return e.id===t})}))&&(n=i.elements.find(function(e){return e.id===t})),n)&&(E.name=n.name),E}));return C.map(o(e.dataset))}function u(e){var R,C,t;return{tables:(R={},R[_.Table.DEFAULT]=[],R),fields:[],style:(t={},(C=e.config.style||[]).forEach(function(R){R.elements.forEach(function(e){t[e.id]=e})}),t)}}var d,m,p={};p.transform=function(e){var R,C,t,n,i,a=l(i={fields:(R=e.dataResponse.dataConfig.data,C={},R.forEach(function(R){R.elements.forEach(function(e){C[e.id]=e})}),C),dataset:e.dataResponse.data,config:e.dataResponse.dataConfig,style:(t={},(n=e.dataResponse.dataConfig.style||[]).forEach(function(R){R.elements.forEach(function(e){t[e.id]=e})}),t)});return{tables:((a={})[_.Table.DEFAULT]=s,a),fields:C,style:t}};var g,T,b,h=p.transform;try{for(var I=(d=Object.values(e.dataResponse.data[0].data_id.matrix).map(function(e){return e.metric_value?e.dimension_value.concat(e.metric_value):e.dimension_value}))[Symbol.iterator]();!(g=I.next()).done;){var v=g.value;for(var y=(b=void 0,T=v[Symbol.iterator]());!(b=T.next()).done;){var O=b.value}}}catch(e){m={error:e}}finally{try{g&&!g.done&&(T=I.return)&&T.call(I)}finally{if(m)throw m.error}}p.tableTransform=function(e){var R=e.dataResponse,C=R.data.map(function(e){return e.rows}),t=e.dataResponse.fields,n={};return t.forEach(function(e,R){e.id,n[e.id]=R}),C.map(function(t){return t.map(function(e){var R={};return e.forEach(function(e,C){R[t[C].id]=e}),R})})},p.objectTransform=function(e){var R,C=e.dataResponse,t=a(C.dataConfig),n=C.data.map(function(e){return e.rows});if(0===n.length)return u(C);var i,E=n[0].map(function(e,R){var C,n,i,a;return n=e,i=R,(a=(C=t)[i])?s(C,a):void 0});return{tables:((i={})[_.Table.DEFAULT]=o(E)(n),i),fields:(R={},C.dataConfig.data.forEach(function(C){C.elements.forEach(function(e){R[e.id]=e})}),R),style:U(C.dataConfig),theme:Y(C.dataConfig),interactions:c(C.dataConfig.interactions||[])}};var D,S,A;N.tableTransform=p.tableTransform,N.objectTransform=function(e){var R=p.objectTransform(e);return R.tables[_.Table.DEFAULT]=R.tables[_.Table.DEFAULT].map(function(R){var C,t,n=(C={},Object.keys(R).forEach(function(e){C[e]=R[e][0]}),C);return(t=e.dataResponse.dataConfig.data.find(function(e){return"DEFAULT"===e.id}))&&t.elements.filter(function(e){return e.type===_.ConfigDataElementType.METRIC}).forEach(function(e){n[e.id]=Number(n[e.id])}),n}),R},N.dscc=p,N.sendInteraction=function(e,R,C){var t;window.parent.postMessage({type:"interaction",interactionId:e,data:(t={},t[R]=C,t)},"*")},N.subscribeToData=function(R,C){var t=new URLSearchParams(window.location.search);if(null===t.get("dscId"))throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new");var n=!1,i=!1;window.addEventListener("message",function(e){if(e.source===window.parent&&e.data&&e.data.type){var t;if(e.data.type===_.MessageType.RENDER){if(i)return;n||(n=!0,console.log("Initial render. Subscribe to data to receive updates.")),t=C.transform(e.data),R(t)}else console.error("Unknown post message type: "+e.data.type)}}),D=R,S=C,(A={type:"ready"}).componentId=N.getComponentId(),window.parent.postMessage(A,"*")}},{"./src/types.ts":
/*!**********************!*
  !*** ./src/types.ts ***!  
  
  **********************/ 
/*! no static exports found */
"use strict";var t,n,E,r,o,N;Object.defineProperty(R,"__esModule",{value:!0}),(t=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",t.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(n=R.FieldType||(R.FieldType={})).YEAR="YEAR",n.YEAR_QUARTER="YEAR_QUARTER",n.YEAR_MONTH="YEAR_MONTH",n.YEAR_WEEK="YEAR_WEEK",n.YEAR_MONTH_DAY="YEAR_MONTH_DAY",n.YEAR_MONTH_DAY_HOUR="YEAR_MONTH_DAY_HOUR",n.QUARTER="QUARTER",n.MONTH="MONTH",n.WEEK="WEEK",n.MONTH_DAY="MONTH_DAY",n.DAY_OF_WEEK="DAY_OF_WEEK",n.DAY="DAY",n.HOUR="HOUR",n.MINUTE="MINUTE",n.DURATION="DURATION",n.COUNTRY="COUNTRY",n.COUNTRY_CODE="COUNTRY_CODE",n.CONTINENT="CONTINENT",n.CONTINENT_CODE="CONTINENT_CODE",n.SUB_CONTINENT="SUB_CONTINENT",n.SUB_CONTINENT_CODE="SUB_CONTINENT_CODE",n.REGION="REGION",n.REGION_CODE="REGION_CODE",n.CITY="CITY",n.CITY_CODE="CITY_CODE",n.METRO_CODE="METRO_CODE",n.LATITUDE_LONGITUDE="LATITUDE_LONGITUDE",n.NUMBER="NUMBER",n.PERCENT="PERCENT",n.TEXT="TEXT",n.BOOLEAN="BOOLEAN",n.URL="URL",n.IMAGE="IMAGE",n.CURRENCY_AED="CURRENCY_AED",n.CURRENCY_ALL="CURRENCY_ALL",n.CURRENCY_ARS="CURRENCY_ARS",n.CURRENCY_AUD="CURRENCY_AUD",n.CURRENCY_BDT="CURRENCY_BDT",n.CURRENCY_BGN="CURRENCY_BGN",n.CURRENCY_BOB="CURRENCY_BOB",n.CURRENCY_BRL="CURRENCY_BRL",n.CURRENCY_CAD="CURRENCY_CAD",n.CURRENCY_CDF="CURRENCY_CDF",n.CURRENCY_CHF="CURRENCY_CHF",n.CURRENCY_CLP="CURRENCY_CLP",n.CURRENCY_CNY="CURRENCY_CNY",n.CURRENCY_COP="CURRENCY_COP",n.CURRENCY_CRC="CURRENCY_CRC",n.CURRENCY_CZK="CURRENCY_CZK",n.CURRENCY_DKK="CURRENCY_DKK",n.CURRENCY_DOP="CURRENCY_DOP",n.CURRENCY_EGP="CURRENCY_EGP",n.CURRENCY_ETB="CURRENCY_ETB",n.CURRENCY_EUR="CURRENCY_EUR",n.CURRENCY_GBP="CURRENCY_GBP",n.CURRENCY_HKD="CURRENCY_HKD",n.CURRENCY_HRK="CURRENCY_HRK",n.CURRENCY_HUF="CURRENCY_HUF",n.CURRENCY_IDR="CURRENCY_IDR",n.CURRENCY_ILS="CURRENCY_ILS",n.CURRENCY_INR="CURRENCY_INR",n.CURRENCY_IRR="CURRENCY_IRR",n.CURRENCY_ISK="CURRENCY_ISK",n.CURRENCY_JMD="CURRENCY_JMD",n.CURRENCY_LKR="CURRENCY_LKR",n.CURRENCY_LTL="CURRENCY_LTL",n.CURRENCY_LVL="CURRENCY_LVL",n.CURRENCY_MAD="CURRENCY_MAD",n.CURRENCY_MMK="CURRENCY_MMK",n.CURRENCY_MXN="CURRENCY_MXN",n.CURRENCY_MYR="CURRENCY_MYR",n.CURRENCY_NGN="CURRENCY_NGN",n.CURRENCY_NOK="CURRENCY_NOK",n.CURRENCY_NPR="CURRENCY_NPR",n.CURRENCY_NZD="CURRENCY_NZD",n.CURRENCY_PAB="CURRENCY_PAB",n.CURRENCY_PEN="CURRENCY_PEN",n.CURRENCY_PHP="CURRENCY_PHP",n.CURRENCY_PKR="CURRENCY_PKR",n.CURRENCY_PLN="CURRENCY_PLN",n.CURRENCY_RON="CURRENCY_RON",n.CURRENCY_RSD="CURRENCY_RSD",n.CURRENCY_RUB="CURRENCY_RUB",n.CURRENCY_SAR="CURRENCY_SAR",n.CURRENCY_SEK="CURRENCY_SEK",n.CURRENCY_SGD="CURRENCY_SGD",n.CURRENCY_THB="CURRENCY_THB",n.CURRENCY_TRY="CURRENCY_TRY",n.CURRENCY_TWD="CURRENCY_TWD",n.CURRENCY_TZS="CURRENCY_TZS",n.CURRENCY_UAH="CURRENCY_UAH",n.CURRENCY_USD="CURRENCY_USD",n.CURRENCY_UYU="CURRENCY_UYU",n.CURRENCY_VEF="CURRENCY_VEF",n.CURRENCY_VND="CURRENCY_VND",n.CURRENCY_YER="CURRENCY_YER",n.CURRENCY_ZAR="CURRENCY_ZAR",(E=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",E.DIMENSION="DIMENSION",(r=R.InteractionType||(R.InteractionType={})).FILTER="FILTER",(o=R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(N=R.Table||(R.Table={})).DEFAULT="DEFAULT",N.COMPARISON="COMPARISON"});

const drawViz = (data) => {
  // Clear the body
  document.body.innerHTML = '';

  // Create a container
  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);

  // Get style settings
  const layout = data.style.layoutSelect.value;
  const fill = data.style.fillLeftToRight.value;

  // Apply layout styles
  container.style.flexWrap = 'wrap';
  if (layout === 'FORCE_COL1') {
    container.style.flexDirection = 'column';
  } else if (layout === 'FORCE_ROW1') {
    container.style.flexDirection = 'row';
  } else { // AUTO
    if (fill === 'T2BLR') {
      container.style.flexDirection = 'column';
    } else {
      container.style.flexDirection = 'row';
    }
  }


  // Get the dimension field id.
  const dimId = data.fields['dim'][0].id;

  // Get selected values
  const selectedValues = data.interactions.filter.value ? data.interactions.filter.value.data[dimId].values : [];

  // Draw items
  data.tables.DEFAULT.forEach(row => {
    const item = document.createElement('div');
    item.className = 'item';
    const dimValue = row[dimId][0];
    item.textContent = dimValue;

    // Set selection state
    if (selectedValues.includes(dimValue)) {
      item.classList.add('selected');
    } else {
      item.classList.add('not-selected');
    }

    // Handle click
    item.addEventListener('click', () => {
      const interactionData = {
        concepts: [dimId],
        values: [
          [dimValue]
        ]
      };
      dscc.sendInteraction('filter', 'FILTER', interactionData);
    });

    container.appendChild(item);
  });
};

dscc.subscribeToData(drawViz, {
  transform: dscc.objectTransform
});