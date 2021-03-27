
import 'dart:core';
import 'dart:html';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class InputForm {
  final String field;
  final String label;

  InputForm(this.field, this.label);
}

var allForms = [
  InputForm("", "")
];

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login")
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
                TextField(
                  key: Key("login"),
                  keyboardType: TextInputType.text,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Логін',
                  )
                ),
                TextField(
                  key: Key("password"),
                  obscureText: true,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Пароль',
                  ),
                  keyboardType: TextInputType.visiblePassword,
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: Text("sda"),
                  clipBehavior: Clip.antiAlias,
                )
              ]
          ),
        )
      )
    );
  }
}