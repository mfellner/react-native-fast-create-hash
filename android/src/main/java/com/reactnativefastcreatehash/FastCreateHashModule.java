package com.reactnativefastcreatehash;

import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@ReactModule(name = FastCreateHashModule.NAME)
public class FastCreateHashModule extends ReactContextBaseJavaModule {
    public static final String NAME = "FastCreateHash";

    public FastCreateHashModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void createHash(String data64, String algorithm, Promise promise) {
        try {
            String shaNumber = algorithm.substring(3);
            MessageDigest digest = MessageDigest.getInstance("SHA-" + shaNumber);
            byte[] in = Base64.decode(data64, Base64.DEFAULT);
            digest.update(in);
            byte[] out = digest.digest();
            String base64 = Base64.encodeToString(out, Base64.NO_WRAP);
            promise.resolve(base64);
        } catch (IndexOutOfBoundsException | NoSuchAlgorithmException e) {
            promise.reject("unknown_algorithm", "hashing algorithm not supported", e);
        } catch (IllegalArgumentException e) {
            promise.reject("bad_data", "data cannot be parsed", e);
        }
        promise.resolve("abc");
    }
}
