

import 'dart:convert';
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/main.dart';
import 'package:health_passport/models/auth_model.dart';
import 'package:health_passport/navs/login_page.dart';
import 'package:health_passport/navs/register_page.dart';
import 'package:health_passport/services/user_requests.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SessionItem extends StatelessWidget {
  final dynamic session;

  SessionItem(this.session);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400,
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5.0)
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(10),
              child: FutureBuilder<dynamic>(
                future: session,
                // ignore: missing_return
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    var item = snapshot.data;
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Column(
                          children: [
                            Tooltip(
                              textStyle: GoogleFonts.roboto(fontWeight: FontWeight.bold, color: Colors.white),
                              message: "Видалити сесію",
                              child: IconButton(
                                icon: Icon(Icons.close_outlined),
                                onPressed: () async {
                                  var logout = await SharedPreferences.getInstance();
                                  await UserService().logout(
                                      jsonEncode({
                                        "ip": item["ip"]
                                      })
                                  );
                                  if (item["token"] == logout.getString("uid"))
                                    logout.remove("uid");
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => MainPage(
                                      [
                                        Destination('Головна', Icons.home, Colors.teal),
                                        Destination('Логін', Icons.business, Colors.cyan),
                                        Destination('Реєстрація', Icons.school, Colors.orange)
                                      ],
                                      [
                                        Center(
                                            child: Column(
                                                mainAxisAlignment: MainAxisAlignment.center,
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                      "HEALTH-PASSPORT",
                                                      style: GoogleFonts.roboto(fontSize: 30.0, )
                                                  ),
                                                  Center(
                                                    child: Text(
                                                      "Війди або реєструйся, щоб використовувати сервіс",
                                                      style: GoogleFonts.roboto(),
                                                    ),
                                                  )
                                                ]
                                            )
                                        ),
                                        LoginPage(),
                                        RegisterPage()
                                      ]
                                  )));
                                },
                                color: Colors.red,
                              ),
                            ),
                            IconButton(
                              icon: Icon(Icons.access_time_outlined),
                              tooltip: DateTime.parse(item["lastOnlineTime"]).toLocal().toString(),
                              onPressed: () {},
                            ),
                          ]
                        ),
                        Row(
                          children: [
                            Column(
                              children: [
                                Text("Устройство", style: GoogleFonts.roboto()),
                                Padding(
                                  padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
                                  child: Text(item["typeDevice"], style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                ),
                                Text(item["ip"], style: GoogleFonts.roboto())
                              ],
                            ),
                            Column(
                              children: [
                                Text("Місце знаходження", style: GoogleFonts.roboto()),
                                Padding(
                                  padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
                                  child: Text(item["location"], style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                ),
                                Text("")
                              ],
                            )
                          ],
                        )
                      ],
                    );
                  }
                },
              )
            )
          ],
        ),
      ),
    );
  }
}