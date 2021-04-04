

import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/services/user_requests.dart';
import 'package:hexcolor/hexcolor.dart';

class UserData extends StatelessWidget {
  final Future<dynamic> data;
  
  UserData(this.data);

  TextEditingController fullNameField = new TextEditingController();
  TextEditingController loginField = new TextEditingController();
  TextEditingController pwdField = new TextEditingController();
  TextEditingController emailField = new TextEditingController();
  TextEditingController phoneField = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FutureBuilder<dynamic>(
                future: data,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    var user = snapshot.data;
                    fullNameField.text = user["fullName"];
                    loginField.text = user["login"];
                    emailField.text = user["email"];
                    phoneField.text = user["phone"];

                    return Card(
                        elevation: 8,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5.0)
                        ),
                        child: UserDataEdit(fullNameField, loginField, pwdField, emailField, phoneField)
                    );
                  } else {
                    return Center(child: Text("Дані відсутні"));
                  }
                }
            )
          ],
        ),
      ],
    );
  }
}

class UserDataEdit extends StatefulWidget {
  final TextEditingController fullNameField;
  final TextEditingController loginField;
  final TextEditingController pwdField;
  final TextEditingController emailField;
  final TextEditingController phoneField;

  UserDataEdit(this.fullNameField, this.loginField, this.pwdField, this.emailField, this.phoneField);

  @override
  _UserDataEdit createState() => _UserDataEdit(this.fullNameField, this.loginField, this.pwdField, this.emailField, this.phoneField);
}

class _UserDataEdit extends State<UserDataEdit> {
  bool isReadOnly = true;

  final TextEditingController fullNameField;
  final TextEditingController loginField;
  final TextEditingController pwdField;
  final TextEditingController emailField;
  final TextEditingController phoneField;

  _UserDataEdit(this.fullNameField, this.loginField, this.pwdField, this.emailField, this.phoneField);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Text(
                "Перегляд даних",
                style: GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 25),
              ),
            ),
            FloatingActionButton(
              mini: true,
              backgroundColor: HexColor("#6cc070"),
              child: !isReadOnly ? Icon(Icons.done, size: 25) : Icon(Icons.edit, size: 25),
              onPressed: () async {
                setState(() {
                  isReadOnly = !isReadOnly;
                });
                if (isReadOnly) {
                  var newData = jsonEncode(<String, dynamic> {
                    "fullName": fullNameField.text,
                    "login": loginField.text,
                    "pwd": pwdField.text,
                    "email": emailField.text,
                    "phone": phoneField.text
                  });
                  bool isEdited = await UserService().editCurrentUser(newData);
                  if (isEdited) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text("Дані успішно змінено"),
                        action: SnackBarAction(
                            textColor: Colors.white,
                            label: "ЗАЧИНИТИ",
                            onPressed: () {}
                        ),
                        padding: EdgeInsets.all(10),
                        elevation: 8,
                        backgroundColor: HexColor("#6cc070"),
                      ),
                    );
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("Помилка при зміні даних"),
                          action: SnackBarAction(
                              textColor: Colors.white,
                              label: "ЗАЧИНИТИ",
                              onPressed: () {}
                          ),
                          padding: EdgeInsets.all(10),
                          elevation: 8,
                          backgroundColor: HexColor("#6cc070"),
                        )
                    );
                  }
                }
              }
            )
          ],
        ),
        Divider(
          height: 5,
          thickness: 5,
        ),
        Row(
          children: [
            Container(
              width: 400,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextField(
                  controller: fullNameField,
                  keyboardType: TextInputType.text,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'ПІБ',
                  ),
                  readOnly: isReadOnly,
                ),
              ),
            ),
          ],
        ),
        Row(
          children: [
            Container(
              width: 200,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextField(
                  controller: loginField,
                  keyboardType: TextInputType.text,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Логін',
                  ),
                  readOnly: isReadOnly,
                ),
              ),
            ),
            Container(
              width: 200,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextField(
                  controller: pwdField,
                  keyboardType: TextInputType.text,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Пароль',
                  ),
                  readOnly: isReadOnly,
                ),
              ),
            ),
          ],
        ),
        Row(
          children: [
            Container(
              width: 200,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextField(
                  controller: emailField,
                  keyboardType: TextInputType.text,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'E-mail',
                  ),
                  readOnly: isReadOnly,
                ),
              ),
            ),
            Container(
              width: 200,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextField(
                  controller: phoneField,
                  keyboardType: TextInputType.text,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Телефон',
                  ),
                  readOnly: isReadOnly,
                ),
              ),
            )
          ],
        )
      ],
    );
  }
}