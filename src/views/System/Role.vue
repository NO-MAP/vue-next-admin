<template>
  <div class="content">
    <el-table
      :data="tableData.result.records"
      :loading="tableData.loading"
    ></el-table>
  </div>
  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next, sizes, jumper, total"
      @size-change="getTableData"
      @current-change="getTableData"
      v-model:currentPage="pageParams.current"
      v-model:pageSize="pageParams.size"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script>
import { SWR, useSWR } from "@/hooks/useSWR";
import { defineComponent, reactive } from "vue";
import { getRolesPage } from "@/api/role";

export default defineComponent({
  name: "SystemRole",
  setup() {
    const pageParams = reactive({
      current: 0,
      size: 15,
    });

    const tableData = SWR({
      records: [],
      total: 0,
    });

    const getTableData = async () => {
      await useSWR(
        getRolesPage({
          pageNum: pageParams.current,
          pageSize: pageParams.size,
        }),
        tableData
      );
    };

    getTableData();

    return {
      pageParams,
      tableData,
      getTableData,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 50px);
}

.page {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>