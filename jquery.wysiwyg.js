function initialize() {
  // logger
  window.log = function(){
    log.history = log.history || [];
    log.history.push(arguments);
    window.console && console.log[console.firebug ? 'apply' : 'call'](console, Array.prototype.slice.call(arguments));
  }

  window.logargs = function(context){
    log(context,arguments.callee.caller.arguments); 
  }

  // prep headers for ajax
  $.ajaxSetup({
    'beforeSend' : function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
  });
}

$.fn.wysilol = function() {
  $(this).hide();

  var textAreaVal = $(this).val()
  var editableContent = $(document.createElement('div')).addClass('wysilol_container').attr("contenteditable", true).html(textAreaVal);
  $(this).before(editableContent)
  
  var italicButton = $(document.createElement('li')).addClass("wysilol_italic_button").html('italic');
  var boldButton = $(document.createElement('li')).addClass("wysilol_bold_button").html('bold');
  var unorderedListButton = $(document.createElement('li')).addClass("wysilol_unordered_list_button").html('unordered list');

  var toolbar = $(document.createElement('ul')).addClass("wysilol_toolbar");
  var toolbar = toolbar.append(italicButton)
  var toolbar = toolbar.append(boldButton)
  var toolbar = toolbar.append(unorderedListButton)
  
  italicButton.click(function() {
    document.execCommand("italic", false, null);
  });
  
  boldButton.click(function() {
    document.execCommand("bold", false, null);
  });
  
  unorderedListButton.click(function() {
    document.execCommand("InsertUnorderedList", false, null);
  });
  
  $(editableContent).before(toolbar)
}



$(document).ready(function() {
  initialize();
  
  $("#myText").wysilol();
  
})
