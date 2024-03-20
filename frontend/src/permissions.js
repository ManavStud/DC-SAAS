const permissions = [
    {
        "Permission": "android.permission.ACCESS_WIFI_STATE",
        "Status": "normal",
        "Info": "view Wi-Fi status",
        "Description": "Allows an application to view the information about the status of Wi-Fi."
    },
    {
        "Permission": "android.permission.ACCESS_NETWORK_STATE",
        "Status": "normal",
        "Info": "view network status",
        "Description": "Allows an application to view the status of all networks."
    },
    {
        "Permission": "android.permission.POST_NOTIFICATIONS",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "com.android.vending.BILLING",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "com.applovin.array.apphub.permission.BIND_APPHUB_SERVICE",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "com.google.android.gms.permission.AD_ID",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "com.huawei.permission.external_app_settings.USE_COMPONENT",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "tkstudio.autoresponderforwa.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION",
        "Status": "unknown",
        "Info": "Unknown permission",
        "Description": "Unknown permission from android reference"
    },
    {
        "Permission": "android.permission.READ_CONTACTS",
        "Status": "dangerous",
        "Info": "read contact data",
        "Description": "Allows an application to read all of the contact (address) data stored on your phone. Malicious applications can use this to send your data to other people."
    },
    {
        "Permission": "android.permission.WAKE_LOCK",
        "Status": "normal",
        "Info": "prevent phone from sleeping",
        "Description": "Allows an application to prevent the phone from going to sleep."
    },
    {
        "Permission": "android.permission.INTERNET",
        "Status": "normal",
        "Info": "full Internet access",
        "Description": "Allows an application to create network sockets."
    },
    {
        "Permission": "com.google.android.c2dm.permission.RECEIVE",
        "Status": "signature",
        "Info": "C2DM permissions",
        "Description": "Permission for cloud to device messaging."
    },
    {
        "Permission": "android.permission.USE_FINGERPRINT",
        "Status": "normal",
        "Info": "allow use of fingerprint",
        "Description": "This constant was deprecated in API level 28. Applications should request USE_BIOMETRIC instead."
    },
    {
        "Permission": "android.permission.FOREGROUND_SERVICE",
        "Status": "normal",
        "Info": "",
        "Description": "Allows a regular application to use Service.startForeground."
    },
    {
        "Permission": "android.permission.USE_BIOMETRIC",
        "Status": "normal",
        "Info": "",
        "Description": "Allows an app to use device supported biometric modalities."
    }
]

export default permissions;