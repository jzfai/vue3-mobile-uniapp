<template>
	<view class="rpickerBox">
		<view :class="{'pickerMask':showPicker}" @click="maskClick"  @touchmove.stop.prevent="returnHandle">
			<view class="r-dtpicker" :class="{'r-dtpicker-show':showPicker}">
				<view class="rdtBtn" @touchmove.stop.prevent="returnHandle" @tap.stop="returnHandle">
					<view @click="pickerCancel">取消</view>
					<view :style="{color:themeColor}" @click="pickerConfirm">确定</view>
				</view>
				<view class="rangeBox" @touchmove.stop.prevent="returnHandle" @tap.stop="returnHandle">
					<input type="text" disabled placeholder="开始时间" :value="startDate" :style="{color:themeColor,'border-color':themeColor,opacity:dateType=='startDate'?1:.5}" @tap="changeDateType('startDate')">至<input type="text" disabled placeholder="结束时间" :style="{color:themeColor,'border-color':themeColor,opacity:dateType=='endDate'?1:.5}" :value="endDate" @tap="changeDateType('endDate')">
				</view>
				<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChangeMul">
					<block>
						<picker-view-column>
							<view class="picker-item" v-for="(item,index) in yearArr" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column v-if="fields!='year'">
							<view class="picker-item" v-for="(item,index) in monthArr" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column v-if="fields=='day'">
							<view class="picker-item" v-for="(item,index) in dayArr" :key="index">{{item}}</view>
						</picker-view-column>
					</block>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'range-dtpicker',
		props: {
			//粒度
			fields:{
			  type: String,
			  default: 'day'
			},
			/**
			 * picker允许选中的最小值
			 */
			start: {
			  type: String,
			  default: '1900-01-01'
			},
			/**
			 * picker允许选中的最大值
			 */
			end: {
			  type: String,
			  default: '2200-12-01'
			},
			/**
			 * picker默认展示的值
			 */
			value: {
                type: Array,
                default(){
					return [0,0]
				}
            },
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			/**
			主题色
			*/
			themeColor:{
			  type: String,
			  default: '#4C83D6'
			}
		},
		created() {
			this.init()
		},
		data() {
			return {
				showPicker: this.show,
				dayArr:[],
				pickerValue:this.fields=='year'?[0]:this.fields=='month'?[0,0]:[0,0,0],
				dateType:"startDate",
				startDate:'',
				endDate:""
			};
		},
		watch: {
			value(value){
				this.value=value;
				this.init()
			},
			show(isShow) {
				this.showPicker = isShow;
			}
		},
		computed: {
			yearArr(){
				var arr = [],start = parseInt(this.start.slice(0,4)),end=parseInt(this.end.slice(0,4));
				for(var i=0;i<=end-start;i++){
					arr.push(start+i)
				}
				return arr;
			},
			monthArr(){
				var arr = [];
				for(var i=1;i<=12;i++){
					var v = i;
					if(v<10)v="0"+v;
					if(this.start.length>4&&this.end.length>4&&(this.start.slice(0,4)==this.end.slice(0,4))){
						if(parseInt(v)>=this.start.slice(5,7)&&parseInt(v)<=this.end.slice(5,7)){
							arr.push(v.toString())
						}
					}else{
						arr.push(v.toString())
					}
				}
				return arr;
			}
		},
		methods:{
			returnHandle(){},
			init(){
				var that = this,pickerValue="";
				if((this.fields=='year'&&this.start.length!=4)||(this.fields=='month'&&this.start.length!=7)||(this.fields=='day'&&this.start.length!=10)){
					console.error("最小值格式与粒度格式不符");return;
				}else if((this.fields=='year'&&this.end.length!=4)||(this.fields=='month'&&this.end.length!=7)||(this.fields=='day'&&this.end.length!=10)){
					console.error("最大值格式与粒度格式不符");return;
				}
				var start=this.fields=='year'?this.start.slice(0,4):this.fields=='month'?this.start.slice(0,7):this.start,
					end=this.fields=='year'?this.end.slice(0,4):this.fields=='month'?this.end.slice(0,7):this.end;
				if(!start||!end){
					console.error("时间不能为空");return;
				}else if(start>end){
					console.error("结束时间必须大等于开始时间");return;
				}
				if(this.value[0]){
					if((this.fields=='year'&&this.value[0].length!=4)||(this.fields=='month'&&this.value[0].length!=7)||(this.fields=='day'&&this.value[0].length!=10)){
						console.error("默认值格式与粒度格式不符");return;
					}
					this.startDate=this.value[0];
					if(this.value[1]){
						if((this.fields=='year'&&this.value[1].length!=4)||(this.fields=='month'&&this.value[1].length!=7)||(this.fields=='day'&&this.value[1].length!=10)){
							console.error("默认值格式与粒度格式不符");return;
						}
						this.endDate=this.value[1];
						this.dateType="endDate";
						if(this.fields=='day')this.dayArr=this.getMonthDay(this.value[1].slice(0,4),this.value[1].slice(5,7));
						pickerValue=this.getIndex(this.value[1]);
					}else{
						this.dateType="startDate";
						if(this.fields=='day')this.dayArr=this.getMonthDay(this.value[0].slice(0,4),this.value[0].slice(5,7));
						pickerValue=this.getIndex(this.value[0]);
					}
				}else{
					this.startDate=start;
					pickerValue=this.getIndex(start);
					if(this.fields=='day')this.dayArr=this.getMonthDay(start.slice(0,4),start.slice(5,7));
				}
				if(pickerValue)setTimeout(function(){that.pickerValue=pickerValue},20)
			},
			maskClick(){
				this.$emit("showchange",false);
			},
			pickerConfirm(){
				if(this.endDate<this.startDate){
					uni.showToast({
						title:"结束时间不得小于开始时间",
						icon:"none",
						mask:true
					})
					return;
				}
				this.$emit("change",[this.startDate,this.endDate]);
				this.$emit("showchange",false);
			},
			pickerCancel(){
				this.$emit("cancel");
				this.$emit("showchange",false);
			},
			changeDateType(dateType){
				var that = this;
				this.dateType=dateType;
				if(this[dateType]){
					this.pickerValue=this.getIndex(this[dateType])
				}else{
					var dateTxt=this.fields=='year'?this.yearArr[this.pickerValue[0]]:this.fields=='month'?this.yearArr[this.pickerValue[0]]+'-'+this.monthArr[this.pickerValue[1]]:this.yearArr[this.pickerValue[0]]+'-'+this.monthArr[this.pickerValue[1]]+'-'+this.dayArr[this.pickerValue[2]];
					this[dateType]=dateTxt;
					this.pickerValue=this.fields=='year'?[this.pickerValue[0]]:this.fields=='month'?[this.pickerValue[0],this.pickerValue[1]]:[this.pickerValue[0],this.pickerValue[1],this.pickerValue[2]];
				}
			},
			pickerChangeMul(e){
				var that=this,val = e.detail.value,dateTxt="";
				if(this.fields=='day'&&(val[0]!=this.pickerValue[0]||val[1]!=this.pickerValue[1])){
					this.dayArr=this.getMonthDay(this.yearArr[val[0]],this.monthArr[val[1]])
					function returnMax(){
						if(!that.dayArr[val[2]]){
							val[2]=(val[2]-1)
							returnMax()
						}
					}
					returnMax()
				}
				dateTxt=this.yearArr[val[0]]+'-'+this.monthArr[val[1]]+'-'+this.dayArr[val[2]];
				this[this.dateType]=this.fields=='year'?dateTxt.slice(0,4):this.fields=='month'?dateTxt.slice(0,7):dateTxt;
				this.pickerValue=this.getIndex(this[this.dateType]);
			},
			getIndex(value){
				var year = value.slice(0,4),month=value.slice(5,7),day=value.slice(8,10),y=0,m=0,d=0;
				for(var i in this.yearArr){
					if(year==this.yearArr[i]){
						y=i;break;
					}
				}
				for(var i in this.monthArr){
					if(month==this.monthArr[i]){
						m=i;break;
					}
				}
				for(var i in this.dayArr){
					if(day==this.dayArr[i]){
						d=i;break;
					}
				}
				var value = [];
				switch (this.fields){
					case 'year':value = [Number(y)]
						break;
					case 'month':value = [Number(y),Number(m)]
						break;
					default:value = [Number(y),Number(m),Number(d)]
						break;
				}
				return value;
			},
			withData: (num) => {
				let param = parseInt(num);
			  return param < 10 ? '0' + param : '' + param;
			},
			getLoopArray(start, end,specialDay){
			  var start = start || 0;
			  var end = end || 1;
			  var array = [];
				if(specialDay){
					array=specialDay;
					return array;
				}
			  for (var i = start; i <= end; i++) {
			    array.push(this.withData(i));
			  }
			  return array;
			},
			getMonthDay(year, month,specialDay){
			  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

			  switch (month) {
			    case '01':
			    case '03':
			    case '05':
			    case '07':
			    case '08':
			    case '10':
			    case '12':
			      array = this.getLoopArray(1, 31,specialDay)
			      break;
			    case '04':
			    case '06':
			    case '09':
			    case '11':
			      array = this.getLoopArray(1, 30,specialDay)
			      break;
			    case '02':
			      array = flag ? this.getLoopArray(1, 29,specialDay) : this.getLoopArray(1, 28,specialDay)
			      break;
			    default:
			      array = '月份格式不正确，请重新输入！'
			  }
			  return array;
			}
		}
	}
</script>

<style>
    .pickerMask {
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .r-dtpicker {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 998;
    }

    .r-dtpicker-show {
        transform: translateY(0);
    }

    .rdtBtn {
        display: flex;
        padding: 9px 15px;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 17px;
    }

    .rdtBtn:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #e5e5e5;
        color: #e5e5e5;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }

    .rdtBtn view{
        display: block;
        flex: 1;
        color: #1aad19;
    }

    .rdtBtn view:first-child {
        text-align: left;
        color: #888;
    }

    .rdtBtn view:last-child {
        text-align: right;
    }

    .picker-item {
        text-align: center;
        line-height: 40px;
        font-size: 16px;
    }

    .mpvue-picker-view {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 238px;
        background-color: rgba(255, 255, 255, 1);
    }
	.rangeBox{
		background: #fff;
		display: flex;
		justify-content: center;
		padding: 15px 0;
		font-size: 16px;
		align-items: center;
	}
	.rangeBox input{
		width: 180upx;
		margin: 0 10px;
		text-align: center;
		align-items: center;
		display: flex;
		min-height: auto;
		border-bottom: 1px solid #000;
	}
</style>
