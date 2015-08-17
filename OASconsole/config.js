var config = {
    oasParam: 'show_console',

    defaultAllowedUrls: [
        "http://www.themotherish.com",
        "http://www.debriefdaily.com",
        "http://www.theglow.com.au",
        "http://www.mamamia.com.au"
    ],

    settings: {
        get startStop() {
            return app.storage.read('startStop') || "disable";
        },
        set startStop(val) {
            app.storage.write('startStop', val);
        },
        get allowedURLs() {
            if (!app.storage.read('allowedURLs')) return config.defaultAllowedUrls;
            else return JSON.parse(app.storage.read('allowedURLs') || "[]");
        },
        set allowedURLs(val) {
            app.storage.write('allowedURLs', JSON.stringify(val));
        }
    }
};