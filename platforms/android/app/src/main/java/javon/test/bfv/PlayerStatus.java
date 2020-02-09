package javon.test.bfv;

public class PlayerStatus {
    private String dataFromApi;

    public PlayerStatus(String dataFromApi) {
        this.dataFromApi = dataFromApi;
    }

    public String getDataFromApi() {
        return dataFromApi;
    }

    public void setDataFromApi(String dataFromApi) {
        this.dataFromApi = dataFromApi;
    }
}
