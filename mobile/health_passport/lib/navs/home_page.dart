

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/navs/components/home/add_service_form.dart';

import '../services/user_requests.dart';
import 'components/home/services_info.dart';

UserService userService = new UserService();

Future<List<dynamic>> getIlls() async {
  List<dynamic> services = (await userService.getCurrentUser())[0]["services"];
  return services.where((element) => element["type"] == "TYPE_ILL").toList();
}

Future<List<dynamic>> getSurveys() async {
  List<dynamic> services = (await userService.getCurrentUser())[0]["services"];
  return services.where((element) => element["type"] == "TYPE_SURVEY").toList();
}

Future<List<dynamic>> getVaccines() async {
  List<dynamic> services = (await userService.getCurrentUser())[0]["services"];
  return services.where((element) => element["type"] == "TYPE_VACCINE").toList();
}

Future<List<dynamic>> getServices() async {
  return (await userService.getServices()).where((item) => item["type"] == "TYPE_SURVEY" || item["type"] == "TYPE_VACCINE").toList();
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
          Container(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                IconButton(
                  tooltip: "Додати сервіс",
                  icon: Icon(Icons.add_circle_outline, size: 30),
                  onPressed: () {
                    showDialog(context: context, builder: (_) {
                      return AddServiceForm(getServices());
                    });
                  },
                ),
                Text(
                  "Мої дані",
                  style: GoogleFonts.roboto(fontSize: 30.0, fontWeight: FontWeight.bold),
                ),
              ],
            ),
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
                     showDialog(
                       context: context,
                       builder: (_) {
                         return ServicesInfo("Хвороби", getIlls());
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
                     showDialog(
                         context: context,
                         builder: (_) {
                           return ServicesInfo("Обстеження", getSurveys());
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
                     showDialog(
                         context: context,
                         builder: (_) {
                           return ServicesInfo("Вакцинації", getVaccines());
                         });
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