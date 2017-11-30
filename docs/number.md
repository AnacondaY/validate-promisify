* ```Schema.number(message?: String)```
    
    验证数字类型

* ```Schema.number(message?: String).integer(message?: String)```
    
    验证整数类型

* ```Schema.number(message?: String).float(message?: String)```

    验证浮点数类型

* ```Schema.number(message?: String).rangeOf(min: Number, max: Number, message?: String)```

    验证数值范围

* ```Schema.number(message?: String).oneOf(list: Array, message?: String)```

    验证是否是列表中的成员

* ```Schema.number(message?: String).lessThan(threshold: Number, message?: String)```
    
    验证是否小于指定值

* ```Schema.number(message?: String).greaterThan(threshold: Number, message?: String)```

    验证是否大于指定值

* ```Schema.number(message?: String).pattern(pattern: RegExp, message?: String)```

    验证自定义正则表达式
