// import generic libraries
#include <WiFi.h>
#include <HTTPClient.h>
#include <string>

// declaring data pins for joyStick
int vX = 35;
int vY = 32;
int sW = 33;

// WIFI initialization
const char * ssid = "<Wifi User Here>";
const char * password = "<Wifi Password Here>";
WiFiClientSecure client;

// delare variables
int sendInterval = 1; //time between direction injestion
int stickDirectionInt = 0;
int buttonPressedInt = 0;

void setup() {

  pinMode(vX, INPUT);
  pinMode(vY, INPUT);
  pinMode(sW, INPUT);
  
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.println("Started");
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Ready to go");
}

void loop() {
  // put your main code here, to run repeatedly:
 
  buttonPressedInt = 0;

  Serial.println(analogRead(vX));
  Serial.println(analogRead(vY));
  Serial.println(analogRead(sW));
  Serial.println("------------------------------------");

  if (analogRead(vX) > 3000){
    if (analogRead(vY) < 2500){
      stickDirectionInt = 1;
    }
  }
  if (analogRead(vX) < 1000){
    if(analogRead(vY) < 2500){
      stickDirectionInt = 2;
    }
  }
  if (analogRead(vY) > 3000){
    if(analogRead(vX) < 2500){
      stickDirectionInt = 3;
    }
  }
  if (analogRead(vY) < 1000){
    if(analogRead(vX) < 2500){
      stickDirectionInt = 4;
    }
  }
  if (analogRead(sW) == 0){
    buttonPressedInt = 1;
  }
  //delay(1000);
  //Serial.println("-----------------------------------");

  Serial.println(buttonPressedInt);
  Serial.println(stickDirectionInt);
  String stickDirection = String(stickDirectionInt, DEC);
  String buttonPressed = String(buttonPressedInt, DEC);
  
  //sendData(stickDirection);
  
  sendData(stickDirection,buttonPressed);
  
  delay(sendInterval);
  
}

//void sendData(String stickDirection) {
void sendData(String stickDirection, String buttonPressed) {

  HTTPClient http;

  // Your domain name with URL path
  http.begin("http://<DNS/ IP address here>/add_direction");
  http.addHeader("Content-Type", "application/json");
  // JSON data to send with HTTP POST, you need to hardcode stickDirection
  String httpRequestData = "{\"stickDirection\":\"" + stickDirection + "\",\"buttonPressed\":\"" + buttonPressed + "\"}";
  //String httpRequestData = "{\"stickDirection\":\"" + stickDirection + "\"}";
  int httpResponseCode = http.POST(httpRequestData);

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
}
