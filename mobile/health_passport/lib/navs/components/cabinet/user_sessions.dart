

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/models/auth_model.dart';
import 'package:health_passport/navs/components/cabinet/session_item.dart';
import 'package:shared_preferences/shared_preferences.dart';

getCurrentSession(List<dynamic> sessions) async {
  var token = await SharedPreferences.getInstance();
  return sessions.where((element) => element["token"] == token.getString("uid")).first;
}

getOtherSessions(List<dynamic> sessions) async {
  var token = await SharedPreferences.getInstance();
  return sessions.where((element) => element["token"] != token.getString("uid"));
}

class UserSessions extends StatelessWidget {

  final dynamic data;

  UserSessions(this.data);

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
                var user = snapshot.data;
                if (snapshot.hasData) {
                  return Card(
                    elevation: 8,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5.0)
                    ),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.fromLTRB(30, 30, 30, 30),
                              child: Text(
                                "Активні сесії",
                                style: GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 25),
                              ),
                            ),
                          ],
                        ),
                        Divider(
                          height: 5,
                          thickness: 5,
                        ),
                        Row(
                          children: [
                            Column(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(10.0),
                                  child: Text("Поточна сесія", style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                ),
                                SessionItem(getCurrentSession(user["auths"]))
                              ],
                            )
                          ],
                        ),
                        user["auths"].length > 1 ?
                          Row(
                          children: [
                            Column(
                              children: [
                                Row(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(10.0),
                                      child: Text("Інші сесії", style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                    ),
                                    Column(
                                      children: List.generate(user["auths"].length-1, (index) {
                                        return SessionItem(getOtherSessions(user["auths"]));
                                      }),
                                    )
                                  ],
                                )
                              ],
                            )
                          ],
                        )
                            :
                          Row()
                      ],
                    ),
                  );
                } else {
                  return Center(child: Text("Дані відсутні"));
                }
              },
            )
          ],
        )
      ],
    );
  }
}