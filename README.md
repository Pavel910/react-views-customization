# About

This repo is an exploration of customizable views. When people use ready-made apps from `npm`, and they want to customize the views provided by the app, there's no other way but reimplementing the entire view, even if you just want to change 1 prop on some tiny element.

The approach explored here is handling views via a React Context, where you keep a registry of all app views. These views are not plain React components, but instead, objects with methods to hook into views at render time and modify element props, wrap/add/replace elements, etc.

See `App.js` source code to see how it works. 
