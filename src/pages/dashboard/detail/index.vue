<!-- eslint-disable prettier/prettier -->
<template>
  <t-card title="基本配置" class="dashboard-detail-card" style="width: 100%;height: 100%;">
    <t-space direction="vertical" style="width: 70%; height: 100%; position: relative;left: 20%;">
      <t-form colon :label-width="150" style="top: 25px;position: relative;">
        <t-form-item label="资源目录">
          <t-input name="loop_vh_path" placeholder="D:\project"></t-input>
        </t-form-item>

        <t-form-item label="场景名称">
          <t-input name="loop_vh_action" placeholder="xxxxx数字人"></t-input>
        </t-form-item>

        <t-form-item label="场景帧序">
          <t-textarea name="loop_frame_idxs" placeholder="1,2,3,4,5,6,7,8,9,10,11,12,13,14" :autosize="false" />
        </t-form-item>

        <t-form-item label="自定动作">
          <template #statusIcon>
            <t-button @click="addItem">
              <t-icon name="add" />
            </t-button>
          </template>
        </t-form-item>

        <!--自定义动作-->
        <t-form-item v-for="(item, index) in spactionList" :key="item.id" :name="item.name">
          <div class="demo-card" style="width: 100%;">
            <t-card :title="`动作${index + 1}`" :bordered="false" name={{item.name}} hover-shadow>
              <template #actions>
                <a href="javascript:void(0)" @click="removeItem(item, index)">删除</a>
              </template>
              <t-space direction="vertical" style="width: 100%;">
                <t-input placeholder="动作名称"></t-input>
                <t-textarea placeholder="1,2,3,4,5,6,7,8,9,10,11,12,13,14" :autosize="false" />
              </t-space>
            </t-card>
          </div>
        </t-form-item>

        <t-form-item :status-icon="false">
          <t-space size="small">
            <t-button theme="primary" type="submit" @click="saveItem()">保存</t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </t-space>
    <div style="height: 25px;"></div>
  </t-card>
</template>

<script lang="ts" setup name="DashboardDetail">
import { ref } from 'vue';
import { TextareaProps } from 'tdesign-vue-next';

const spactionList = ref([{ id: 0, name: 'sp_actions0' }]);

const lastAddItem = ref(1);

const addItem = () => {
  const addNum = lastAddItem.value;
  spactionList.value.push({ id: addNum, name: `sp_actions${addNum}` });
  lastAddItem.value += 1;
};

const removeItem = (item, index) => {
  spactionList.value.splice(index, 1);
};

const saveItem = () => {

}

const textArea = { minRows: 3, maxRows: 5 }

</script>

<style lang="less" scoped>
.tdesign-demo-form-status .t-input {
  width: 520px;
}

// 统一增加8px;
.dashboard-detail-card {
  padding: 8px;

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }

  :deep(.t-card__actions) {
    display: flex;
    align-items: center;
  }
}
</style>
