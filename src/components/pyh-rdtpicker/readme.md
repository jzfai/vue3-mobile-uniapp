### pyh-rdtPicker 日期区间选择器

可进行多粒度的时间选择器，组件名：``pyh-rdtpicker``，代码块： rangeDatePick。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import rangeDatePick from '@/components/pyh-rdtpicker/pyh-rdtpicker.vue';
export default {
    components: {rangeDatePick}
}
```

在 ``template`` 中使用组件

```html
<rangeDatePick 
	:show="isShow"
	@showchange="showchange"
	start="1900-01-01"
	end="2200-12-01"
	:value="value"
	@change="bindChange"
	@cancel="bindCancel"
	themeColor="#4C83D6"
	fields="month"
></rangeDatePick>
```

**pdtPicker 属性说明：**

|属性名		|类型	|默认值	                    |说明					|
|---		|----	|---	                    |---					|
|themeColor	|String	|'#4C83D6'	            	|主题色					|
|start		|String	|'1900-01-01'				|限制选择器选择的最小时间	(只支持年限制)，粒度格式和value格式要相符，否则会有错误提示|
|end		|String	|'2200-12-01'				|限制选择器选择的最大时间(只支持年限制)，粒度格式和value格式要相符，否则会有错误提示|
|value		|Array	|''	                        |当前日期选择器显示的时间	，粒度格式和value格式要相符，否则会又错误提示|
|fields		|String	|'day'	               		|当前日期选择器粒度:year/month/day|


**value 值说明：**

|值 		|类型	|说明					|
|---		|----	|---					|
|[]			|Array	|当前日期选择器为开始时间的默认值			|
|['1900-01-01']	|Array	|当前日期选择器开始时间为1900-01-01			|
|['1900-01-01','2010-12-01'] |Array	|当前日期选择器开始时间为1900-01-01,结束时间为2010-12-01|

**事件说明：**

|事件名称	|说明		|
|---|---|
|showchange	|必传，用于控制显示隐藏|
|change	|时间选择器点击【确定】按钮时时触发的事件，参数为选择器的当前的 value|
|cancel	|时间选择器点击【取消】按钮时时触发的事件|

**showchange事件说明：**

showchange(){
	this.isShow=!this.isShow;
}

**更新记录：**

1.0.5：修复月份切换时，day存在显示undefined的问题；修复小程序value设置后滚动位置不对的问题</br>

1.0.4：修复滚动穿透；修改默认fields为day,添加了同年限制月份（start和end同年，有月份限制），改正作者名与组件名字</br>

1.0.3：修复动态的value不能赋值问题；修复end值的可选值与实际填入的end值小一年问题</br>

1.0.2：优化了开始日期和结束日期的切换，当前版本切换时会显示更合适的日期;添加了粒度选择，现支持year/month/day;修复了demo的getDate -60年的获取问题</br>
		
1.0.1：新增组件——日期区间选择器

**感谢：**

> 有更多优化建议和需求，请联系作者panyh。谢谢！