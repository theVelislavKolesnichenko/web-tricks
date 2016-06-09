
var p = $('#fos p');
var divh = $('#fos').height();
while ($(p).outerHeight() > divh) {
  $(p).text(function(index, text) {
    return text.replace(/\W*\s(\S)*$/, '...');
  });
}