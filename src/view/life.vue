<template>
	<div>
		<header-bar></header-bar>
			<!-- main -->
			<div class="wrapper-main">
				<div class="js-tab life-page">
          <!-- 选项卡title -->
					<ul class="tab-titles">
						<li v-for="(item, index) in nav" @click="toggle(index)" :class="{active:active==index}"><router-link :to="item.to" v-text="item.name"></router-link></li>
					</ul>
          <!-- 选项卡内容 -->
					<div class="tab-contents">
						<router-view></router-view>
					</div>
				</div>
			</div>
    <back-top></back-top>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import HeaderBar from '../components/header.vue'
	import FooterBar from '../components/footer.vue'
  import BackTop from '../components/back_top.vue'

	export default {
		data(){
			return {
				nav:[
					{
						name:"文章",
						to:"/life/text"
					},
					{
						name:"动画",
						to:"/life/animate"
					},
					{
						name:"音乐",
						to:"/life/music"
					},
          {
            name:"demo",
            to:"/life/demo"
          }
				],
				life:[],
        active:0
			}
		},
		methods:{
			toggle(index){
				this.active = index;
			}
		},
		components:{
			HeaderBar,
			FooterBar,
      BackTop
		},
		mounted(){}
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
.life-page .tab-titles {
	font-size:0;
	padding:20px;
	border:1px solid #ccc;
	box-sizing:border-box
}
.life-page .tab-titles li {
	display:inline-block;
	padding:5px;
	font-size:14px;
	margin-right:20px;
	cursor:pointer
}
.life-page .tab-titles li a{
	color: #666;
}
.life-page .tab-titles li.active {
	color:#fff;
	border-radius:5px;
	background:#333
}
.life-page .tab-titles li:hover {
	background:#333;
	border-radius:5px
}
.life-page .tab-titles li:hover a{
	color: #ffffff;
}
.life-page .tab-titles li.active a{
	color: #ffffff;
}
.life-page .tab-contents {
  min-height:300px;
	margin-top:20px;
	text-align: center;
}
.life-page .tab-contents.loading {
	min-height:50px;
	background:url(../assets/images/loading.gif) center no-repeat
}
.life-page .tab-contents .cont-items {
	display:;
}
.life-page .tab-contents .cont-items .album-list {
	padding-bottom:20px
}
.life-page .tab-contents .cont-items .album-list div {
	display:none;
	font-size:0
}
.life-page .tab-contents .cont-items .album-list span {
	position:relative;
	display:inline-block;
	width:160px;
	height:120px;
	margin-right:1px;
	cursor:pointer;
	overflow:hidden
}
.life-page .tab-contents .cont-items .album-list span img {
	width:160px;
	height:120px;
	-webkit-transition:-webkit-transform .5s ease;
	transition:-webkit-transform .5s ease;
	transition:transform .5s ease;
}
.life-page .tab-contents .cont-items .album-list span i {
	position:absolute;
	left:0;
	bottom:-100%;
	display:block;
	width:100%;
	padding:5px 0;
	text-align:center;
	color:#fff;
	font-size:12px;
	-webkit-transition:all .5s ease;
	transition:all .5s ease;
	background:rgba(0,0,0,.5)
}
.life-page .tab-contents .cont-items .album-list span:hover i {
	bottom:0
}
.life-page .tab-contents .cont-items .album-list span:hover img {
	-webkit-transform:scale(1.2);
	transform:scale(1.2)
}
.life-page .tab-contents .picture {
	overflow-x:hidden
}
.life-page .tab-contents .picture ul {
	width:980px
}
.life-page .tab-contents .picture ul li {
	width:220px;
	height:320px;
	padding:5px;
	float:left;
	margin-right:20px;
	margin-bottom:10px;
	cursor:pointer;
	border:1px solid #ccc
}
.life-page .tab-contents .picture ul li figure {
	position:relative;
	width:100%;
	height:100%
}
.life-page .tab-contents .picture ul li figure figcaption {
	position:absolute;
	left:0;
	bottom:0;
	width:100%;
	height:30px;
	line-height:30px;
	color:#fff;
	font-size:12px;
	padding:0 10px;
	box-sizing:border-box
}
.life-page .tab-contents .picture ul li figure figcaption .icon-price-tag {
	margin-right:5px
}
.life-page .tab-contents .picture ul li figure figcaption .pic-num {
	position:absolute;
	top:0;
	right:10px;
	display:block
}
</style>
