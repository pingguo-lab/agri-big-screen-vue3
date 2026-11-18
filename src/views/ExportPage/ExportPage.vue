<template>
  <div class="export-container">
    <div class="export">
      <!-- <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Date" prop="date"> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
        </el-table-column>
      </el-table> -->
      <el-button @click="handleExport">导出</el-button>
    </div>
    <el-dialog
      title="导出数据"
      v-model="centerDialogVisible"
      width="50%"
      center
    >
      <div
        class="gate-pick block"
        style="display: flex; align-items:center;justify-content: center;"
      >
        <el-select
          v-model="curGateway"
          placeholder="请选择网关"
          style="text-align:center;width:90%;margin-bottom: 10px;"
        >
          <el-option
            v-for="item in gatewayOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div
        class="block"
        style="display: flex; align-items:center;justify-content: center;"
      >
        <el-date-picker
          style="text-align:center;width:90%;"
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy年MM月dd日"
        >
        </el-date-picker>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmExport">确定导出</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "export",
  data() {
    return {
      centerDialogVisible: false,
      dateValue: [],
      curGateway: Array.isArray(this.$store.getters.topicId)
        ? this.$store.getters.topicId[0]
        : this.$store.getters.topicId,
      gatewayOpt: Array.isArray(this.$store.getters.topicId)
        ? this.$store.getters.topicId.map((e) => {
            return {
              label: `${e}号网关`,
              value: e,
            };
          })
        : [
            {
              label: `${
                this.$store.getters.topicId ? this.$store.getters.topicId : 0
              }号网关`,
              value: this.$store.getters.topicId,
            },
          ],
    };
  },
  methods: {
    handleExport() {
      this.centerDialogVisible = true;
      console.log(this.$store.getters.topicId);
    },
    confirmExport() {
      console.log(
        `导出${this.curGateway}号网关， 时间为${this.dateValue}的数据`
      );
      if (!this.dateValue[0] || !this.dateValue[1]) {
        this.$message({
          message: "信息未填写完整！",
          type: "warning",
        });
      } else {
        this.$axios({
          url: "http://121.5.9.113:8090/api/v1/allMsg/export",
          method: "get",
          params: {
            topic: this.curGateway,
            startTime: dayjs(this.dateValue[0]).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs(this.dateValue[1]).format("YYYY-MM-DD HH:mm:ss"),
          },
          responseType: "blob",
          Headers: {
            "Content-Type": "Access-Control-Expose-Headers",
          },
        }).then((res) => {
          if (res.data.size < 100) {
            console.log(res);
            return this.$message({
              message: "账号不可用",
              type: "error",
            });
          } else {
            this.$message.success("导出成功，即将开始下载~");
            this.centerDialogVisible = false;
            console.log("data", res.data);
            const blob = new Blob([res.data], {
              type: `application/vnd.ms-excel;charset=utf-8`,
            });
            //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            //IE10以上支持blob但是依然不支持download
            if ("download" in document.createElement("a")) {
              //支持a标签download的浏览器
              const link = document.createElement("a"); //创建a标签
              link.download = `${this.curGateway}号网关：${dayjs(
                this.dateValue[0]
              ).format("YYYY年MM月DD日")}-${dayjs(this.dateValue[1]).format(
                "YYYY年MM月DD日"
              )}数据`; //a标签添加属性
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click(); //执行下载
              URL.revokeObjectURL(link.href); //释放url
              document.body.removeChild(link); //释放标签
            }
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.export-container {
  display: flex;
  width: 100%;
  height: 100%;
  .export {
    margin: auto;
  }
}
.gate-pick {
  margin-bottom: 5%;
}
</style>
