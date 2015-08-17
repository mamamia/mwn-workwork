var startStop = '',
    allowedURLs = [];

function $(id) {
    return document.getElementById(id);
}

/*
 * Initializes the UI.
 */
function init() {
    startStop = chrome.extension.getBackgroundPage().config.settings.startStop;
    allowedURLs = chrome.extension.getBackgroundPage().config.settings.allowedURLs;

    // Fill the table with allowed url's
    renderTable(allowedURLs, $('website-list-table'));

    // Set default attributes
    $('start-stop-button').setAttribute("state", startStop);
    // Set the current url as an input value
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var a = document.createElement('a');
        a.href = tabs[0].url;
        document.body.appendChild(a);
        var activeTabUrl = a.protocol + "//" + a.host;
        $('input-field').value = activeTabUrl;
        document.body.removeChild(a);
    });
}


/* Helper to fill the table with urls */
function renderTable(urls, $table) {
    // cleanup table before render
    while ($table.hasChildNodes()) {
        $table.removeChild($table.lastChild);
    }

    for (var i = 0; i < urls.length; i++) {
        var a = document.createElement('a');
        a.href = urls[i];
        a.appendChild(document.createTextNode(urls[i]));
        a.addEventListener('click', onAnchorClick);

        var li = document.createElement('li');
        li.appendChild(a);

        var span = document.createElement('span');
        li.appendChild(span);
        span.addEventListener('click', onRemoveClick);

        $table.appendChild(li);
    }
}

/* Events: enable/disable click */
$('start-stop-button').addEventListener("click", function(event) {
    var target = event.target || event.originalTarget;
    var state = target.getAttribute("state");
    var newState = '';
    if (state == "disable") {
        newState = 'enable';
        // On enable, if current tab is in allowedURLs, reload current tab
        chrome.extension.getBackgroundPage().app.reloadTabOnEnable($('input-field').value);
    } else {
        newState = 'disable';
        // 1. get all open tabs
        // 2. check for oasParam
        // 3. remove oasParam from url and reload tab
        chrome.extension.getBackgroundPage().app.cleanupTabsOnDisable();
    }
    // update state
    chrome.extension.getBackgroundPage().config.settings.startStop = newState;
    // update toolbar icon
    chrome.extension.getBackgroundPage().app.toolbarIcon(newState);
    // uptate popup checkbox
    target.setAttribute("state", newState);
});

/* Events: add new url (+ icon click) */
$('input-field-add').addEventListener("click", function(event) {
    var value = $('input-field').value;
    if (value) {
        allowedURLs = allowedURLs.filter(function(e) {
            return e != value;
        });
        allowedURLs.push(value);
        // save new urls
        chrome.extension.getBackgroundPage().config.settings.allowedURLs = allowedURLs;
        // render again
        init();
        // reload tab
        // chrome.tabs.reload();
    } else {
        return false;
    }
});

/* Event: X icon click (Remove) */
function onRemoveClick(event) {
    var target = event.target || event.originalTarget;
    var url = target.parentNode.childNodes[0].textContent;
    allowedURLs = allowedURLs.filter(function(e) {
        return e != url;
    });
    // save new urls
    chrome.extension.getBackgroundPage().config.settings.allowedURLs = allowedURLs;
    // render again
    init();
    // reload tab
    // chrome.tabs.reload();
}

/* Event: Anchor url click */
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}

// Call `init` to kick things off.
document.addEventListener('DOMContentLoaded', init);