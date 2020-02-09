package javon.test.bfv;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class FrontApi extends CordovaPlugin {
    public void HttpGet(String url) {
        Log.i("--------tag: ",url);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("HttpGet".equals(action)) {
            String data = args.getString(0);
            HttpGet(data);
            callbackContext.success("finished");
            return true;
        }
        return false;
    }
}
