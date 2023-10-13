
# react-native-react-native-calendar-4t

## Getting started

`$ npm install react-native-react-native-calendar-4t --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-calendar-4t`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-calendar-4t` and add `RNReactNative4tSistemas.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNative4tSistemas.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNative4tSistemasPackage;` to the imports at the top of the file
  - Add `new RNReactNative4tSistemasPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-calendar-4t'
  	project(':react-native-react-native-calendar-4t').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-calendar-4t/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-calendar-4t')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNReactNative4tSistemas.sln` in `node_modules/react-native-react-native-calendar-4t/windows/RNReactNative4tSistemas.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using React.Native.Calendar_4t.RNReactNative4tSistemas;` to the usings at the top of the file
  - Add `new RNReactNative4tSistemasPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNReactNative4tSistemas from 'react-native-react-native-calendar-4t';

// TODO: What to do with the module?
RNReactNative4tSistemas;
```
  