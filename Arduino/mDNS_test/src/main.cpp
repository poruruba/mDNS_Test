#include <M5StickC.h>
#include <WiFi.h>
#include <ESPmDNS.h>

const char *wifi_ssid = "【WiFiアクセスポイントのSSID】";           // WiFiアクセスポイントのSSID
const char *wifi_password = "【WiFiアクセスポイントのパスワード】"; // WiFiアクセスポイントのパスワード
const char *MDNS_NAME = "m5stickc";

void wifi_connect(const char *ssid, const char *password);

void setup() {
  M5.begin();

  wifi_connect(wifi_ssid, wifi_password);

  if (!MDNS.begin(MDNS_NAME)){
    Serial.print("Error MDNS_NAME:");
    Serial.println(MDNS_NAME);
    while(1);
  }

  MDNS.addService("testserver", "tcp", 80);
}

void loop() {
  M5.update();
}

void wifi_connect(const char *ssid, const char *password)
{
  Serial.println("");
  Serial.print("WiFi Connenting");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(1000);
  }
  Serial.println("Connected");
  Serial.println(WiFi.localIP());
}