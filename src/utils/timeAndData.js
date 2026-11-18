function findTimeIndex(timeArr, flagStr) {
    return timeArr.indexOf(flagStr);
}

function fillZero(len, targetArr) {
    for (let i = 0; i < len; i++) {
        if (!targetArr[i]) {
            targetArr[i] = 0;
        }
    }
}
// 设置温湿度的方法(目前仅用于查看小时部分):
/**
 * 
 * @param {Array} recData 从请求中获得的数组
 * @param {Array} targetArr 目标数组，表示要将数据存储到哪个数组中去
 * @param {*} dataTime 时间表示，表示调用此方法的组件中的时间轴的数组
 * @param {*} timeType 时间类型，可以表示hour，day
 * @param {*} dataType 数据类型，表示温度、湿度、co2；
 */
function setCompData(recData, targetArr, dataTime, timeType, dataType) {
    for (let i = 0; i < recData.length; i++) {
        let timeIndex = 0;
        const time = recData[i].arrived.toString().split(" ")[1].slice(0, 2);
        if (timeType === 'hour') {
            if (time[0] === "0") {
                timeIndex = findTimeIndex(
                    dataTime,
                    `${recData[i].arrived.toString().split(" ")[1].slice(1, 2)}点`
                );
            } else {
                timeIndex = findTimeIndex(dataTime, `${time}点`);
            }
        } else if (timeType === 'day') {
            timeIndex = findTimeIndex(
                dataTime,
                `${recData[i].arrived.toString().split(" ")[0].slice(8, 10)}日`
            );
        }
        if (dataType === 'temperature') {
            targetArr[timeIndex] = recData[i].temperature;
        } else if (dataType === 'humidity') {
            targetArr[timeIndex] = recData[i].humidity;
        } else if (dataType === 'co2') {
            targetArr[timeIndex] = recData[i].co2;
        }
    }
    fillZero(targetArr.length, targetArr);
}
export {
    findTimeIndex,
    fillZero,
    setCompData
}