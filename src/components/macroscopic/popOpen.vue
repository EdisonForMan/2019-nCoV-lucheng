<template>
  <div id="popDiv" v-show="popShow">
    <a v-on:click="popClose" style="float: right;font-size: 40px;margin-right: 10px;cursor: pointer;">×</a>
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th>序号</th>
          <th>街镇</th>
          <th>集中隔离点名称</th>
          <th>地点</th>
          <th>联络人</th>
          <th>联系电话</th>
          <th>房间数</th>
          <th>使用人数</th>
          <th>其中湖北回鹿人数</th>
          <th>剩余可用房间数</th>
          <th>是否启用</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>七都街道</td>
          <td>老涂宾馆</td>
          <td>天灯街45号</td>
          <td>黄贤青</td>
          <td>659119</td>
          <td>8</td>
          <td>0</td>
          <td>0</td>
          <td>8</td>
          <td>是</td>
        </tr>
        <tr>
          <td>2</td>
          <td>滨江街道</td>
          <td>唯乐创意酒店</td>
          <td>车站大道789号</td>
          <td>徐健</td>
          <td>664588</td>
          <td>46</td>
          <td>45</td>
          <td>32</td>
          <td>3</td>
          <td>是</td>
        </tr>
        <tr>
          <td>3</td>
          <td>南汇街道</td>
          <td>锦江之星</td>
          <td>车站大道2401号</td>
          <td>陈宏余</td>
          <td>680966</td>
          <td>80</td>
          <td>0</td>
          <td>0</td>
          <td>80</td>
          <td>是</td>
        </tr>
        <tr>
          <td>4</td>
          <td>蒲鞋市街道</td>
          <td>金丝桥瑞都商旅酒店</td>
          <td>金丝桥30号</td>
          <td>夏微微</td>
          <td>18989779870（661685）</td>
          <td>70</td>
          <td>20</td>
          <td>18</td>
          <td>54</td>
          <td>是</td>
        </tr>
        <tr>
          <td>5</td>
          <td>南郊街道</td>
          <td>聚商连锁酒店</td>
          <td>过境公路1号（市交运集团旁）</td>
          <td>杨雄文</td>
          <td>662911</td>
          <td>27</td>
          <td>3</td>
          <td>0</td>
          <td>24</td>
          <td>是</td>
        </tr>
        <tr>
          <td>6</td>
          <td>大南街道</td>
          <td>瑞都酒店</td>
          <td>马鞍池西路38号</td>
          <td>陈宇</td>
          <td>665645</td>
          <td>72</td>
          <td>63</td>
          <td>2</td>
          <td>14</td>
          <td>是</td>
        </tr>
        <tr>
          <td>7</td>
          <td>五马街道</td>
          <td>锐思特（飞霞路店）</td>
          <td>飞霞南路918弄46号</td>
          <td>李丹</td>
          <td>13819730710(660170)</td>
          <td>80</td>
          <td>52</td>
          <td>0</td>
          <td>15</td>
          <td>是</td>
        </tr>
        <tr>
          <td>8</td>
          <td>松台街道</td>
          <td>威斯顿时尚酒店</td>
          <td>鹿城路后巷62弄27号</td>
          <td>胡韵栋/韩强</td>
          <td>13868525500/658850</td>
          <td>50</td>
          <td>57</td>
          <td>8</td>
          <td>0</td>
          <td>是</td>
        </tr>
        <tr>
          <td>9</td>
          <td>广化街道</td>
          <td>众豪酒店</td>
          <td>鹿城路477-479号</td>
          <td>陈雪峰</td>
          <td>667828</td>
          <td>50</td>
          <td>0</td>
          <td>0</td>
          <td>50</td>
          <td>是</td>
        </tr>
        <tr>
          <td>10</td>
          <td>双屿街道</td>
          <td>瑞都连锁酒店</td>
          <td>三开路28号</td>
          <td>孙晨辉</td>
          <td>670598</td>
          <td>63</td>
          <td>35</td>
          <td>3</td>
          <td>34</td>
          <td>是</td>
        </tr>
        <tr>
          <td>11</td>
          <td>丰门街道</td>
          <td>百思快捷宾馆</td>
          <td>嵇师新街42号</td>
          <td>蔡海波</td>
          <td>665759</td>
          <td>35</td>
          <td>27</td>
          <td>27</td>
          <td>23</td>
          <td>是</td>
        </tr>
        <tr>
          <td>12</td>
          <td>仰义街道</td>
          <td>双屿欣悦宾馆</td>
          <td>温金路168号</td>
          <td>吴建武/刘俊敏</td>
          <td>13957792015/662472</td>
          <td>51</td>
          <td>8</td>
          <td>6</td>
          <td>45</td>
          <td>是</td>
        </tr>
        <tr>
          <td>13</td>
          <td>藤桥镇</td>
          <td>龙城宾馆</td>
          <td>渔藤路298号</td>
          <td>王学顺/蔡爱芬</td>
          <td>677740/680601</td>
          <td>37</td>
          <td>34</td>
          <td>9</td>
          <td>3</td>
          <td>是</td>
        </tr>
        <tr>
          <td>14</td>
          <td>山福镇</td>
          <td>龙城宾馆</td>
          <td>渔藤路298号</td>
          <td>王学顺/蔡爱芬</td>
          <td>677740/680601</td>
          <td>37</td>
          <td>34</td>
          <td>9</td>
          <td>3</td>
          <td>是</td>
        </tr>
        <tr>
          <td>15</td>
          <td colspan="5">合计</td>
          <td>669</td>
          <td>344</td>
          <td>105</td>
          <td>353</td>
          <td>是</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import util from "./util";
export default {
  data() {
    return {
      popShow: false //弹出框默认隐藏
    };
  },
  methods: {
    popShowDiv() {
      this.popShow = true; //显示
    },
    popClose(){
        this.popShow = false; //隐藏
    }
  },
  mounted() {
    var that = this;
    util.$on('popshow', function () {
        that.popShowDiv();
    })
  }
};
</script>

<style>
#popDiv {
  position: absolute;
  width: 80%;
  height: 78%;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  top: 0;
  margin: auto;
  left: 10%;
  top: 10%;
}
#popDiv table {
  border: 1px solid #ccc;
  width: 96%;
  margin-left: 2%;
}
#popDiv table td,
#popDiv table th {
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;
}
</style>