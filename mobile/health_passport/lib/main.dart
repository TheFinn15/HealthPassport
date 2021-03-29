import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_passport/navs/home_page.dart';
import 'package:health_passport/navs/login_page.dart';
import 'package:health_passport/navs/register_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'navs/cabinet_page.dart';

void main() {
  runApp(MyApp());
}

class Destination {
  final String title;
  final IconData icon;
  final MaterialColor color;

  const Destination(this.title, this.icon, this.color);
}

List<Destination> allDestinations = <Destination>[
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
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Health Passport',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        bottomSheet: MainPage()
      ),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int ind = 0;
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

  Widget build(BuildContext context) {
    return Scaffold(
      body: bottomNavTabs[ind],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: ind,
        onTap: (value) async {
          var logout = await SharedPreferences.getInstance();
          setState(() {
            ind = value;
          });
          print(logout.getString("uid"));
          if (value == 2 && logout.getString("uid") != null) {
            logout.remove("uid");
            Navigator.push(context, MaterialPageRoute(builder: (context) => MainPage()));
          }
        },
        items: List.generate(allDestinations.length, (index) {
          return BottomNavigationBarItem(
            label: allDestinations[index].title,
            icon: Icon(allDestinations[index].icon)
          );
        })
      )
    );
  }
}


// FutureBuilder(
// future: userService.getUsers(),
// builder: (context, AsyncSnapshot<List<User>> snapshot) {
// if (snapshot.hasData) {
// List<User> users = snapshot.data!;
// return GridView.count(
// crossAxisCount: 3,
// children: List.generate(users.length, (index) {
// var item = users[index];
// return Center(
// child: Column(
// crossAxisAlignment: CrossAxisAlignment.center,
// mainAxisAlignment: MainAxisAlignment.center,
// children: [
// Text(item.login),
// Text(item.fullName),
// Text(item.auths.toString())
// ],
// )
// );
// })
// );
// } else {
// return Text(snapshot.toString());
// }
// },
// )