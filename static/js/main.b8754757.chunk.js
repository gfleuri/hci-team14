(this["webpackJsonphci-team14"]=this["webpackJsonphci-team14"]||[]).push([[0],{12:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(1),l=n.n(r),c=n(2),s=n(3),i=n(4),u=n(5);function m(e){localStorage.setItem("note-sort",e),k()}function d(e,t){localStorage.setItem("note-id-"+e+"-difficulty",t),k()}null===localStorage.getItem("note-count")&&(localStorage.setItem("note-count",0),localStorage.setItem("note-sort","none"),localStorage.setItem("note-review-progress",0),localStorage.setItem("note-review-total",0));var g=function(e){e.preventDefault()};function v(){localStorage.clear(),localStorage.setItem("note-count",0),localStorage.setItem("note-sort","none"),localStorage.setItem("note-review-progress",0),localStorage.setItem("note-review-total",0),k()}function b(){for(var e=localStorage.getItem("note-count")-1;e>=0;e--)localStorage.setItem("note-id-"+e+"-visibility","true");y(),k()}function f(e){localStorage.setItem("note-id-"+e+"-visibility","false"),y(),k()}function h(){var e=localStorage.getItem("note-count");localStorage.setItem("note-id-"+e+"-title",document.getElementById("title-"+e).value),localStorage.setItem("note-id-"+e+"-context",document.getElementById("context-"+e).value),localStorage.setItem("note-id-"+e+"-visibility","true"),localStorage.setItem("note-id-"+e+"-difficulty","Medium"),localStorage.setItem("note-id-"+e+"-review",""),localStorage.setItem("note-id-"+e+"-checked","false"),localStorage.setItem("note-count",parseFloat(localStorage.getItem("note-count"))+1),document.getElementById("title-"+e).value="",document.getElementById("context-"+e).value="",y()}function E(){for(var e=[],t=function(t){if("true"!==localStorage.getItem("note-id-"+t+"-visibility"))return"continue";var n=localStorage.getItem("note-id-"+t+"-title"),o=localStorage.getItem("note-id-"+t+"-context"),r=localStorage.getItem("note-id-"+t+"-difficulty"),l=localStorage.getItem("note-id-"+t+"-review"),c=localStorage.getItem("note-id-"+t+"-checked"),s="https://www.youtube.com/results?search_query="+n.replace(" ","+"),i="https://www.google.com/search?q=site:edu+"+n.replace(" ","+"),u="https://www.khanacademy.org/search?referer=%2F&page_search_query="+n.replace(" ","+"),m=a.a.createElement("div",{className:"note-style",key:t},a.a.createElement("div",{className:"note-difficulty-button-container"},a.a.createElement("button",{className:"note-button-easy",onClick:function(){return d(t,"Easy")}},"Easy"),a.a.createElement("button",{className:"note-button-medium",onClick:function(){return d(t,"Medium")}},"Medium"),a.a.createElement("button",{className:"note-button-hard",onClick:function(){return d(t,"Hard")}},"Hard")),a.a.createElement("div",{className:"note-difficulty"},"Difficulty: ",r),""!==l&&a.a.createElement("div",null,a.a.createElement("br",null),a.a.createElement("b",null,"Review by ",l),"false"===c&&a.a.createElement("div",{className:"note-progress-button-container"},a.a.createElement("button",{className:"note-button-progress",onClick:function(){return w(t,"true")}},"In Progress")),"true"===c&&a.a.createElement("div",{className:"note-progress-button-container"},a.a.createElement("button",{className:"note-button-complete",onClick:function(){return w(t,"false")}},"Completed"))),a.a.createElement("br",null),a.a.createElement("div",{className:"note-title"},"Title: ",n),a.a.createElement("br",null),a.a.createElement("div",{className:"note-context"},o),a.a.createElement("br",null),a.a.createElement("div",null,"Suggestions"),a.a.createElement("br",null),a.a.createElement("div",null,a.a.createElement("a",{href:s,className:"note-youtube-link"},a.a.createElement("div",{className:"note-youtube-link-context"},"YouTube Video")),a.a.createElement("a",{href:i,className:"note-google-link"},a.a.createElement("div",{className:"note-google-link-context"},"Google Edu")),a.a.createElement("a",{href:u,className:"note-khan-link"},a.a.createElement("div",{className:"note-khan-link-context"},"Khan Acad"))),a.a.createElement("br",null),a.a.createElement("div",null,"Configuration"),a.a.createElement("br",null),a.a.createElement("button",{className:"note-button-edit",onClick:function(){return function(e){window.scrollTo(0,0),document.getElementById("title-"+localStorage.getItem("note-count")).value=localStorage.getItem("note-id-"+e+"-title"),document.getElementById("context-"+localStorage.getItem("note-count")).value=localStorage.getItem("note-id-"+e+"-context"),f(e),y(),localStorage.setItem("note-id-"+e+"-visibility","false"),k()}(t)}},"Edit"),a.a.createElement("button",{className:"note-button-delete",onClick:function(){return f(t)}},"Delete"));"Easy"===localStorage.getItem("note-sort")?"Easy"===r&&e.push(m):"Medium"===localStorage.getItem("note-sort")?"Medium"===r&&e.push(m):"Hard"===localStorage.getItem("note-sort")?"Hard"===r&&e.push(m):e.push(m)},n=localStorage.getItem("note-count")-1;n>=0;n--)t(n);return e}function p(e){var t=new Date,n=0,o=parseInt(localStorage.getItem("note-count")/e);localStorage.getItem("note-count")/e>o&&o++;for(var a=0,r=localStorage.getItem("note-count")-1;r>=0;r--)"true"===localStorage.getItem("note-id-"+r+"-visibility")&&a++;localStorage.setItem("note-review-total",a),localStorage.setItem("note-sort","none");for(var l=localStorage.getItem("note-count")-1;l>=0;l--){var c=new Date;c.setDate(t.getDate()+n),localStorage.setItem("note-id-"+l+"-review",c.toDateString()),l%o===0&&n++}k()}function y(){for(var e=localStorage.getItem("note-count")-1;e>=0;e--)localStorage.setItem("note-id-"+e+"-review",""),localStorage.setItem("note-id-"+e+"-checked","false");localStorage.setItem("note-review-progress",0),localStorage.setItem("note-review-total",0),k()}function w(e,t){localStorage.setItem("note-id-"+e+"-checked",t),"true"===t?localStorage.setItem("note-review-progress",parseInt(localStorage.getItem("note-review-progress"))+1):localStorage.setItem("note-review-progress",parseInt(localStorage.getItem("note-review-progress"))-1),k()}function k(){l.a.render(a.a.createElement(C,null),document.getElementById("load-notes")),l.a.render(a.a.createElement(N,null),document.getElementById("create-note")),l.a.render(a.a.createElement(I,null),document.getElementById("review-notes")),l.a.render(a.a.createElement(S,null),document.getElementById("sort-notes"))}var I=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={response:""},o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=localStorage.getItem("note-review-progress"),t=localStorage.getItem("note-review-total"),n=[],o=100/parseFloat(t)-1+"%",r=parseFloat(e)/parseFloat(t),l=Math.round(100*r),c="You've completed "+e+" out of "+t+" notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";r>.25&&(c="Good job! You're making more progress with "+l+"% completed! That's "+e+" out of "+t+" notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!"),r>.5&&(c="Wow! You're already half way there with "+l+"% reviewed! Amazing, now you've studied "+e+" out of "+t+" notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!"),r>.75&&(c="Almost done! "+l+"% is a great amount of progress that has been made! Not that many notes left! "+e+" out of "+t+" notes are completed! Keep it up! When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!"),1===r&&(c="Congratulations! You've done it! "+l+"%!!! Yup, thats a total of "+t+" reviewed notes! Feel free to continue studying as much as you would like. There's never enough knowledge to learn! As Benjamin Franklin once said, 'An investment in knowledge pays the best interest'. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!");for(var s=0;s<t;s++){var i=a.a.createElement("div",{style:{float:"left",width:o,minWidth:"5px",height:"20px",border:"1px solid #dedede",backgroundColor:"#aad681",borderRadius:"10px",marginRight:"0.5%"}});s>=e&&(i=a.a.createElement("div",{style:{float:"left",width:o,minWidth:"5px",height:"20px",border:"1px solid #dedede",borderRadius:"10px",marginRight:"0.5%"}})),n.push(i)}return a.a.createElement("div",null,a.a.createElement("div",{className:"note-review-title"},"Review Notes"),a.a.createElement("div",null,"How many days do you want for review?"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(2)}},"2"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(3)}},"3"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(4)}},"4"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(5)}},"5"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(6)}},"6"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(7)}},"7"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(8)}},"8"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(9)}},"9"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(10)}},"10"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(11)}},"11"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(12)}},"12"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(13)}},"13"),a.a.createElement("button",{className:"note-review-button-days",onClick:function(){return p(14)}},"14"),"0"!==t&&a.a.createElement("div",{className:"note-review-info"},a.a.createElement("br",null),a.a.createElement("button",{className:"note-review-button-disable",onClick:function(){return y()}},"Disabled Review Feature"),a.a.createElement("br",null),a.a.createElement("div",{style:{marginTop:"20px"}},n,a.a.createElement("span",{style:{color:"white"}},"review")),a.a.createElement("br",null),a.a.createElement("div",{className:"note-review-info-text"},c)))}}]),n}(a.a.Component),S=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={response:""},o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",{className:"note-sort-title"},"Sort Notes"),a.a.createElement("button",{className:"note-sort-button-all",onClick:function(){return m("none")}},"Show All"),a.a.createElement("button",{className:"note-sort-button-easy",onClick:function(){return m("Easy")}},"Sort Easy"),a.a.createElement("button",{className:"note-sort-button-medium",onClick:function(){return m("Medium")}},"Sort Medium"),a.a.createElement("button",{className:"note-sort-button-hard",onClick:function(){return m("Hard")}},"Sort Hard"),a.a.createElement("button",{className:"note-sort-button-rank",onClick:function(){return m("Rank")}},"Sort Ranked"))}}]),n}(a.a.Component),N=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={response:""},o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e="title-"+localStorage.getItem("note-count"),t="context-"+localStorage.getItem("note-count");return a.a.createElement("div",null,a.a.createElement("div",{className:"note-create-title"},"Create Notes"),a.a.createElement("form",{onSubmit:g},a.a.createElement("textarea",{id:e,name:e,rows:"2",cols:"50",placeholder:"Enter a title, theme, or topic here"})),a.a.createElement("form",{onSubmit:g},a.a.createElement("textarea",{id:t,name:t,rows:"5",cols:"50",placeholder:"Enter the context of the note here"})),a.a.createElement("button",{className:"note-create-submit",onClick:h},"Create"),a.a.createElement("button",{className:"note-create-clear",onClick:v},"Clear All"),a.a.createElement("button",{className:"note-create-restore",onClick:b},"Restore All"))}}]),n}(a.a.Component),C=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={response:""},o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=[];return"Rank"===localStorage.getItem("note-sort")?(localStorage.setItem("note-sort","Hard"),e.push(E()),localStorage.setItem("note-sort","Medium"),e.push(E()),localStorage.setItem("note-sort","Easy"),e.push(E())):e=E(),e}}]),n}(a.a.Component),x=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={response:""},o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return setTimeout((function(){document.getElementById("title-text").innerHTML="Develop"}),2e3),setTimeout((function(){document.getElementById("title-text").innerHTML="Retain"}),4e3),a.a.createElement("div",{className:"title-container"},a.a.createElement("div",{className:"title-text-1",id:"title-text"},"Record"),a.a.createElement("div",{className:"title-text-2"},"your own knowledge"),a.a.createElement("div",{className:"title-text-3",style:{marginTop:"20px"}},"Create and Review notes, sort by difficulty,"),a.a.createElement("div",{className:"title-text-3"},"and receive unique user-based suggestions."))}}]),n}(a.a.Component);l.a.render(a.a.createElement(x,null),document.getElementById("title")),l.a.render(a.a.createElement(C,null),document.getElementById("load-notes")),l.a.render(a.a.createElement(N,null),document.getElementById("create-note")),l.a.render(a.a.createElement(I,null),document.getElementById("review-notes")),l.a.render(a.a.createElement(S,null),document.getElementById("sort-notes"))},7:function(e,t,n){e.exports=n(12)}},[[7,1,2]]]);
//# sourceMappingURL=main.b8754757.chunk.js.map