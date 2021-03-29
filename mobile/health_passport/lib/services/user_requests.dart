
import 'dart:convert';

import 'package:health_passport/models/user_model.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/user_model.dart';
import '../models/user_model.dart';


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

  Future<bool> register(data) async {
    Response res = await post(Uri.http(host, "api/register"), body: data, headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    });

    if (res.statusCode == 200) {
      return true;
    } else {
      print(res.statusCode);
      print(res.body);

      return false;
    }
  }

  Future<dynamic> getCurrentUser() async {
    var token = await SharedPreferences.getInstance();

    try {
      Response res = await get(Uri.http(host, "api/user"), headers: {
        "Authorization": "Bearer " + token.getString("uid")
      });

      if (res.statusCode == 200) {
        return jsonDecode(res.body);
      } else {
        print(res.body);
      }
    } catch (e) {
      print(e);
    }
  }

  Future<bool> editCurrentUser(data) async {
    var token = await SharedPreferences.getInstance();

    Response res = await put(Uri.http(host, "api/user"), body: data, headers: {
      "Authorization": "Bearer " + token.getString("uid"),
      'Content-Type': 'application/json; charset=UTF-8'
    });

    if (res.statusCode == 200) {
      return true;
    } else {
      print(res.body);
      return false;
    }
  }

  Future<List<dynamic>> getServices() async {
    var token = await SharedPreferences.getInstance();

    Response res = await get(Uri.http(host, "api/services"), headers: {
      "Authorization": "Bearer " + token.getString("uid")
    });

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      print(res.body);
      return List.empty();
    }
  }

  Future<bool> logout(data) async {
    Response res = await post(Uri.http(host, "api/logout"), body: data, headers: <String, String> {
      'Content-Type': 'application/json; charset=UTF-8',
    });

    if (res.statusCode == 200) {
      return true;
    } else {
      print(res.statusCode);
      print(res.body);
      return false;
    }
  }
}
