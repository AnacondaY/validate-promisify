# validate-promisify
A asynchronous form validator by using promise.
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
        username: Schema.string().isRequired(),
        age: Schema.number().integer()
    });

    validator.validate({
        username: undefined,
        age: 9.9
    }).catch(errors => console.log(errors));
```

