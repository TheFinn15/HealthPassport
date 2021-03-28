
import 'dart:convert';

import 'package:health_passport/models/user_model.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';


class UserService {
  final String host = "localhost:3000";

  Future<List<User>> getUsers() async {
    Response res = await get(Uri.http(host, "/api/users"), headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJsb2dpbiI6ImFkbWluIiwicm9sZSI6IlJPTEVfQURNSU4ifSwiaWF0IjoxNjE2NTc4NDYwLCJzdWIiOiJhdXRoIn0.gT06OknVdnVcLWEoH3n-sJS28DlzpLlfl82TNs66VZM"
    });
    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);

      List<User> users = body
        .map((i) => User.fromJson(i)).toList();

      return users;
    } else {
      throw Exception("Error");
    }
  }

  Future<bool> login(data) async {
    final storage = await SharedPreferences.getInstance();
    Response res = await post(Uri.http(host, "api/login"), body: data, headers: <String, String> {
      'Content-Type': 'application/json; charset=UTF-8',
    });

    if (res.statusCode == 200) {
      String token = jsonDecode(res.body)["token"];
      storage.setString("uid", token);

      return true;
    } else {
      print(res.statusCode);
      print(res.body);
      return false;
    }
  }
}
