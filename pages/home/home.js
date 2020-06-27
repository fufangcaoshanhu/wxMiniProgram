Page({
  data:{
    name:"WLB",
    students:[
      {id:1,name:"name1",age:"20"},
      {id:2,name:"name2",age:"20"},
      {id:3,name:"name3",age:"20"}
    ],
    count : 0
  },
  add(){
    this.setData({
      count: this.data.count +1
    });
  },
  sub(){
    this.setData({
      count: this.data.count -1
    });
  }
})
