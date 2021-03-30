

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ServicesInfo extends StatelessWidget {
  final String typeService;
  final Future<List<dynamic>> service;

  ServicesInfo(this.typeService, this.service);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
        scrollable: true,
        title: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: Text(typeService, style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
              ),
              const Divider(
                  height: 2,
                  thickness: 2
              ),
            ]
        ),
        content: Container(
            child: FutureBuilder<List<dynamic>>(
              future: service,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(snapshot.data.length, (index) {
                      return Card(
                        elevation: 8,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5.0)
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text(
                                    "Назва",
                                    style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(4.0),
                                  child: Text(
                                      snapshot.data[index]["name"],
                                      style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                  ),
                                ),
                              ],
                            ),
                            Spacer(),
                            Column(
                              // mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text(
                                    "О процедурі",
                                    style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(4.0),
                                  child: Text(
                                      snapshot.data[index]["info"],
                                      style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                  ),
                                ),
                              ],
                            ),
                            Spacer(),
                            Column(
                              // mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text(
                                    "Партнер",
                                    style: GoogleFonts.openSans(color: Colors.grey.withOpacity(0.8)),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(4.0),
                                  child: Text(
                                      snapshot.data[index]["partner"]["name"],
                                      style: GoogleFonts.roboto(fontSize: 15, fontWeight: FontWeight.bold)
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
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
                          "$typeService відсутні",
                          style: GoogleFonts.roboto(fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                      )
                    ],
                  );
                }
              },
            )
        )
    );
  }
}