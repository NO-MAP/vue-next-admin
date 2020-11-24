<template>
  <div class="content">
    <el-table
      :loading="tableData.loading"
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
        prop="roleName"
        label="角色名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="roleCode"
        width="200"
        label="角色编码"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="cereateTime"
        width="300"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        width="300"
        label="更新时间"
        align="center"
      ></el-table-column>
      <el-table-column width="150" fixed="right" align="center">
        <template #header>
          <span>操作</span>
          <el-button
            title="新增角色"
            @click="addHandle"
            style="margin-left: 10px"
            type="primary"
            circle
            icon="el-icon-plus"
          ></el-button>
          <el-button
            title="刷新"
            :loading="tableData.loading"
            @click="getTableData"
            style="margin-left: 10px"
            type="primary"
            circle
            icon="el-icon-refresh"
          ></el-button>
        </template>
        <template v-slot="scope">
          <el-button @click="viewHandle(scope.row)" type="text">查看</el-button>
          <el-button @click="editHandle(scope.row)" type="text">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="delHandle(scope.row)">
            <template #reference>
              <el-button type="text" class="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <el-scrollbar>
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
    </el-scrollbar>
  </div>
  <RoleDialog @done="getTableData" ref="RoleDialog" />
</template>

<script>
import { SWR, useSWR } from "@/hooks/useSWR";
import { defineComponent, reactive, ref } from "vue";
import { delRole, getRolesPage } from "@/api/role";
import RoleDialog from "./components/RoleDialog";

export default defineComponent({
  name: "SystemRole",
  components: { RoleDialog },
  setup() {
    const RoleDialog = ref(null);
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

    const viewHandle = (row) => {
      const _RoleDialog = RoleDialog.value;
      _RoleDialog.setStatus("view");
      _RoleDialog.setForm(row);
      _RoleDialog.show();
    };

    const addHandle = () => {
      const _RoleDialog = RoleDialog.value;
      _RoleDialog.setStatus("add");
      _RoleDialog.show();
    };

    const editHandle = (row) => {
      const _RoleDialog = RoleDialog.value;
      _RoleDialog.setStatus("edit");
      _RoleDialog.setForm(row);
      _RoleDialog.show();
    };
    const delHandle = async (row) => {
      await delRole(row.id);
      getTableData();
    };

    getTableData();

    return {
      pageParams,
      tableData,
      getTableData,
      viewHandle,
      addHandle,
      RoleDialog,
      editHandle,
      delHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 50px);
  box-sizing: border-box;
  padding: 5px;
}

.page {
  height: 50px;
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>