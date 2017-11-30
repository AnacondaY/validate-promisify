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

## 数据类型
```validate-promisify```提供5种基础类型的验证, 每种类型声明后可选择其相应的验证方法。

```js
    import Validator, { Schema } from 'validate-promisify';

    //每种类型均可以定义required()规则, 并且其验证会第一个执行, 无论它定义的位置
    const validator = new Validator({
        idNumber: Schema.string().ChineseID().required(),
        weight: Schema.number().float().required(),
        isMale: Schema.boolean(),
        hobbies: Schema.array().unique(),
        introduction: Schema.object().shapeOf({
            yourName: Schema.string().maxLength(4).required(),
            yourAge: Schema.number().greaterThan(0),
            skills: Schema.array().unique()
        })
    });
```

## 异步校验
这里的异步特指耗时的验证, 如请求服务器校验或定时器校验等, 因为整个验证流程是基于Promise的异步数据流。
```js
    import Validator, { Schema } from 'validate-promisify';

    const mockRequest = () => new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject();
            clearTimeout(timer);
        }, 2000);
    });

    new Validator({
        username: Schema.string().async(mockRequest, '用户名已被注册')
    }).validate({
        username: 'xxxxxxx'
    }).catch(errors => console.log(errors));

    //输出 { username: ['用户名已被注册'] }

```
## 同步验证
```Validator.prototype.validate```采用将返回```Promise```, 若验证用过将被```resolve```, 而验证失败则会被```reject```。
此外, 利用```Validator.prototype.syncValidate```可进行同步验证。

> 注意, 使用syncValidate是不能验证async()规则的。

```javascript
    import Validator, { Schema } from 'validate-promisify';
    
    const validator = new Validator({
        name: Schema.string().required(),
        age: Schema.number().integer()
    });

    const result = validator.syncValidate({
        name: undefined,
        age: 9.9
    });

    console.log(result);
    //输出
    // {
    //   name: [ '必填', '请输出字符串' ], 
    //   age: ['请输入整数'] 
    // }
```

## 本地化
若根据每种规则定义message信息是不可配置的, 推荐使用本地化工具来定制提示信息。
```javascript
    import Validator, { Schema, lang } from 'validate-promisify';
    
    Schema.config({
        //采用英文提示, 默认使用中文提示, 即lang['zh-CN']
        locale: lang['en']
    })    
```
默认消息都很丑陋, 你可以定制更加人性化的消息, 格式请参照[locale](https://github.com/AnacondaY/validate-promisify/blob/master/src/lang/en.js)。

## 自定义规则
通过```customizeRule```可以添加自定义规则。
```js
    import Validator, { Schema } from 'validate-promisify';
    
    const validator = new Validator({
        //一共接受4个配置参数
        character: Schema.string().customizeRule({
            //必填,且必须返回一个Boolean或者Promise
            validator: value => /\*\.\&\$\@/.test(value),
            //可选,若填写将覆盖本地化配置的默认提示
            message: '不能包含特殊字符',
            //可选,本地化文件中提示的key值
            name: 'specification',
            //可选, 本地化文件中{{  }}解析的参数
            extraParams: {
                list: ['*', '.', '&', '$', '@']
            }
        });
    });

    const result = validator.syncValidate({
        name: undefined,
        age: 9.9
    });
```
## API

* [Schema.string()](https://github.com/AnacondaY/validate-promisify/blob/master/docs/string.md)
* [Schema.number()](https://github.com/AnacondaY/validate-promisify/blob/master/docs/number.md)
* [Schema.boolean()](https://github.com/AnacondaY/validate-promisify/blob/master/docs/boolean.md)
* [Schema.array()](https://github.com/AnacondaY/validate-promisify/blob/master/docs/array.md)
* [Schema.object()](https://github.com/AnacondaY/validate-promisify/blob/master/docs/object.md)
* [Validator.prototype](https://github.com/AnacondaY/validate-promisify/blob/master/docs/validator.md)


