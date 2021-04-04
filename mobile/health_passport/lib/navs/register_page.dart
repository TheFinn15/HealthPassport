
import 'dart:convert';
import 'dart:core';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/main.dart';
import 'package:health_passport/services/user_requests.dart';
import 'package:hexcolor/hexcolor.dart';

import 'cabinet_page.dart';
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
          backgroundColor: HexColor("#FB8C00"),
        ),
        body: Center(
            child: Container(
              width: 340,
              height: 540,
              child: Card(
                elevation: 8,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5.0)
                ),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Center(
                          child: Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Text(
                              "Реєстрація",
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
                          style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(HexColor("#6cc070"))
                          ),
                          onPressed: () async {
                            if (fullNameField.text.length > 0 || loginField.text.length > 0 ||
                                pwdField.text.length > 0 || emailField.text.length > 0 || phoneField.text.length > 0) {
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
                                            Navigator.push(context, MaterialPageRoute(builder: (context) => MainPage(allDestinations, bottomNavTabs)));
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
              ),
            )
        )
    );
  }
}