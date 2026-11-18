/**
 * 示例数据（演示兜底）
 *
 * 背景：本项目后端是 http://121.5.9.113:8090（纯 HTTP）。
 * 本地开发没问题，但部署到 HTTPS 站点（GitHub Pages / Vercel）时，
 * 浏览器会以「混合内容」为由拦截请求，页面会全是 0。
 *
 * 这里做一个降级：请求失败、或接口返回空数组时，用一组仿真数据顶上，
 * 保证在线 demo 能看到图表和数字。控制台会打印 [mock] 提示，方便区分真假数据。
 */

const round = (n, d = 2) => Number(n.toFixed(d));

function pad(n) {
  return String(n).padStart(2, "0");
}

function fmt(date) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

/** 生成一条仿真记录（字段与真实接口对齐） */
export function makeRecord(i = 0, base = new Date()) {
  const t = new Date(base.getTime() - (23 - i) * 3600 * 1000); // 过去 24 小时，逐小时
  const wave = Math.sin((i / 24) * Math.PI * 2); // 一天一个周期

  return {
    topic: "35",
    clientId: "35-1",
    area: "zgdq",
    ts: fmt(t),
    receiveTime: fmt(t),
    temperature: round(14 + wave * 6, 1),        // 空气温度 8~20℃
    humidity: round(62 - wave * 12, 1),          // 空气湿度 50~74%
    soilTemp: round(15.7 + wave * 1.2, 1),       // 土壤温度
    soilHum: round(31.5 + wave * 4, 1),          // 土壤湿度
    illuminance: Math.max(0, Math.round(900 - Math.abs(wave) * 700)),
    co2: round(600 + wave * 60, 1),              // CO2
    sunRadia: round(Math.max(0, 8 + wave * 8), 2),
    conductivity: round(40 + wave * 2, 2),       // 土壤电导率
    pm25: round(55 - wave * 10, 1),
    pm10: round(30 + wave * 5, 1),
    windSpeed: round(0.9 + Math.abs(wave) * 0.6, 2),
    windDirection: (i % 8 + 8) % 8,              // 0~7 编码
    rainfall: round(Math.max(0, wave * 1.2), 2),
    allRainfall: round(12 + i * 0.3, 2),

    // 水产页面专用：后端把「溶解氧/溶氧比/PH/氨氮」塞在 temp1~temp4
    temp1: round(6.5 + wave * 1.2, 2),           // 溶解氧 mg/L
    temp2: round(0.8 + Math.abs(wave) * 0.1, 2), // 溶氧比
    temp3: round(7.6 + wave * 0.4, 2),           // PH
    temp4: round(0.5 + Math.abs(wave) * 0.3, 2), // 氨氮 mg/L
  };
}

/** 生成一小时内的多条记录（模拟"每 5 分钟一条"的真实采集节奏） */
function makeHourRecords(hours = 24) {
  const out = [];
  for (let h = hours - 1; h >= 0; h--) {
    out.push(makeRecord(23 - h));
  }
  return out;
}

/**
 * 根据请求参数构造"假响应"，结构与后端一致：{ code, success, message, data }
 * @param {string} url 请求地址
 * @param {object} params 请求参数（timeType 决定返回几条）
 */
export function buildMockResponse(url, params = {}) {
  const timeType = params.timeType || "realTime";
  let data;

  if (timeType === "realTime") {
    data = [makeRecord(23)];            // 只要最新一条
  } else if (timeType === "day") {
    data = makeHourRecords(7);          // 近 7 天
  } else {
    data = makeHourRecords(24);         // 近 24 小时
  }

  console.warn(`[mock] 接口不可用，已使用示例数据：${url} (${timeType})`);
  return { code: 200, success: true, message: "mock", data };
}

/** 是否是本项目的业务接口（只有这些才做降级，登录/导出不碰） */
export function isProjectApi(url = "") {
  return /\/mountain|\/api\/v1\/(msg|allMsg)/.test(url);
}
