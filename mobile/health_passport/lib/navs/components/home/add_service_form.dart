
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/navs/home_page.dart';
import 'package:health_passport/services/user_requests.dart';

String checkType(String type) {
  if (type == "TYPE_ILL") return "Хвороба";
  if (type == "TYPE_SURVEY") return "Обстеження";
  if (type == "TYPE_VACCINE") return "Вакцинація";
}

class AddServiceForm extends StatelessWidget {
  final String title;
  final Future<List<dynamic>> services;

  AddServiceForm(this.title, this.services);

  @override
  Widget build(BuildContext context) {

    return AlertDialog(
        scrollable: true,
        title: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: Text(title, style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
              ),
              const Divider(
                  height: 2,
                  thickness: 2
              ),
            ]
        ),
        content: Column(
            children: [
              FutureBuilder<List<dynamic>>(
                future: services,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    if (snapshot.data.length > 0) {
                      return Column(
                          children: List.generate(snapshot.data.length, (index) {
                            return Card(
                                elevation: 8,
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(5.0)
                                ),
                                child: Column(
                                  children: [
                                    Row(
                                      children: [
                                        Column(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.fromLTRB(0, 10, 10, 10),
                                                child: Text(
                                                  "Назва",
                                                  style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                                ),
                                              ),
                                              Padding(
                                                padding: const EdgeInsets.fromLTRB(5, 15, 15, 15),
                                                child: Text(
                                                    snapshot.data[index]["name"],
                                                    style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                                ),
                                              ),
                                            ]
                                        ),
                                        Spacer(),
                                        Column(
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.fromLTRB(0, 10, 10, 10),
                                              child: Text(
                                                "Тип сервісу",
                                                style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                              ),
                                            ),
                                            Padding(
                                              padding: const EdgeInsets.fromLTRB(5, 15, 15, 15),
                                              child: Text(
                                                  checkType(snapshot.data[index]["type"]),
                                                  style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                              ),
                                            ),
                                          ],
                                        ),
                                        Spacer(),
                                        Column(
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.fromLTRB(0, 10, 10, 10),
                                              child: Text(
                                                "О процедурі",
                                                style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                              ),
                                            ),
                                            Padding(
                                              padding: const EdgeInsets.fromLTRB(5, 15, 15, 15),
                                              child: Text(
                                                  snapshot.data[index]["info"],
                                                  style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                              ),
                                            ),
                                          ],
                                          crossAxisAlignment: CrossAxisAlignment.center,
                                        )
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        Column(
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.all(10.0),
                                              child: Text(
                                                "Партнер",
                                                style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                              ),
                                            ),
                                            Padding(
                                              padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
                                              child: Text(
                                                  snapshot.data[index]["partner"]["name"],
                                                  style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                              ),
                                            ),
                                          ],
                                          mainAxisAlignment: MainAxisAlignment.center,
                                        ),
                                        Column(
                                          children: [
                                            IconButton(
                                                tooltip: "Обрати сервіс",
                                                icon: Icon(Icons.keyboard_arrow_right_outlined, size: 35),
                                                onPressed: () async {
                                                  var doEdit = await UserService().editCurrentUser(
                                                      jsonEncode(<String, dynamic> {
                                                        "service": snapshot.data[index]["id"]
                                                      })
                                                  );
                                                  return showDialog(
                                                      context: context,
                                                      builder: (_) {
                                                        if (doEdit)
                                                          return AlertDialog(
                                                              title: Text("Сервіс додан !"),
                                                              actions: [
                                                                FlatButton(
                                                                    onPressed: () {},
                                                                    child: Text("CLOSE")
                                                                )
                                                              ]
                                                          );
                                                        else
                                                          return AlertDialog(
                                                              title: Text("Помилка при додані сервісу !"),
                                                              actions: [
                                                                FlatButton(
                                                                    onPressed: () {},
                                                                    child: Text("CLOSE")
                                                                )
                                                              ]
                                                          );
                                                      }
                                                  );
                                                }
                                            )
                                          ],
                                        )
                                      ],
                                    )
                                  ],
                                )
                            );
                          })
                      );
                    } else {
                      return Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Icon(Icons.warning, size: 30),
                          Center(
                            child: Text(
                              "Сервіси не знайдено",
                              style: GoogleFonts.roboto(fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                          )
                        ],
                      );
                    }
                  } else {
                    return Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(Icons.warning, size: 30),
                        Center(
                          child: Text(
                            "Сервіси не знайдено",
                            style: GoogleFonts.roboto(fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                        )
                      ],
                    );
                  }
                },
              )
            ]
        )
    );
  }
}