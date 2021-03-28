
import 'dart:convert';
import 'dart:core';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/main.dart';
import 'package:health_passport/navs/home_page.dart';
import 'package:health_passport/services/user_requests.dart';


class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    TextEditingController loginField = new TextEditingController();
    TextEditingController pwdField = new TextEditingController();

    UserService userService = new UserService();

    return Scaffold(
      appBar: AppBar(
        title: Text("Авторизація"),
      ),
      body: Center(
        child: Container(
          width: 340.0,
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Text(
                    "Авторизація",
                    style: GoogleFonts.roboto(
                        fontSize: 25.0
                    ),
                  )
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: TextField(
                    controller: loginField,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Логін',
                    )
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: TextField(
                    controller: pwdField,
                    obscureText: true,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Пароль',
                    ),
                    keyboardType: TextInputType.visiblePassword,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: ElevatedButton(
                    onPressed: () async {
                      var data = jsonEncode(<String, dynamic> {
                        "login": loginField.text,
                        "pwd": pwdField.text,
                        "device": "DEVICE_ANDROID",
                        "isRememberMe": false,
                        "ip": "91.204.113.91"
                      });
                      bool isAuth = await userService.login(data);

                      if (isAuth) {
                        return showDialog(context: context, builder: (_) => new AlertDialog(
                            title: Text("Авторизація успішна !"),
                            actions: [
                              FlatButton(
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                    Navigator.push(context, MaterialPageRoute(builder: (context) => MainPage()));
                                  },
                                  child: Text("CLOSE")
                              )
                            ]
                        ));
                      } else {
                        return showDialog(context: context, builder: (_) => new AlertDialog(
                          title: Text("Помилка при авторизації"),
                          actions: [
                            FlatButton(onPressed: () {Navigator.of(context).pop();}, child: Text("CLOSE"))
                          ]
                        ));
                      }
                    },
                    child: Text("ВІЙТИ"),
                    clipBehavior: Clip.antiAlias,
                  ),
                )
              ]
          ),
        )
      )
    );
  }
}