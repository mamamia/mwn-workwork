/*
 * OAS console Chrome Extension 
 * Designed for MWN
 */

var app = {
    allowedURLs: '',

    toolbarIcon: function(state) {
        chrome.browserAction.setIcon({
            path: "../../data/icons/icon19-" + state + ".png"
        });
    },

    parseUrlDomain: function(url) {
        /* generate key */
        var key = url.match(/:\/\/(?:www\.)?(.[^/]+)(.*)/);
        return key && key.length ? key[1] : '';
    },

    reloadTabOnEnable: function(url) {
        if (app.allowedURLs.indexOf(url) !== -1) {
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
                var currentUrl = tabs[0].url;
                // Update tab if not in admin area
                if (app.adminUrlCheck(currentUrl)) {
                    chrome.tabs.update(tabs[0].id, {
                        url: app.addOasParam(currentUrl)
                    });
                }
            });
        }
    },

    cleanupTabsOnDisable: function() {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                var currentUrl = tabs[i].url;

                // Check if show_console is part of url
                if (currentUrl.indexOf(config.oasParam) !== -1) {
                    // Update tab
                    chrome.tabs.update(tabs[i].id, {
                        url: app.removeOasParam(currentUrl)
                    });
                }
            }
        });
    },

    removeOasParam: function(url) {
        if (url.indexOf("?"+config.oasParam) !== -1) {
            url = url.replace("?"+config.oasParam, '');
        }

        if (url.indexOf("&"+config.oasParam) !== -1) {
            url = url.replace("&"+config.oasParam, '');
        }

        return url;
    },

    addOasParam: function(url) {
        var hashStart   = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
        var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';

        return url.substring(0, hashStart) +
                (url.indexOf('?') === -1 ? '?' : '&') +
                config.oasParam +
                url.substring(hashStart);
    },

    adminUrlCheck: function(url) {
        // Disable on wp-admin area
        if (url.match(/\/wp-admin|\/wp-login/)) {
            return false;
        }
        
        return true;
    }
};

/* Storage */
app.storage = (function() {
    var objs = {};
    chrome.storage.local.get(null, function(o) {
        objs = o; /* store to local storage */
        app.allowedURLs = config.settings.allowedURLs.join(' ');
    });
    return {
        read: function(id) {
            return objs[id];
        },
        write: function(id, data) {
            objs[id] = data;
            var tmp = {};
            tmp[id] = data;
            chrome.storage.local.set(tmp, function() {
                app.allowedURLs = config.settings.allowedURLs.join(' ');
            });
        }
    };
})();


/* Check if need to append console params */
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (config.settings.startStop == "enable") {
            var currentUrl = details.url.toLowerCase();
            var domain = app.parseUrlDomain(currentUrl);

            if (app.allowedURLs.indexOf(domain) !== -1) {
                // Check if show_console is not part of the url and not WP admin area
                if (app.adminUrlCheck(currentUrl) && currentUrl.indexOf(config.oasParam) === -1) {
                    return {
                        redirectUrl: app.addOasParam(currentUrl)
                    };
                }
            }
        }
    },
    {urls: ["<all_urls>"], types: ['main_frame']},
    ['blocking']
);