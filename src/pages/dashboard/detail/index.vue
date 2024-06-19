<template>
  <t-card class="dashboard-detail-card" shadow bordered>
    <header>ssd</header>
  </t-card>
</template>

<script lang="ts">
export default {
  name: 'DashboardDetail',
};
</script>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch, computed, onDeactivated } from 'vue';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import { getFolderLineDataSet, getScatterDataSet } from './index';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, ScatterChart, CanvasRenderer]);

const store = useSettingStore();
const chartColors = computed(() => store.chartColors);

// lineChart logic
let lineContainer: HTMLElement;
let lineChart: echarts.ECharts;
const renderLineChart = () => {
  lineContainer = document.getElementById('lineContainer');
  lineChart = echarts.init(lineContainer);
  lineChart.setOption(getFolderLineDataSet({ ...chartColors.value }));
};

// scatterChart logic
let scatterContainer: HTMLElement;
let scatterChart: echarts.ECharts;
const renderScatterChart = () => {
  scatterContainer = document.getElementById('scatterContainer');
  scatterChart = echarts.init(scatterContainer);
  scatterChart.setOption(getScatterDataSet({ ...chartColors.value }));
};

// chartSize update
const updateContainer = () => {
  lineChart?.resize({
    width: lineContainer.clientWidth,
    height: lineContainer.clientHeight,
  });
  scatterChart?.resize({
    width: scatterContainer.clientWidth,
    height: scatterContainer.clientHeight,
  });
};

const renderCharts = () => {
  renderScatterChart();
  renderLineChart();
};

onMounted(() => {
  renderCharts();
  window.addEventListener('resize', updateContainer, false);
  nextTick(() => {
    updateContainer();
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);
});

onDeactivated(() => {
  storeModeWatch();
  storeBrandThemeWatch();
});

const storeModeWatch = watch(
  () => store.mode,
  () => {
    renderCharts();
  },
);

const storeBrandThemeWatch = watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([lineChart, scatterChart]);
  },
);
</script>

<style lang="less" scoped>
.row-margin {
  margin-top: 16px;
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

.dashboard-list-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 170px;
  padding: 8px;

  :deep(.t-card__header) {
    padding-bottom: 8px;
  }

  :deep(.t-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0;
  }

  &.dark {
    &:hover {
      background: var(--td-gray-color-14);
      cursor: pointer;
    }
  }

  &.light {
    &:hover {
      background: var(--td-gray-color-14);
      cursor: pointer;
    }
  }

  &__number {
    font-size: 36px;
    line-height: 44px;
    color: var(--td-text-color-primary);
  }

  &__text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: var(--td-text-color-placeholder);
    text-align: left;
    line-height: 18px;

    &-left {
      display: flex;

      .icon {
        margin: 0 8px;
      }
    }
  }
}
</style>
