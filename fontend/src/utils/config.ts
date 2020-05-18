export const echartOptions = {
  title: {
    isShow: true,
    text: '课程学习人数走势'
  },
  tooltip: {
    trigger: 'axis'
    // axisPointer: {
    //   type: 'cross'
    // }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
      // dataZoom: {
      //   yAxisIndex: 'none'
      // }
    }
  },
  legend: {
    data: [
      'Vue2.5开发去哪儿网App',
      'React 16.4 开发简书项目',
      'Vue2.5从零基础入门到实战项目',
      '手把手带你掌握新版Webpack4.0',
      'Dell Lee 的微课堂，职业规划答疑解惑'
    ]
  },
  dataZoom: [
    {
      type: 'inside',
      throttle: 50
    }
  ],
  xAxis: {
    name: '时间',
    type: 'category',
    data: [] /*(() => this.date)()*/,
    nameTextStyle: {
      color: '#a0a0a0',
      fontWeight: 600,
      opacity: 0.8
    },
    axisPointer: {
      snap: true,
      lineStyle: {
        color: '#014D67',
        opacity: 0.5,
        width: 2
      },
      label: {
        show: true,
        formatter: function(params: any) {
          return params.value
        },
        backgroundColor: '#014D67'
      }
      // handle: {
      //   show: true,
      //   color: '#014D67'
      // }
    }
  },
  yAxis: {
    name: '在线学习人数',
    type: 'value',
    min: 20,
    max: 110,
    nameTextStyle: {
      color: '#a0a0a0',
      fontWeight: 600,
      opacity: 0.8
    }
  },
  series: [] /*this.series*/,
  grid: {
    left: 40,
    right: 40
  }
}
