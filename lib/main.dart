import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Node.js Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Node.js Example'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String _responseData = '';
  TextEditingController _dataController = TextEditingController();

  void _sendData() async {
    final response = await http.post(
      Uri.parse('http://localhost:3000/api/data'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'data': _dataController.text}),
    );

    if (response.statusCode == 200) {
      // Data sent successfully
      print('Data sent!');

      void _fetchData() async {
        
        final response = await http.get(Uri.parse('http://localhost:3000/api/data'));

        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          setState(() {
            _responseData = data['response'];
          });
        } else {
          // Error occurred
          print('Error: ${response.statusCode}');
        }
      }
    } else {
      // Error occurred
      print('Error: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextField(
                controller: _dataController,
                decoration: InputDecoration(
                  labelText: 'Enter data',
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _sendData,
                child: Text('Send Data'),
              ),
              Text(_responseData),
            ],
          ),
        ),
      ),
    );
  }
}