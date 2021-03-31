

import 'dart:convert';
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/navs/components/cabinet/constraint_item.dart';

List<bool> analyzeStatus(caps) {
  List<bool> results = [false, false, false, false, false];
  var capsLevels = {
    "OKAY_LEVEL": [],
    "NORMAL_LEVEL": [],
    "NOT_OKAY_LEVEL": [{}],
    "DANGER_LEVEL": [{}],
    "DEATHLY_LEVEL": [{}]
  };
  for (var item in caps) {
    capsLevels[item["hazardLevel"]].add(item);
  }
  var allCounts = [
    capsLevels["OKAY_LEVEL"].length,
    capsLevels["NORMAL_LEVEL"].length,
    capsLevels["NOT_OKAY_LEVEL"].length,
    capsLevels["DANGER_LEVEL"].length,
    capsLevels["DEATHLY_LEVEL"].length
  ];

  int maxInd = allCounts.indexOf(allCounts.reduce(max));
  if (maxInd == 0) results[0] = true;
  if (maxInd == 1) results[1] = true;
  if (maxInd == 2) results[2] = true;
  if (maxInd == 3) results[3] = true;
  if (maxInd == 4) results[4] = true;

  return results;
}

showStatus(info, color, context) {
  ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(info),
        backgroundColor: color,
        action: SnackBarAction(
          textColor: Colors.white,
          label: "ЗАЧИНИТИ",
          onPressed: () {}
        ),
        padding: EdgeInsets.all(10),
        elevation: 8,
      )
  );
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
                                          title: Column(
                                            children: [
                                              Center(
                                                child: Text(
                                                  "Статус профілю",
                                                  style: GoogleFonts.roboto(fontWeight: FontWeight.bold),
                                                ),
                                              ),
                                              Padding(
                                                padding: const EdgeInsets.only(top: 10),
                                                child: Row(
                                                  mainAxisAlignment: MainAxisAlignment.center,
                                                  children: [
                                                    IconButton(
                                                        icon: Icon(Icons.sentiment_very_satisfied_outlined),
                                                        onPressed: analyzeStatus(user["caps"])[0] ? () {showStatus("Стан здоров'я - повністью здорове", Colors.greenAccent.shade700, context);} : null,
                                                        color: Colors.greenAccent.shade700,
                                                        tooltip: analyzeStatus(user["caps"])[0] ? "Стан здоров'я - повністью здорове" : "Стан неактивен",
                                                    ),
                                                    IconButton(
                                                        icon: Icon(Icons.sentiment_satisfied_outlined),
                                                        onPressed: analyzeStatus(user["caps"])[1] ? () {showStatus("Стан здоров'я - є малий недуг", Colors.indigo.shade700, context);} : null,
                                                        color: Colors.indigo.shade700,
                                                        tooltip: analyzeStatus(user["caps"])[1] ? "Стан здоров'я - є малий недуг" : "Стан неактивен",
                                                    ),
                                                    IconButton(
                                                        icon: Icon(Icons.sentiment_neutral_outlined),
                                                        onPressed: analyzeStatus(user["caps"])[2] ? () {showStatus("Стан здоров'я - не здорове", Colors.deepOrangeAccent, context);} : null,
                                                        color: Colors.deepOrangeAccent,
                                                        tooltip: analyzeStatus(user["caps"])[2] ? "Стан здоров'я - не здорове" : "Стан неактивен",
                                                    ),
                                                    IconButton(
                                                        icon: Icon(Icons.sentiment_dissatisfied_outlined),
                                                        onPressed: analyzeStatus(user["caps"])[3] ?  () {showStatus("Стан здоров'я - потребує швидкої допомоги", Colors.pinkAccent, context);} : null,
                                                        color: Colors.pinkAccent,
                                                        tooltip: analyzeStatus(user["caps"])[3] ? "Стан здоров'я - потребує швидкої допомоги" : "Стан неактивен",
                                                    ),
                                                    IconButton(
                                                        icon: Icon(Icons.sentiment_very_dissatisfied_outlined),
                                                        onPressed: analyzeStatus(user["caps"])[4] ?  () {showStatus("Стан здоров'я - при смерті", Colors.red, context);} : null,
                                                        color: Colors.red,
                                                        tooltip: analyzeStatus(user["caps"])[4] ? "Стан здоров'я - при смерті" : "Стан неактивен",
                                                    )
                                                  ],
                                                ),
                                              )
                                            ],
                                          ),
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
                                children: [
                                  Column(
                                    children: List.generate(user["caps"].length, (ind) {
                                      var item = user["caps"][ind];
                                      return ConstraintItem(item);
                                    }),
                                  )
                                ],
                              )
                                :
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