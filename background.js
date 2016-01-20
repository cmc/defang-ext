// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({"title": "DeFang Selected (Make Safe)", "contexts":['selection'], "id": "defang"});  
  chrome.contextMenus.create({"title": "ReFang Selected (Make Unsafe)", "contexts":['selection'], "id": "refang"});
});

// receives message, copies it to clipboard
chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type == 'copy') {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = message.text;
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
//  alert(JSON.stringify(info));
  var sText = info.selectionText;
  if (info.menuItemId == 'defang') { 
    sText = sText.replace(/\./g, '[.]');
    sText = sText.replace(/:\/\//g, '[://]');
    alert("Copied DeFang'd (safe) content: "+sText);
  }
  if (info.menuItemId == 'refang') { 
    sText = sText.replace(/\[\.\]/g, '.');
    sText = sText.replace(/\[:\/\/\]/g, '://');
    alert("Copied REFang'd (UNSAFE) content: "+sText); 
  }
  chrome.runtime.sendMessage({
    type: 'copy',
    text: sText,
  });
};
