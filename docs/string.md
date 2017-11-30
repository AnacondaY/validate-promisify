* ```Schema.string(message?: String)```
   
   验证字符串类型

* ```Schema.string(message?: String).required(message?: String)```
    
    验证是否必填

* ```Schema.string(message?: String).oneOf(list: Array, message?: String)```
    
    验证是否是列表中的成员

* ```Schema.string(message?: String).maxLength(length: Number, message?: String)```

    验证字符串最大长度

* ```Schema.string(message?: String).minLength(length: Number, message?: String)```

    验证字符串最小长度

* ```Schema.string(message?: String).email(message?: String)```

    验证电子邮箱格式

* ```Schema.string(message?: String).url(message?: String)```

    验证URL格式

* ```Schema.string(message?: String).notChinese(message?: String)```

    验证非中文字符

* ```Schema.string(message?: String).ChineseID(message?: String)```

    验证身份证号格式

* ```Schema.string(message?: String).ipv4(message?: String)```

    验证IPv4地址格式

* ```Schema.string(message?: String).pattern(pattern: RegExp, message?: String)```

    验证自定义正则表达式