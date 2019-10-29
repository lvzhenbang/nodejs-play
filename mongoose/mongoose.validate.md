# 字段验证

```
var userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'user name required']
  }
  password: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});
```

注：` required `是默认验证机制；

注：` validate `是自定义验证机制
