import 'dart:convert';
import 'dart:io';

import 'package:easy_localization/easy_localization.dart';
import 'package:easy_logger/easy_logger.dart';
import 'package:flutter/material.dart';
import 'package:flutter_ip/flutter_ip.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/navs/home_page.dart';
import 'package:health_passport/navs/login_page.dart';
import 'package:health_passport/navs/register_page.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wifi/wifi.dart';

import 'navs/cabinet_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();

  EasyLocalization.logger.enableLevels = [LevelMessages.error, LevelMessages.warning];

  runApp(MyApp());
}

class Destination {
  final String title;
  final IconData icon;
  final MaterialColor color;

  const Destination(this.title, this.icon, this.color);
}

var allDestinations = [
  Destination('Головна', Icons.home, Colors.teal),
  Destination('Логін', Icons.business, Colors.cyan),
  Destination('Реєстрація', Icons.school, Colors.orange)
];

var bottomNavTabs = [
  Center(
      child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
                "HEALTH-PASSPORT",
                style: GoogleFonts.roboto(fontSize: 30.0, )
            ),
            Center(
              child: Text(
                "Війди або реєструйся, щоб використовувати сервіс",
                style: GoogleFonts.roboto(),
              ),
            )
          ]
      )
  ),
  LoginPage(),
  RegisterPage()
];

class MyApp extends StatelessWidget {
  // ignore: top_level_function_literal_block
  var storage = SharedPreferences.getInstance().then((value) {
    if (value.getString("uid") != null) {
      bottomNavTabs[0] = HomePage();
      bottomNavTabs[1] = CabinetPage();
      bottomNavTabs[2] = Center(child: Text("Вихід"));
      allDestinations[1] = Destination("Кабінет", Icons.person, Colors.blue);
      allDestinations[2] = Destination("Вихід", Icons.exit_to_app, Colors.blue);
    }
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Health Passport',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      color: Colors.red,
      home: Scaffold(
        bottomSheet: MainPage(allDestinations, bottomNavTabs)
      ),
    );
  }
}

class MainPage extends StatefulWidget {
  final dynamic destination;
  final dynamic tabs;

  MainPage(this.destination, this.tabs);

  @override
  _MainPageState createState() => _MainPageState(destination, tabs);
}

class _MainPageState extends State<MainPage> {
  final dynamic destination;
  final dynamic tabs;

  _MainPageState(this.destination, this.tabs);

  int ind = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: tabs[ind],
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: HexColor("#FB8C00"),
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white,
        type: BottomNavigationBarType.fixed,
        currentIndex: ind,
        onTap: (value) async {
          var logout = await SharedPreferences.getInstance();
          setState(() {
            ind = value;
          });
          if (value == 2 && logout.getString("uid") != null) {
            await userService.logout(
              jsonEncode({
                "ip": await userService.getClientIP()
              })
            );
            logout.remove("uid");
            Navigator.push(context, MaterialPageRoute(builder: (context) => MainPage(
                [
                  Destination('Головна', Icons.home, Colors.teal),
                  Destination('Логін', Icons.business, Colors.cyan),
                  Destination('Реєстрація', Icons.school, Colors.orange)
                ],
                [
                  Center(
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                                "HEALTH-PASSPORT",
                                style: GoogleFonts.roboto(fontSize: 30.0, )
                            ),
                            Center(
                              child: Text(
                                "Війди або реєструйся, щоб використовувати сервіс",
                                style: GoogleFonts.roboto(),
                              ),
                            )
                          ]
                      )
                  ),
                  LoginPage(),
                  RegisterPage()
                ]
              )));
          }
        },
        items: List.generate(destination.length, (index) {
          return BottomNavigationBarItem(
            label: destination[index].title,
            icon: Icon(destination[index].icon)
          );
        })
      )
    );
  }
}