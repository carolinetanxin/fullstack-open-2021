### [*3.20] How to print error info when status is 400

1. in your frontend project [App.js]
2. add `.catch` after `PhoneService.create`
3. code here::

```
.catch(error => {
        console.log('报错啦！')
        console.log(error.response);
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
             setErrorMessage(null);
           }, 5000)
        })
```

4. rebuild frontend by running `npm run build`
5. in your frontend project , copy `build` file to your backend project:
`cp -r build to-your-backend-project` or just right click to copy paste.
