<template>
  <div class="hello">

    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-col :span="4"><div class="top1">welcome JsonTranslate</div></el-col>
        <el-col :span="2"><div class="top2"><el-link type="primary" @click="setDemo1">示例1：JSON片段</el-link></div></el-col>
        <el-col :span="2"><div class="top2"><el-link type="primary" @click="setDemo2">示例2：JSON片段</el-link></div></el-col>
        <!-- <el-col :span="2"><div class="top2"><el-button type="text"  @click="setDemo">文字按钮</el-button></div></el-col> -->
      </div></el-col>
    </el-row>
    <el-row :gutter="10" type="flex" class="row-bg">
      <el-col :span="8">
        <div class="grid-content1 bg-purple">
        <el-input type="textarea" :rows="41" placeholder="请输入JSON内容" v-model="inputJson">
        </el-input>
        </div>
      </el-col>

      <el-col :span="16" >
        <div class="grid-content1 bg-purple-light">
          <el-row :gutter="10" type="flex">
            <el-col :span="22">
              <el-input v-model="inputKeyWord" placeholder="请输入需要筛选字段,‘,’逗号相隔" clearable></el-input>
            </el-col>
            <el-col :span="2">
              <div class="button"><el-button type="primary" @click="onSubmit">格式化</el-button></div>
            </el-col>
          </el-row>
          <el-row>
            <el-input v-model="inputResult" readonly type="textarea" :rows="39"></el-input>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'JsonTranslate',
  data () {
    return {
      msg: 'Welcome to JsonTranslate',
      inputJson: '',
      inputKeyWord: '',
      inputResult: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      // console.log(this.inputJson.replace(/\s/g, ''));
      // console.log(JSON.stringify(this.inputJson));
      var data = { inputJson: this.inputJson.replace(/\s/g, ''), inputKeyWord: this.inputKeyWord.replace(/\s/g, '')}
      this.$axios.post(this.GLOBAL.remoteHost+"/mitutucue/springboot/JsonTranslate/getValueByKey",this.$qs.stringify(data)
      //   {
      //     params:{
      //     inputJson:this.inputJson, //参数，键值对，key值：value值
      //     inputKeyWord:this.inputKeyWord
      //   }  
      // }
      ).then(res => {
        console.log('返回数据')
        this.inputResult = ''

        if(null != res.data){
          var result = res.data
          var keyWords = this.inputKeyWord.replace(/\s/g, '').split(',')
          for(var a in result) {
            var map = result[a].map
            for(var key in keyWords){
              console.log(key,keyWords[key])
              console.log(map[keyWords[key]])
              this.inputResult = this.inputResult + map[keyWords[key]] + '\t'
            }
            //写法二，遍历map
              // for(var key in map){
              //   this.inputResult = this.inputResult + map[key] + '\t';
              // }
            this.inputResult = this.inputResult + '\r\n'
          }
        }
       
      //获取你需要用到的数据
      })
    },
    setDemo1(){
      console.log('设置示例')
      this.inputJson = this.JSONEXAMPLE.jsonExample2
      this.inputKeyWord = this.JSONEXAMPLE.jsonKeys1
      
    },
    setDemo2(){
      console.log("设置示例二")
      this.inputJson = this.JSONEXAMPLE.jsonExample1
      this.JSONEXAMPLE.jsonKeys2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("//unpkg.com/element-ui@2.9.1/lib/theme-chalk/index.css");
  .el-row {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple-dark {
    background: #e5e9f2;
    min-height: 30px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
    width: 100%;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }

  .row-bg {
    background: #FFF5EE;
    border-radius: 4px;
    min-height: 870px;
    margin-bottom: 0px;
  }
  .row1{
    background: #CD8500;
    border-radius: 4px;
    min-height: 40px;
    margin-bottom: 0px;
    margin: 4px;
  }
  .top1{
    padding: 10px;
    font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
    font-size:20px;

  }
 .top2{
   padding: 15px;
   font-size:15px;

 }
 .button{
   margin-right: 10%;
 }
</style>
