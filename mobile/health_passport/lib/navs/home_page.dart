

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../services/user_requests.dart';

UserService userService = new UserService();

Future<List<dynamic>> getIlls() async {
  List<dynamic> services = (await userService.getCurrentUser())[0]["services"];
  return services.where((element) => element["type"] == "TYPE_ILL").toList();;
}

Future<List<dynamic>> getSurveys() async {
  List<dynamic> services = (await userService.getCurrentUser())[0]["services"];
  return services.where((element) => element["type"] == "TYPE_SURVEY").toList();
}

Future<List<dynamic>> getVaccines() async {
  List<dynamic> services = (await userService.getCurrentUser())[0]["services"];
  return services.where((element) => element["type"] == "TYPE_VACCINE").toList();
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
                       Spacer(),
                       Padding(
                         padding: const EdgeInsets.only(right: 20),
                         child: Icon(Icons.keyboard_arrow_down, size: 30),
                       ),
                     ],
                   ),
                 ),
                 onTap: () {
                   showDialog(context: context, builder: (_) {
                     return AlertDialog(
                       title: Column(
                         mainAxisAlignment: MainAxisAlignment.center,
                         children: [
                           Padding(
                             padding: const EdgeInsets.all(15.0),
                             child: Text("Хвороби", style: GoogleFonts.roboto(fontWeight: FontWeight.bold)),
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
                             future: getIlls(),
                             builder: (context, snapshot) {
                               if (snapshot.data.length > 0) {
                                 return Column(
                                   children: List.generate(snapshot.data.length, (index) {
                                     return Text(snapshot.data[index]["name"].toString());
                                   })
                                 );
                               } else {
                                 return Column(
                                   mainAxisAlignment: MainAxisAlignment.center,
                                   crossAxisAlignment: CrossAxisAlignment.center,
                                   children: [
                                     Center(
                                       child: Text("Хвороби відсутні"),
                                     )
                                   ],
                                 );
                               }
                             },
                           )
                         ]
                       )
                     );
                   });
                 },
               ),
               GestureDetector(
                 child: Card(
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
                       ),
                       Spacer(),
                       Padding(
                         padding: const EdgeInsets.only(right: 20),
                         child: Icon(Icons.keyboard_arrow_down, size: 30),
                       ),
                     ],
                   ),
                 ),
                 onTap: () {
                   print("TAPPED1");
                 },
               ),
               GestureDetector(
                 child: Card(
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
                       ),
                       Spacer(),
                       Padding(
                         padding: const EdgeInsets.only(right: 20),
                         child: Icon(Icons.keyboard_arrow_down, size: 30),
                       ),
                     ],
                   ),
                 ),
                 onTap: () {
                   print("TAPPED2");
                 }
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