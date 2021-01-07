<template>
  <div class="query">
    <el-input
      style="width: 200px; margin-right: 10px"
      placeholder="输入用户名"
      clearable
      v-model="tableQuery.userName"
    ></el-input>
    <el-input
      style="width: 200px; margin-right: 10px"
      placeholder="输入邮箱"
      v-model="tableQuery.email"
    ></el-input>
    <el-button
      style="margin-right: 10px"
      type="primary"
      icon="el-icon-search"
      @click="getTableData"
      >搜索</el-button
    >
    <el-button
      style="margin-right: 10px"
      type="primary"
      icon="el-icon-refresh"
      @click="refreshQuery"
      >刷新</el-button
    >
  </div>
  <div class="content">
    <el-table
      v-loading="tableData.loading"
      :data="tableData.result.records"
      size="mini"
      fit
      border
      height="100%"
    >
      <el-table-column
        type="index"
        width="55"
        label="序"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userName"
        width="200"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        width="200"
        label="邮箱"
        align="center"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="角色" align="center">
        <template v-slot="scope">
          <span>{{
            scope.row.roles.map((item) => item.roleName).join("、")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300" label="创建时间" align="center">
        <template v-slot="scope">
          <span>{{
            $filters.format(scope.row.createDate, "YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300" label="更新时间" align="center">
        <template v-slot="scope">
          <span>{{
            $filters.format(scope.row.updateDate, "YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" fixed="right" align="center">
        <el-button @click="viewHandle(scope.row)" type="text">查看</el-button>
        <el-button @click="editHandle(scope.row)" type="text">编辑</el-button>
        <el-popconfirm title="确定删除吗？" @confirm="delHandle(scope.row)">
          <template #reference>
            <el-button type="text" class="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <el-pagination
      v-model:current-page="tableQuery.current"
      v-model:page-size="tableQuery.pageSize"
      @size-change="getTableData"
      @current-change="getTableData"
      :total="tableData.result.total"
      background
      layout="prev, pager, next, total, jumper, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import { SWR, useSWR } from "@/hooks/useSWR";
import { defineComponent, reactive } from "vue";
import { getUserPage } from "@/api/user";

export default defineComponent({
  name: "SystemUser",
  setup() {
    const tableData = SWR({
      records: [],
      total: 0,
    });

    const tableQuery = reactive({
      current: 1,
      pageSize: 20,
      userName: "",
      email: "",
    });

    const getTableData = async () => {
      await useSWR(
        getUserPage({
          current: tableQuery.current,
          pageSize: tableQuery.pageSize,
          userName: tableQuery.userName,
          emial: tableQuery.emial,
        }),
        tableData
      );
    };

    const refreshQuery = () => {
      tableQuery.current = 1;
      tableQuery.pageSize = 20;
      tableQuery.userName = "";
      tableQuery.email = "";
      getTableData();
    };

    const viewHandle = () => {};
    const editHandle = () => {};
    const delHandle = () => {};

    getTableData();

    return {
      tableData,
      tableQuery,
      getTableData,
      refreshQuery,
      viewHandle,
      editHandle,
      delHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.query {
  height: 40px;
  min-width: 100%;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
}
.content {
  height: calc(100% - 90px);
  box-sizing: border-box;
  padding: 5px;
}

.page {
  height: 50px;
  min-width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>