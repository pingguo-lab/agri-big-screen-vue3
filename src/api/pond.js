import { getRequest } from "@/utils/request";

/**
 * 余干水产的数据访问层
 *
 * 把原来写在 ScreenPage.getData() 里 ~140 行、重复 6 遍的取数逻辑收敛到这里：
 *   - 一次 overview 请求（风速/风向/CO2/湿度）
 *   - 6 个池塘各一次小时级序列（溶解氧 / PH / 氨氮，分别存在 temp1 / temp3 / temp4）
 *   - 一次鱼价请求
 *
 * 说明：后端把"溶解氧/PH/氨氮"塞在 temp1/temp3/temp4 三个通用字段里，是历史约定。
 */

const ALL_MSG = "/api/v1/allMsg";

/** 网关（topicId）与池塘的对应关系 */
export const POND_TOPICS = {
  overview: "37", // 总览：风速/风向/CO2/湿度
  A1: "42",
  A2: "43",
  A3: "44",
  B1: "40",
  B2: "41",
};

/** 取总览实时数据 */
export async function fetchOverview() {
  const res = await getRequest(ALL_MSG, {
    topicId: POND_TOPICS.overview,
    timeType: "realTime",
  });
  const rec = (res && res.data && res.data[0]) || {};
  return {
    windSpeed: rec.windSpeed,
    windDirection: rec.windDirection,
    co2: rec.co2,
    humidity: rec.humidity,
  };
}

/** 取单个池塘的小时级序列（最近 10 个点） */
export async function fetchPondSeries(topicId) {
  const res = await getRequest(ALL_MSG, { topicId, timeType: "hour" });
  const list = ((res && res.data) || []).slice().reverse().slice(13, 23);
  return {
    time: list.map((i) => i.receiveTime.slice(11, 13) + "点"),
    dissolvedOxygen: list.map((i) => i.temp1),
    ph: list.map((i) => i.temp3),
    ammoniaNitrogen: list.map((i) => i.temp4),
  };
}

/** 取鱼价（每个品种的今日/昨日价格） */
export async function fetchFishPrice() {
  const res = await getRequest("/api/v1/fishMsg/varieties", {});
  const data = (res && res.data) || [];
  if (!data.length) return null;
  return {
    names: data.map((row) => row[0].variety),
    price1: data.map((row) => row[0].price),
    price2: data.map((row) => row[1] && row[1].price),
    price3: data.map((row) => row[2] && row[2].price),
    price4: data.map((row) => row[3] && row[3].price),
    dates: data[0].map((item) => item.createTime.slice(8, 10) + "日"),
  };
}

/** 一次性拉齐整页需要的数据 */
export async function fetchAquaDashboard() {
  const [overview, a1, a2, a3, b1, b2, price] = await Promise.all([
    fetchOverview(),
    fetchPondSeries(POND_TOPICS.A1),
    fetchPondSeries(POND_TOPICS.A2),
    fetchPondSeries(POND_TOPICS.A3),
    fetchPondSeries(POND_TOPICS.B1),
    fetchPondSeries(POND_TOPICS.B2),
    fetchFishPrice().catch(() => null),
  ]);
  return { overview, a1, a2, a3, b1, b2, price };
}
