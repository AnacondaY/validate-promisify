# validate-promisify
一个Promise风格的表单异步验证工具.

[![Build Status](https://travis-ci.org/AnacondaY/validate-promisify.svg?branch=master)](https://travis-ci.org/AnacondaY/validate-promisify)
## 安装
```
    npm i -S validate-promisify
    //or
    yarn add validate-promisify
```

## 基础用法
```js
    import Validator, { Schema } from 'validate-promisify';
    
    const validator = new Validator({
        name: Schema.string().required(),
        age: Schema.number().integer()
    });

    validator.validate({
        name: undefined,
        age: 9.9
    }).catch(errors => console.log(errors));

    //输出
    // {
    //   name: [ '必填', '请输出字符串' ], 
    //   age: ['请输入整数'] 
    // }
```

