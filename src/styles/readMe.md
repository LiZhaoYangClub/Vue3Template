## mixin.scss

```scss
@import "~@/styles/mixin.scss";
@include clearfix;
```

## variables.scss

- 用法一：

```js
import variables from "@/styles/variables.scss";
```

```html
<el-menu :active-text-color="variables.menuActiveText" />
```

- 用法二：

```scss
.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}
```
