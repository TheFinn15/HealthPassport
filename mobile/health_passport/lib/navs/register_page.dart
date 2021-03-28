
import 'dart:convert';
import 'dart:core';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/main.dart';
import 'package:health_passport/navs/home_page.dart';
import 'package:health_passport/services/user_requests.dart';


class RegisterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    TextEditingController fullNameField = new TextEditingController();
    TextEditingController loginField = new TextEditingController();
    TextEditingController pwdField = new TextEditingController();
    TextEditingController emailField = new TextEditingController();
    TextEditingController phoneField = new TextEditingController();

    UserService userService = new UserService();

    return Scaffold(
        appBar: AppBar(
          title: Text("Реєстрація"),
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
                          "Реєстрація",
                          style: GoogleFonts.roboto(
                              fontSize: 25.0
                          ),
                        )
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: TextField(
                          controller: fullNameField,
                          keyboardType: TextInputType.text,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'ПІБ',
                          )
                      ),
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
                      child: TextField(
                          controller: emailField,
                          keyboardType: TextInputType.text,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'E-mail',
                          )
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: TextField(
                          controller: phoneField,
                          keyboardType: TextInputType.text,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'Телефон',
                          )
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: ElevatedButton(
                        onPressed: () async {
                          var data = jsonEncode(<String, dynamic> {
                            "fullName": fullNameField.text,
                            "login": loginField.text,
                            "pwd": pwdField.text,
                            "email": emailField.text,
                            "phone": phoneField.text
                          });
                          bool isRegister = await userService.register(data);

                          if (isRegister) {
                            return showDialog(context: context, builder: (_) => new AlertDialog(
                                title: Text("Реєстрація успішна!"),
                                content: Text("Використайте форму авторизації."),
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
                                title: Text("Помилка при реєстрації"),
                                actions: [
                                  FlatButton(onPressed: () {Navigator.of(context).pop();}, child: Text("CLOSE"))
                                ]
                            ));
                          }
                        },
                        child: Text("ЗАРЕЄСТРУВАТИСЯ"),
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