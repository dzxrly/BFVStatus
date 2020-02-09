package javon.test.bfv;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class NetworklAPI {
    private String url;
    private String resData;

    public NetworklAPI(String url) {
        this.url = url;
    }

    public void GetPlayStatusData() {
        OkHttpClient okHttpClient = new OkHttpClient();
        final Request request = new Request.Builder()
                .url(url)
                .get()//默认就是GET请求，可以不写
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                resData = null;
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                resData = response.body().toString();
            }
        });
    }
}
