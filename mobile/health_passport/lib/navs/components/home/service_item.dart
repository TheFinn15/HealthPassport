

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ServiceItem extends StatelessWidget {
  final String title;

  ServiceItem(this.title);

  @override
  Widget build(BuildContext context) {
    return Card(
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
              title,
              style: GoogleFonts.roboto(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
          ),
          Spacer(),
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: Icon(Icons.keyboard_arrow_right, size: 30),
          ),
        ],
      ),
    );
  }
}