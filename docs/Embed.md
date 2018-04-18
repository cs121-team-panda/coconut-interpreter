# How to embed our application

#### Demo
[https://codepen.io/jcruz7/pen/dmERwj](https://codepen.io/jcruz7/pen/dmERwj)

#### Getting started
1. Download our latest JavaScript bundle [here](https://github.com/cs121-team-panda/coconut-interpreter/tree/embed/static/js).
2. Rename the bundle. Something like `interpreter.bundle.js` is fine.
3. Move the bundle into your project.
3. In your html document add the following:
```diff
<body>
+  <div id="root"></div>
+  <script type="text/javascript" src="interpreter.bundle.js"></script>
</body>
```

#### Set initial code
```html
<script>
  initialCode = '42 |> print';
</script>
```
Note: this must be before `<div id="root"></div>`!

#### Dynamically set code
```javascript
setCode('def fish() = 1 + 1');
```
Note: this replaces the existing code!
