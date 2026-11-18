<template>
  <div class="current-wrap border">
    <div class="wrap" v-for="(row, ri) in rows" :key="ri">
      <div class="wrap-item" v-for="(item, i) in row" :key="i">
        <div>
          <img :src="item.icon" class="img-h2" :alt="item.label" />
        </div>
        <div class="text-h1">
          <b class="b-size">{{ item.value }}</b
          >{{ item.unit }}
        </div>
        <div class="text-h2">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 实时指标栅格
 * 把原来 10 个手写的 .wrap-item 块（每个 6 行 HTML）收成配置数组：
 *
 *   <MetricGrid :items="[
 *     { icon: waterIcon, value: allRainfall, unit: 'mm', label: '总雨量' },
 *     ...
 *   ]" />
 *
 * 默认每行 5 个（与原布局一致），可以通过 per-row 调整。
 */
export default {
  name: "MetricGrid",
  props: {
    items: { type: Array, default: () => [] },
    perRow: { type: Number, default: 5 },
  },
  computed: {
    rows() {
      const out = [];
      for (let i = 0; i < this.items.length; i += this.perRow) {
        out.push(this.items.slice(i, i + this.perRow));
      }
      return out;
    },
  },
};
</script>
