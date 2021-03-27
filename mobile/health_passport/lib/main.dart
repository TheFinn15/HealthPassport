import 'package:flutter/material.dart';
import 'package:health_passport/navs/login_page.dart';

void main() {
  runApp(MyApp());
}

class Destination {
  final String title;
  final IconData icon;
  final MaterialColor color;

  const Destination(this.title, this.icon, this.color);
}

const List<Destination> allDestinations = <Destination>[
  Destination('Главная', Icons.home, Colors.teal),
  Destination('Логин', Icons.business, Colors.cyan),
  Destination('Регистрация', Icons.school, Colors.orange),
  // Destination('Flight', Icons.flight, Colors.blue)
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
        appBar: AppBar(
          title: Text("Main"),
        ),
        body: HomePage()
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int ind = 0;

  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: ind,
        onTap: (value) {
          setState(() {
            ind = value;
          });
          print(value);
          if (value == 1) {
            Navigator.push(context, MaterialPageRoute(builder: (context) => LoginPage()));
          }
        },
        items: List.generate(allDestinations.length, (index) {
          return BottomNavigationBarItem(
            title: Text(allDestinations[index].title),
            icon: Icon(allDestinations[index].icon),
            backgroundColor: allDestinations[index].color
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