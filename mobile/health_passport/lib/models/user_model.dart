import 'package:flutter/foundation.dart';

import 'auth_model.dart';

class User {
  final int userId;
  final String fullName;
  final String login;
  final String pwd;
  final String email;
  final String phone;
  final List<dynamic> auths;

  User(
      {
        this.userId,
        this.fullName,
        this.login,
        this.pwd,
        this.email,
        this.phone,
        this.auths
      }
  );

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        userId: json["id"],
        fullName: json["fullName"],
        login: json["login"],
        pwd: json["pwd"],
        email: json["email"],
        phone: json["phone"],
        auths: json["auths"]
    );
  }
}