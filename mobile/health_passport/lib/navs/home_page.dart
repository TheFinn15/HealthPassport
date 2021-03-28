

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: Text(
              "Мої дані",
              style: GoogleFonts.roboto(fontSize: 30.0, fontWeight: FontWeight.bold),
            )
          ),
         Container(
           margin: EdgeInsets.fromLTRB(150, 10, 150, 10),
           child:  Column(
             mainAxisAlignment: MainAxisAlignment.center,
             crossAxisAlignment: CrossAxisAlignment.start,
             children: [
               GestureDetector(
                 child: Card(
                   elevation: 8,
                   shape: RoundedRectangleBorder(
                       borderRadius: BorderRadius.circular(5.0)
                   ),
                   child:  Row(
                     mainAxisAlignment: MainAxisAlignment.start,
                     children: [
                       Padding(
                         padding: const EdgeInsets.all(20),
                         child: Text(
                           "Хвороби",
                           style: GoogleFonts.roboto(fontSize: 20.0, fontWeight: FontWeight.bold),
                         ),
                       ),
                       Icon(Icons.keyboard_arrow_down, size: 30)
                     ],
                   ),
                 ),
                 onTap: () {
                   print("TAPPED");
                 },
               ),
               Card(
                 elevation: 8,
                 shape: RoundedRectangleBorder(
                     borderRadius: BorderRadius.circular(5.0)
                 ),
                 child: Row(
                   mainAxisAlignment: MainAxisAlignment.start,
                   children: [
                     Padding(
                       padding: const EdgeInsets.all(20),
                       child: Text(
                         "Обстеження",
                         style: GoogleFonts.roboto(fontSize: 20.0, fontWeight: FontWeight.bold),
                       ),
                     )
                   ],
                 ),
               ),
               Card(
                 elevation: 8,
                 shape: RoundedRectangleBorder(
                     borderRadius: BorderRadius.circular(5.0)
                 ),
                 child: Row(
                   mainAxisAlignment: MainAxisAlignment.start,
                   children: [
                     Padding(
                       padding: const EdgeInsets.all(20),
                       child: Text(
                         "Вакцинації",
                         style: GoogleFonts.roboto(fontSize: 20.0, fontWeight: FontWeight.bold),
                       ),
                     )
                   ],
                 ),
               )
             ],
           ),
         )
        ],
      )
      // bottomSheet: HomeBottomNav(),
    );
  }
}

// FutureBuilder<String>(
// future: getToken(),
// builder: (context, AsyncSnapshot<String>snapshot) {
// List<Widget> children;
// if (snapshot.hasData) {
// children = <Widget>[
// Text(snapshot.data)
// ];
// } else {
// children = <Widget>[
// Text("Помилка")
// ];
// }
// return Center(
// child: children[0]
// );
// },
// ),