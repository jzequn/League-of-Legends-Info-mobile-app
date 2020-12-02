# Report

## 2020-12

It's good to look back the app I developed back in 2019/9/26.

I upgrade the EXPO SDK from 35 to 39. Here is article on how to upgrade EXPO SDK to 39
[Expo SDK 39 is now available. Today we’re announcing our third… | by Eric Samelson | Exposition](https://blog.expo.io/expo-sdk-39-is-now-available-4c10aa825e3f)

Basically do

``` code
In terminal:
cd to the root directory of your project
expo upgrade
```

Then I came across an issue when I try to run the app on Android emulator or real Android devices. Here is the solution:
[navigation - Unable to resolve module 'react-native-screen' - Stack Overflow](https://stackoverflow.com/questions/59473715/unable-to-resolve-module-react-native-screen)

After solving the issues above, change the riot api key in ./screens/SearchScreen.js

Yeah! The app is running sucessfully 😜🌈

> Other issues: 

1. Navigate to AboutScreen will run into an error.

2. ...

## End of the file


