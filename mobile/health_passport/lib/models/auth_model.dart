
class Auth {
  int id;
  String token;
  String ip;
  String location;
  String lastOnlineTime;
  String typeDevice;
  int userId;

  Auth(
      {
        this.id,
        this.token,
        this.ip,
        this.location,
        this.lastOnlineTime,
        this.typeDevice,
        this.userId
      }
  );

  factory Auth.fromJson(Map<String, dynamic> json) {
    return Auth(
        id: json["id"],
        token: json["token"],
        ip: json["ip"],
        location: json["location"],
        lastOnlineTime: json["lastOnlineTime"],
        typeDevice: json["typeDevice"],
        userId: json["userId"]
    );
  }
}