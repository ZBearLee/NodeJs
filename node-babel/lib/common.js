'use strict';

var func = function func() {
    return 1;
};

var name = '嘻嘻';
var app = document.querySelector('#app');
app.innerHTML = '\u4F60\u597D:' + name;