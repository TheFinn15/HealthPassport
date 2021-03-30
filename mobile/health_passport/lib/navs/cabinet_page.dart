import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:health_passport/navs/components/cabinet/constraints.dart';
import 'package:health_passport/navs/components/cabinet/user_sessions.dart';
import 'package:health_passport/services/user_requests.dart';
import 'package:hexcolor/hexcolor.dart';

import 'components/cabinet/user_data.dart';

Future<dynamic> getCurUser() async {
  return (await UserService().getCurrentUser())[0];
}

class CabinetPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            backgroundColor: HexColor("#FB8C00"),
            title: Text("Кабінет"),
            automaticallyImplyLeading: false),
        body: Container(
            child: DefaultTabController(
                length: 3,
                child: Scaffold(
                  appBar: AppBar(
                    backgroundColor: HexColor("#FB8C00"),
                    bottom: TabBar(
                      tabs: [
                        Tab(
                          text: "Мої дані",
                          icon: Icon(Icons.person_pin, size: 20),
                        ),
                        Tab(
                          text: "Обмеження",
                          icon: Icon(Icons.block, size: 20),
                        ),
                        Tab(
                          text: "Активні сесії",
                          icon: Icon(Icons.devices, size: 20),
                        )
                      ],
                    ),
                  ),
                  body: TabBarView(
                    children: [UserData(getCurUser()), Constraints(), UserSessions()],
                  ),
                ))));
  }
}
