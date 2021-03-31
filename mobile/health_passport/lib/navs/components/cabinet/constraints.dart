

import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

String getHazardLevel(rawLevel) {
  if (rawLevel == "OKAY_LEVEL")
     return "Стан здоровий";
  if (rawLevel == "NORMAL_LEVEL")
    return "Стан достатньо здоровий";
  if (rawLevel == "NOT_OKAY_LEVEL")
    return "Стан не здоровий";
  if (rawLevel == "DANGER_LEVEL")
    return "Стан критичний";
  if (rawLevel == "DEATHLY_LEVEL")
    return "Стан при смерті";
}

class Constraints extends StatelessWidget {

  final Future<dynamic> data;

  Constraints(this.data);

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
                                  padding: const EdgeInsets.fromLTRB(30, 30, 0, 30),
                                  child: Text(
                                    "Мої обмеження",
                                    style: GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 25),
                                  ),
                                ),
                                FloatingActionButton(
                                  backgroundColor: Colors.red,
                                  mini: true,
                                  child: Icon(Icons.block_outlined, size: 30),
                                  onPressed: () {
                                    return showDialog(
                                        context: context,
                                        builder: (_) => new AlertDialog(
                                          title: Text("kuk"),
                                        )
                                    );
                                  },
                                  tooltip: "Статус профіля",
                                ),
                              ],
                            ),
                            Divider(
                                height: 5,
                                thickness: 5
                            ),
                            user["caps"].length > 0 ?
                              Row(
                                children: List.generate(user["caps"].length, (ind) {
                                  print(user["caps"] == null ? 'opa': "s");
                                  var item = user["caps"][ind];
                                  return Container(
                                    width: 400,
                                    child: Card(
                                      elevation: 8,
                                      shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(5.0)
                                      ),
                                      child: Row(
                                        children: [
                                          Container(
                                            padding: EdgeInsets.all(10),
                                            child: Row(
                                              children: [
                                                Row(
                                                  children: [
                                                    Column(
                                                      children: [
                                                        Text("Назва"),
                                                        Padding(
                                                          padding: const EdgeInsets.all(10.0),
                                                          child: Text(item["name"], style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                                        )
                                                      ],
                                                    ),
                                                    Column(
                                                      children: [
                                                        Text("Об обмежені"),
                                                        Padding(
                                                          padding: const EdgeInsets.all(10.0),
                                                          child: Text(item["info"], style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                                        )
                                                      ],
                                                    ),
                                                    Column(
                                                      children: [
                                                        Text("Виникло з"),
                                                        Padding(
                                                          padding: const EdgeInsets.all(10.0),
                                                          child: Text(item["ill"]["name"], style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                                        )
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                                Row(
                                                  children: [
                                                    Column(
                                                      children: [
                                                        Text("Рівень безпеки"),
                                                        Padding(
                                                          padding: const EdgeInsets.all(10.0),
                                                          child: Text(getHazardLevel(item["hazardLevel"]), style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
                                                        )
                                                      ],
                                                    )
                                                  ],
                                                )
                                              ],
                                            )
                                          )
                                        ],
                                      ),
                                    ),
                                  );
                                }),
                              ) :
                              Row(
                                children: [
                                  Center(
                                    child: Text("Обмеження відсутні"),
                                  )
                                ],
                              )
                          ],
                        )
                    );
                  } else {
                    return Center(child: Text("NONE"));
                  }
                }
            )
          ],
        ),
      ],
    );
  }
}