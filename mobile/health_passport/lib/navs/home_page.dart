

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/navs/components/home/add_service_form.dart';
import 'package:health_passport/navs/components/home/service_item.dart';
import 'package:hexcolor/hexcolor.dart';

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
  List<dynamic> userServices = (await userService.getCurrentUser())[0]["services"];
  var services = (await userService.getServices()).where((item) =>
      (item["type"] == "TYPE_SURVEY" || item["type"] == "TYPE_VACCINE")
  ).toList();

  var res = [];
  for (var item in services) {
    int curInd = services.indexOf(item);
    try {
      if (userServices[curInd]["id"] != item["id"]) {
        res.add(item);
      }
    } catch (e) {
      continue;
    }
  }
  return res;
}

Future<List<dynamic>> getRecommends() async {
  var res = (await userService.getRecommends());
  List<dynamic> services = [];
  if (res[1]) {
    services = res[0]["vaccines"];
    services.addAll(res[0]["surveys"]);
  }
  return services;
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Головна сторінка"),
        backgroundColor: HexColor("#FB8C00"),
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
                      return AddServiceForm("Додати сервіс", getServices());
                    });
                  },
                ),
                Text(
                  "Мої дані",
                  style: GoogleFonts.roboto(fontSize: 30.0, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  tooltip: "Рекомендації",
                  icon: Icon(Icons.info_outlined, size: 30),
                  onPressed: () {
                    showDialog(context: context, builder: (_) {
                      return AddServiceForm("Рекомендація", getRecommends());
                    });
                  },
                ),
              ],
            ),
          ),
          Container(
             margin: EdgeInsets.all(50),
             child:  Column(
               mainAxisAlignment: MainAxisAlignment.start,
               children: [
                 GestureDetector(
                   child: ServiceItem("Мої Хвороби"),
                   onTap: () {
                     showDialog(
                       context: context,
                       builder: (_) {
                         return ServicesInfo("Хвороби", getIlls());
                     });
                   },
                 ),
                 GestureDetector(
                   child: ServiceItem("Мої Обстеження"),
                   onTap: () {
                     showDialog(
                         context: context,
                         builder: (_) {
                           return ServicesInfo("Обстеження", getSurveys());
                         });
                   },
                 ),
                 GestureDetector(
                   child: ServiceItem("Мої Вакцинації"),
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