cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.background-mode/www/background-mode.js",
        "id": "de.appplant.cordova.plugin.background-mode.BackgroundMode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/jp.wizcorp.phonegap.plugin.localNotificationPlugin/www/phonegap/plugin/localNotification/localNotification.js",
        "id": "jp.wizcorp.phonegap.plugin.localNotificationPlugin.localNotificationPlugin",
        "clobbers": [
            "window.localNotification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-geolocation": "1.0.2-dev",
    "cordova-plugin-whitelist": "1.0.0",
    "de.appplant.cordova.plugin.background-mode": "0.6.4",
    "org.apache.cordova.vibration": "0.3.13",
    "jp.wizcorp.phonegap.plugin.localNotificationPlugin": "2.1.0",
    "org.apache.cordova.device": "0.3.0"
}
// BOTTOM OF METADATA
});