# fullstack-open-2021

Fullstackopen.com 2021 course exercises.

1. create react app
``
npx create-react-app your-project-name
cd your-project-name
npm start
``

2. git push code by running
`git push --set-upstream origin main`


3. npm test指令
某文件 `npm test -- tests/note_api.test.js`
某特定名称的测试 `npm test -- -t "a specific note is within the returned notes"`

4. npm test 遭遇到的报错信息
```
thrown: "Exceeded timeout of 5000 ms for a hook.
Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
```     
解决方案： 在beforeEach方法上面添加`jest.setTimeout(100000)`
