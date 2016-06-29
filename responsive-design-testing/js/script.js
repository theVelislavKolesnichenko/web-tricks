var defaultURL = 'localhost';

//show loading graphic
function showLoader(id) {
  $('#' + id + ' img').fadeIn('slow');
}

//hdie loading graphic
function hideLoader(id) {
  $('#' + id + ' img').fadeOut('slow');
}

//function to check load state of each frame
function allLoaded(){
  var results = [];
  $('iframe').each(function(){
    if(!$(this).data('loaded')){results.push(false)}
  });
  var result = (results.length > 0) ? false : true;
  return result;
};

function setUserAgent(window, userAgent) {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = { get: function () { return userAgent; } };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}

function loadPage($frame, url) {
    debugger
  if ( url.substr(0,7) !== 'http://' && url.substr(0,8) !== 'https://' && url.substr(0, 7) !== 'file://' ) {
    url = 'http://'+url;
  }

  $('iframe').not($frame).each(function(){showLoader($(this).parent().attr('id'));})
  $('iframe').not($frame).data('loaded', false);
  $('iframe').not($frame).attr('src', url);
}

//when document loads
$(document).ready(function(){

  //loadPage('', defaultURL);

  //query string
  var qsArray = window.location.href.split('?');
  var qs = qsArray[qsArray.length-1];

  if(qs != '' && qsArray.length > 1){
    $('#url input[type=text]').val(qs);
    loadPage('', qs);
  }

  //when the url textbox is used
  $('form').submit(function(){
    loadPage('' , $('#url input[type=text]').val());
    return false;
  });

  //when frame loads
  $('iframe').load(function(){

    var $this = $(this);
    var url = '';
    var error = false;

    try{
      url = $this.contents().get(0).location.href;
    } catch(e) {
      error = true;
      if($('#url input[type=text]').val() != ''){
        url = $('#url input[type=text]').val();
      } else {
        url = defaultURL;
      }
    }

    //load other pages with the same URL
    if(allLoaded()){
      if(error){
        alert('Browsers prevent navigation from inside iframes across domains.\nPlease use the textbox at the top for external sites.');
        loadPage('', defaultURL);
      }else{
        loadPage($this, url);
      }
    }

    //when frame loads, hide loader graphic
    else{
      error = false;
      hideLoader($(this).parent().attr('id'));
      $(this).data('loaded',true);
    }
  });

  //sendRequest('http://localhost/');
  
  //  debugger
  //$.ajax({
  //    url: 'http://localhost/',
  //    beforeSend: function (xhr) {
  //        xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5');
  //    },
  //    success: function (data) {
  //        debugger
  //        alert(data);
  //    }
  //});

});

function sendRequest(url) {
    debugger
    var req = new XMLHttpRequest();
    if (!req) return;
    var method = "GET";
    req.open(method, url, true);
    req.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5');
    req.send();
    alert(req.responseBody);
}

