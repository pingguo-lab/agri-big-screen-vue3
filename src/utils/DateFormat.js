 let  Format_Object;
 const FormatDay = (M, Day) => {  //Month是当前月份
    let DayArr = []
    let changeData = Day - 10
    if ((Day - 10) <= 0) {
        // 时间在月初
        M = M - 1
        console.log(M)
        if (M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12) //月份为31天
        {
            let minus = Math.abs(Day - 10) //获取日期差值
            for (let i = 0; i < minus; i++) {
                DayArr[i] = 31 - minus - changeData;
                changeData++
            }
        }
        else {
            let minus = Math.abs(Day - 10) //获取日期差值
            for (let i = 0; i < minus; i++) {

                DayArr[i] = 30 - minus - changeData;
                changeData++
            }
        }

    }
    return DayArr.reverse().map(item => {
        return `${M}-${item}日`
    })
}
const FormatHour = (Hour) => {
    let abs = Math.abs(Hour - 6) //差值线，即循环的次数
    let baseNum = 24 - abs //基准线
    let minusArr = []
    for (let i = 0; i <abs; i++) {
        minusArr[i] = baseNum
        baseNum++;
    }
    console.log(minusArr)
    return minusArr
}
export default  Format_Object={
    FormatDay,FormatHour
}