

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<String> getToken() async {
  var token = await SharedPreferences.getInstance();
  return token.getString("uid");
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Головна сторінка"),
        automaticallyImplyLeading: false
      ),
      body:  FutureBuilder<String>(
        future: getToken(),
        builder: (context, AsyncSnapshot<String>snapshot) {
          List<Widget> children;
          if (snapshot.hasData) {
            children = <Widget>[
              Text(snapshot.data)
            ];
          } else {
            children = <Widget>[
              Text("Помилка")
            ];
          }
          return Center(
              child: children[0]
          );
        },
      ),
      // bottomSheet: HomeBottomNav(),
    );
  }
}