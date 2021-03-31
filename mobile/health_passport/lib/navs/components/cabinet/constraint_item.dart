

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

String getHazardLevel(rawLevel) {
  if (rawLevel == "OKAY_LEVEL")
    return "Здоровий";
  if (rawLevel == "NORMAL_LEVEL")
    return "У нормі";
  if (rawLevel == "NOT_OKAY_LEVEL")
    return "Не здоровий";
  if (rawLevel == "DANGER_LEVEL")
    return "Критичний";
  if (rawLevel == "DEATHLY_LEVEL")
    return "При смерті";
}

class ConstraintItem extends StatelessWidget {
  final dynamic item;

  ConstraintItem(this.item);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400,
      child: Card(
        elevation: 8,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5.0)
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
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
  }
}