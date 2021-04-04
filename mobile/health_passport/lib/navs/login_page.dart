
import 'dart:convert';
import 'dart:core';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/main.dart';
import 'package:health_passport/navs/cabinet_page.dart';
import 'package:health_passport/services/user_requests.dart';
import 'package:hexcolor/hexcolor.dart';

import 'home_page.dart';


var allDestinations = [
  Destination('Головна', Icons.home, Colors.teal),
  Destination("Кабінет", Icons.person, Colors.blue),
  Destination("Вихід", Icons.exit_to_app, Colors.blue)
];

var bottomNavTabs = [
  HomePage(),
  CabinetPage(),
  Center(child: Text("Вихід"))
];

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    TextEditingController loginField = new TextEditingController();
    TextEditingController pwdField = new TextEditingController();

    UserService userService = new UserService();

    return Scaffold(
      appBar: AppBar(
        title: Text("Авторизація",),
        backgroundColor: HexColor("#FB8C00"),
      ),
      body: Center(
        child: Container(
          width: 340,
          height: 340,
          child: Card(
            elevation: 8,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(5.0)
            ),
            child: AuthForms(loginField, pwdField, userService),
          )
        )
      )
    );
  }
}


class AuthForms extends StatefulWidget {
  final TextEditingController loginField;
  final TextEditingController pwdField;
  final UserService userService;

  AuthForms(this.loginField, this.pwdField, this.userService);

  @override
  _AuthForms createState() => _AuthForms(this.loginField, this.pwdField, this.userService);
}

class _AuthForms extends State<AuthForms> {
  final TextEditingController loginField;
  final TextEditingController pwdField;
  final UserService userService;

  bool isRememberMe = false;

  _AuthForms(this.loginField, this.pwdField, this.userService);

  @override
  Widget build(BuildContext context) {
    return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Text(
                  "Авторизація",
                  style: GoogleFonts.roboto(
                      fontSize: 25.0,
                      fontWeight: FontWeight.bold
                  ),
                ),
              )
          ),
          Divider(
              height: 3,
              thickness: 3
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
          Row(
            children: [
              Checkbox(
                value: isRememberMe,
                onChanged: (val) {
                  setState(() {
                    isRememberMe = !isRememberMe;
                  });
                },
              ),
              Text("Запам'ятати мене")
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(HexColor("#6cc070"))
              ),
              onPressed: () async {
                if (loginField.text.length > 0 || pwdField.text.length > 0) {
                  var data = jsonEncode(<String, dynamic> {
                    "login": loginField.text,
                    "pwd": pwdField.text,
                    "device": "DEVICE_ANDROID",
                    "isRememberMe": isRememberMe,
                    "ip": await userService.getClientIP()
                  });
                  print(data);
                  bool isAuth = await userService.login(data);
                  if (isAuth) {
                    return showDialog(context: context, builder: (_) => new AlertDialog(
                        title: Text("Авторизація успішна !"),
                        actions: [
                          FlatButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                                Navigator.push(context, MaterialPageRoute(builder: (context) => MainPage(allDestinations, bottomNavTabs)));
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
    );
  }
}