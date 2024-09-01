---
title: 'How to use simple global store and axios in Vue project'
description: '介绍如何在Vue项目中使用简单的全局状态管理（store）和axios，并提供详细的操作步骤。'
pubDate: 'Oct 26 2020'
heroImage: '/blog-placeholder-1.jpg'
---

## 引言

最近写的项目涉及组件间的通信，其中有一些资料是大部分组件都通用的，因此把它们抽取出来当成全局变量是最好的。在 Vue 项目中，`state`基本上意味着`data`，状态管理（State management)通常指应用层数据的管理。官方建议我们在小型应用中采用一个简单的[store 模式](https://cn.vuejs.org/v2/guide/state-management.html)即可。不幸的是，官方文档中的介绍过于简洁，而网上找到相关中文资料也很少，甚至出现用 store 模式实现 Vuex，天啦噜，这不就是把简单的问题复杂化了嘛。于是本文将要带领您如何使用简单的 store 模式。

## 创建 Vue 项目

首先使用 Vue Cli 创建一个 Vue 项目

```
vue create number-app
```

接下来会让你选择 dafault 或者 manual，我们选择 default 即可。

```
Vue CLI v4.4.6
? Please pick a preset: (Use arrow keys)
❯ default (babel, eslint)
  Manually select features
```

一旦项目创建完成，您需要进入项目中，然后运行该项目。

```
cd number-app
npm run serve
```

使用浏览器打开`http://localhost:8080/`，当你看到下图时表明项目已经成功跑起来了。

![2020-10-26_number-app初始页面.png](https://i.loli.net/2020/10/26/S8i29qknVm1djZb.png)

不过我们接下来并不需要`HelloWorld.vue`，您可以把它和`App.vue`里相关部分删去。

## store.js

在`src/`文件夹下创建一个`store.js`文件，它将暴露一个`store`对象。

```
export const store = {
  state: {
    numbers: [1, 2, 3]，
    text: ''
  }，
  addNumber(newNumber) {
    this.state.numbers.push(newNumber);
  }
};
```

上面的`numbers`和`text`是我们将要在多个组件中显示或操作的数据。需要注意，所有`store`中`state`的变更，都放置在`store`自身的`action`中去管理，`addNumber(newNumber)`便是一个范例。

## 在组件中使用

在组件中，我们需要`import { store } from "../store.js";`来引入`store`。在`data`中使用`storeState: store.state`来获取`store`中的`state`。

现在我们创建一个`NumberDisplay`组件用来显示`store`中的数据。

```
<template>
  <div>
    <h2>{{ storeState.numbers }}</h2>
    <p>{{ storeState.text }}</p>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "NumberDisplay",
  data() {
    return {
      storeState: store.state
    };
  }
};
</script>
```

然后创建一个`NumberSubmit`组件用来添加新的数字到`store`中的`number`数组。使用`store.addNumber`来调用`store`中的`addNumber`，从而改变`store`中的`state`

```
<template>
  <div>
    <input v-model="numberInput" type="number" />
    <button @click="addNumber(numberInput)">
     Add new number
    </button>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "NumberSubmit",
  data() {
    return {
      numberInput: 0
    };
  },
  methods: {
    addNumber(numberInput) {
      store.addNumber(Number(numberInput));
    }
  }
};
</script>
```

现在您可以在页面上添加新的数字了。

![2020-10-26_number-appv1.png](https://i.loli.net/2020/10/26/z1jyrgfSBdUEZHG.png)

![2020-10-26_number-app_add_number.png](https://i.loli.net/2020/10/26/mY2T9h5bRHDcuN3.png)

## 使用 axios

有很多时候你在构建应用时需要访问一个 API 并展示其数据。做这件事的方法有好几种，而使用基于 promise 的 HTTP 客户端 axios 则是其中非常流行的一种。本文我们将使用[Numbers API](http://numbersapi.com/#42)，它将返回一些有趣的文本给我们。

在 Vue 项目中使用 axios，首先

```
npm install --save axios vue-axios
```

然后在 main.js 中加上

```
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

这样您就可以在 Vue 文件中通过下面的三种方式来使用 axios：

```
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```

但是当我在 store.js 文件中使用 axios 时却出现了错误`Cannot read property 'get' of undefined`：

```
addNumber(newNumber) {
    this.state.numbers.push(newNumber);
    this.axios.get('http://numbersapi.com/'+ newNumber)
      .then(response => {
          this.state.text = response.data;
          console.log(response);
          })
  },
```

![2020-10-26_使用axios报错.png](https://i.loli.net/2020/10/26/aRJxhqF92ByVAk1.png)

出错的原因是因为`store.js`文件中的`this.axios`并没有引用 Vue 实例，我们需要另外引入 axios。完整`store.js`文件如下：

```
const axios = require('axios');

export const store = {
  state: {
    numbers: [1, 2, 3],
    text: '3 is the number of spatial dimensions we perceive our universe to have.'
  },
  addNumber(newNumber) {
    this.state.numbers.push(newNumber);
    axios.get('http://numbersapi.com/'+ newNumber)
      .then(response => {
          this.state.text = response.data;
          console.log(response);
          })
  },
};
```

![2020-10-26_number-app最终效果.png](https://i.loli.net/2020/10/26/3I1JpGOx5Z4Vfba.png)

至此，我们完成了 number-app。如果您的程序无法正常运行，请到 github 上查看[源码](https://github.com/circle-hotaru/number-app)。

## 总结

通过本文，我们学会了如何在 Vue 项目中使用简单的状态管理 store，当您的项目足够简单时推荐您使用它而不是 Vuex。同时我们也接触了 axios，这是一个强大的工具。
