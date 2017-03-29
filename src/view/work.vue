<template>
	<div>
		<header-bar></header-bar>
		<!-- main -->
		<div class="wrapper-main clearfix">
			<div class="js-tab work-page" id="tabs">
				<ul class="tab-titles">
					<li v-for="(tab,index) in tabs" @click="toggle(index,tab.view)"  :class="{active:active==index}">{{tab.name}}</li>
				</ul>
				<div class="tab-contents">
					<transition name="bounce">
						<component :is="currentView"></component>
					</transition>
				</div>
			</div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import HeaderBar from '../components/header.vue'
	import FooterBar from '../components/footer.vue'
	import TabAll from '../components/tab_all.vue'
	import TabItem from '../components/tab_item.vue'

	export default {
		data(){
			return {
				currentView:'',
				active: 0,
				tabs:[
					{
						name:"All&LIST",
						view:"TabAll"
					},
					{
						name:"CSS/CSS3",
						view:"TabItem"
					},
					{
						name:"JS/JQUERY",
						view:"TabItem"
					},
					{
						name:"HTML/HTML5",
						view:"TabItem"
					}

				]
			}
		},
		components:{
			HeaderBar,
			FooterBar,
			TabAll,
			TabItem
		},
		methods :{
			toggle(i,v){
				this.active = i;
				this.currentView = v;
			}
		},
		mounted(){
			this.currentView = TabAll;
		}
	}
</script>
<style scoped>
.wrapper-main{
	width:100%;
	margin:0 auto;
	padding:20px 0;
	box-sizing:border-box;
	-webkit-box-sizing: border-box
}
.work-page {
	position:relative;
	min-height:500px
}
.work-page .tab-titles {
	position:absolute;
	top:0;
	left:0;
	width:20%;
	z-index:10
}
.work-page .tab-titles li {
	width:100%;
	height:60px;
	line-height:60px;
	text-align:center;
	cursor:pointer;
	color:#000;
	font-size:16px;
	border:1px solid #ccc;
	border-bottom:none;
	-webkit-transition:all .3s linear;
	transition:all .3s linear
}
.work-page .tab-titles li:last-of-type {
	border-bottom:1px solid #ccc
}
.work-page .tab-titles li:hover {
	border-right-color:#fff
}
.work-page .tab-titles li.active {
	color:red;
	border-left-width:10px;
	border-left-color:#000
}
.work-page .tab-contents {
	position:absolute;
	top:0;
	left:20%;
	z-index:1;
	width:80%;
  min-height:500px;
	margin-left:-1px;
	border:1px solid #ccc;overflow: hidden;
}
.work-page .tab-contents .cont-items {
	position:absolute;
	top:0;
	left:0;
	display:block;
	width:100%;
	height:100%;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}

@media screen and (max-width:749px) {
  .work-page .tab-titles {
    width: 32%;
  }

  .work-page .tab-contents {
    left:32%;
    width:68%;
  }
}

@keyframes bounce-in {
  0% {
    transform: translateY(-500px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes bounce-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-500px);
  }
}
</style>
