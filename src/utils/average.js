//求平均值
export function average(arr){
    let sum=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]){
        arr[i]=arr[i]-0;  //如果arr里面元素是字符型数字，需强行转换为数字
        }
        else {arr[i]=0}    //当后台返回的数据为undefined时把数据置为0
        sum+=arr[i];
    }
    return (sum/arr.length).toFixed(1)
}

/*因为数据每五分钟传来一个新的，所以从后台获取的数据每13个数是一小时的数据，
如arr[0-12]是一个小时的数据，arr[12-24]又是下一个小时的数据，.......
以此类推，共显示近六小时每小时的平均值*/
export function pushData(arr){
    let rtArr=[];
        rtArr[0]=average(arr.slice(0,13));
        rtArr[1]=average(arr.slice(12,25));
        rtArr[2]=average(arr.slice(24,37));
        rtArr[3]=average(arr.slice(36,49));
        rtArr[4]=average(arr.slice(48,61));
        rtArr[5]=average(arr.slice(60,73));
        return rtArr;
    

}
/*获取条形图上x轴的时间戳*/
export function  getBarTime(time){
    let timeArr=[];
    timeArr[0]=time[12]+"-"+time[0];
    timeArr[1]=time[24]+"-"+time[12];
    timeArr[2]=time[36]+"-"+time[24];
    timeArr[3]=time[48]+"-"+time[36];
    timeArr[4]=time[60]+"-"+time[48];
    timeArr[5]=time[72]+"-"+time[60];
    return timeArr;
}
