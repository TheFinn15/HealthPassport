
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CabinetPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("Кабінет"),
          automaticallyImplyLeading: false
      ),
      body:  Center(
        child: Text("Кабінет юзера"),
      )
    );
  }
}