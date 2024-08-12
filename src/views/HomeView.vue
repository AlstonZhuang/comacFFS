
<template>
  <div id="main">
    <div class="head">
      <!-- 顶部标题 -->
      <!-- <div class="dashboard-title">C919型机体损伤可视化态势感知平台</div> -->
      <div class="dashboard-title">设备损伤可视化平台</div>
    </div>

    <div class="title2">
      <div class="centertitle">
        <span class="hour">{{ value }}</span
        >飞行小时损伤机体数字孪生
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="mainbody">
      <div class="leftbody">
        <!-- 扇形图 -->
        <div
          id="piechart"
          ref="piechart1"
          style="width: 338px; height: 238px"
        ></div>

        <!-- 柱状图 -->
        <div id="barchart" ref="barchart" style="width: 328px; height: 208px;paddingtop:10px"></div>

        <!-- 雷达图 -->
        <div
          ref="raderchart"
          id="raderchart"
          style="width: 468px; height: 236px"
        ></div>

        <!-- <div ref="chart1" style="width: 468px; height: 468px"></div> -->
      </div>

      <div class="centerbody">
        <div class="top">
          <div class="airplane">
            <canvas id="canvas"></canvas>
          </div>
          <img
            class="img"
            src="../../public/img/001.jpg"
            alt=""
            width="10px"
            height="60px"
          />
        </div>

        <!-- 折线图 -->
        <div
          class="linechart"
          ref="linechart"
          style="width: 598px; height: 248px"
        ></div>
      </div>

      <div class="rightbody">
        <!-- 选择飞行时长 -->
        <div class="choosetime">
          选择
          <span class="time">
            <el-select
              v-model="value"
              placeholder="3000"
              size="small"
              style="width: 110px"
              :teleported="false"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </span>
          飞行小时
        </div>

        <!-- AI预测告警 -->
        <div class="aibox">
          <div class="title">
          <span>
                <i class="iconfont icon-rengongzhineng"></i>
                </span>
                <div class="name">AI预测告警</div>
          </div>



          <div class="resttime">系统预测剩余寿命（飞行小时）</div>
          <div class="time">
            <div class="time1">
              <div class="word">
                <span>
                <i class="iconfont icon-mseweifuwuyinqing"></i>
                </span>
                <div class="name">发动机</div>
                </div>
              <div class="number number1">3000</div>
            </div>
            <div class="time1">
              <div class="word">
                <span>
                <i class="iconfont icon-dianyuanbaozhang"></i>
                </span>
                <div class="name">APU</div>
                </div>
              <div class="number number1">2000</div>
            </div>
            <div class="time1">
              <div class="word">
                <span>
                <i class="iconfont icon-2kongqilvxin"></i>
                </span>
                <div class="name">气源系统</div>
                </div>
              <div class="number number1">4000</div>
            </div>
          </div>
          <div class="risk">系统预测运行风险</div>
          <div class="time">
            <div class="time1">
              <div class="word">
                <span>
                <i class="iconfont icon-mseweifuwuyinqing"></i>
                </span>
                <div class="name">发动机</div>
                </div>
              <div class="number danger">5.63%</div>
            </div>
            <div class="time1">
              <div class="word">
                <span>
                <i class="iconfont icon-dianyuanbaozhang"></i>
                </span>
                <div class="name">APU</div>
                </div>
              <div class="number number1">3.56%</div>
            </div>
            <div class="time1">
              <div class="word">
                <span>
                <i class="iconfont icon-2kongqilvxin"></i>
                </span>
                <div class="name">气源系统</div>
                </div>
              <div class="number number1">1.64%</div>
            </div>
          </div>
        </div>

        <!-- 仪表盘 -->
        <div
          ref="ratechart"
          id="ratechart"
          style="width: 226px; height: 226px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
// import echarts from "echarts"
import * as echarts from "echarts";

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
export default {
  data() {
    return {
      options: [
        {
          value: "100",
          label: "100",
        },
        {
          value: "200",
          label: "200",
        },
        {
          value: "300",
          label: "300",
        },
        {
          value: "400",
          label: "400",
        },
        {
          value: "500",
          label: "500",
        },
        {
          value: "600",
          label: "600",
        },
        {
          value: "700",
          label: "700",
        },
        {
          value: "800",
          label: "800",
        },
        {
          value: "900",
          label: "900",
        },
        {
          value: "1000",
          label: "1000",
        },
        {
          value: "1100",
          label: "1100",
        },
        {
          value: "1200",
          label: "1200",
        },
        {
          value: "1300",
          label: "1300",
        },
        {
          value: "1400",
          label: "1400",
        },
        {
          value: "1500",
          label: "1500",
        },
      ],
      value: "3000",
      colorList: ["red", "blue"],
    };
  },
  mounted() {
    this.initThreeJS();

    //扇形图
    this.getEchartData2();

    //柱状图
    this.getBarEchartData();

    //雷达图
    this.getRaderChart();

    //折线图
    this.getEchartData1();

    //仪表盘
    this.getRateEchartData();
  },
  methods: {
    initThreeJS() {
      const canvas = document.querySelector("#canvas");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      //调节飞机的背景颜色
      renderer.setClearColor(0x000000, 0);

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
      // camera.position.set(6, 6, 6);
      camera.position.set(4.6, 3.0, 4.7);
      camera.lookAt(0, 0, 0);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      /**
       * Loaders
       */
      const gltfLoader = new GLTFLoader();
      const exrLoader = new EXRLoader();

      const scene = new THREE.Scene();

      /**
       * Models
       */
      gltfLoader.load("/models/aircraft/scene.glb", (gltf) => {
        console.log(gltf.scene);
        scene.add(gltf.scene);
      });

      /**
       * Environment Map
       */
      exrLoader.load(
        "/textures/environmentMaps/nvidiaCanvas-4k.exr",
        (environmentMap) => {
          environmentMap.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = environmentMap;
        }
      );

      function resizeRendererToDisplaySize() {
        const canvas = renderer.domElement;
        const width = (canvas.clientWidth * window.devicePixelRatio) | 0;
        const height = (canvas.clientHeight * window.devicePixelRatio) | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      function render() {
        if (resizeRendererToDisplaySize()) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        controls.update();
        // console.log(123,camera.position)

        requestAnimationFrame(render);
      }

      render();
    },
    //饼图2
    getEchartData2() {
      const piechart1 = this.$refs.piechart1;
      if (piechart1) {
        const myChart = this.$echarts.init(piechart1);
        const option = {
          // backgroundColor: '#013954',
          title: {
            text: "系统损伤程度占比",
            left: "right",
            top: 16,
            right: 10,
            // top: 10,
            textStyle: {
              color: "#85cfe3",
              fontSize: 16,
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "系统损伤程度<br/>{b} : {c} ({d}%)",
          },
          //侧边的矩形提示框
          legend: {
            orient: "vertical",
            left: 10,
            top: 20,
            data: [
              "发动机系统",
              "APU",
              "燃油系统",
              "液压系统",
              "电源系统",
              "导航系统",

              "气源系统",
            ],
            textStyle: {
              color: "#fff",
            },
          },
          series: [
            {
              name: "系统损伤程度",
              type: "pie",
              radius: "75%",
              center: ["50%", "50%"],
              data: [
                {
                  value: 300,
                  name: "发动机系统",
                },
                {
                  value: 335,
                  name: "APU",
                },
                {
                  value: 234,
                  name: "燃油系统",
                },
                {
                  value: 200,
                  name: "液压系统",
                },
                {
                  value: 180,
                  name: "电源系统",
                },
                // {
                //   value: 154,
                //   name: "起落架",
                // },
                {
                  value: 153,
                  name: "导航系统",
                },
                {
                  value: 130,
                  name: "气源系统",
                },
              ],
              roseType: "radius",
              label: {
                color: "#fff",
                show: false,
              },
              labelLine: {
                lineStyle: {
                  color: "#888",
                  normal: {
                    show: false,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = [
                      "#4e46da",
                      "#f845f1",
                      "#ad46f3",
                      "#4777f5",
                      "#44aff0",
                      "#45dbf7",
                      "#f07050",
                      "#f69846",
                      "#f6d54a",
                    ];
                    return colorList[params.dataIndex % colorList.length];
                  },
                },
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    //柱状图
    getBarEchartData() {
      const barchart = this.$refs.barchart;
      if (barchart) {
        const myChart = this.$echarts.init(barchart);

var data = [{
    "name": "发动机",
    "value": 800
}, {
    "name": "APU",
    "value": 878
}, {
    "name": "燃油",
    "value": 710
}, {
    "name": "液压",
    "value": 800
}, {
    "name": "电源",
    "value": 360
}, {
    "name": "导航",
    "value": 800
}
];
var xData = [],
    yData = [];
var min = 50; 
data.map(function(a, b) {
    xData.push(a.name);
    if (a.value === 0) {
        yData.push(a.value + min);
    } else {
        yData.push(a.value);
    }
});
const option = {
          title: {
            text: "系统平均更换使用寿命",
            left: "center",
            top: -5,
            // right: 10,
            // top: 10,
            textStyle: {
              color: "#85cfe3",
              fontSize: 14,
            },
          },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                opacity: 0
            }
        },
        formatter: function(prams) {
            if (prams[0].data === min) {
                return "平均更换使用寿命%"
            } else {
                return "平均更换使用寿命:" + prams[0].data 
            }
        }
    },
    legend: {
        data: ['直接访问', '背景'],
        show: false
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '5%',
        top: '7%',
        height: '85%',
        containLabel: true,
        z: 22
    },
    xAxis: [{
        type: 'category',
        gridIndex: 0,
        data: xData,
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                color: '#0c3b71'
            }
        },
        axisLabel: {
          
            show: true,
             color: '#fff',
             fontSize:13,
            interval: 0 ,

        rotate: 0 , // 文字倾斜角度

        // formatter: function (value) {
        //     return value.split("").join("\n") //垂直显示

        // },
        }
    }],
    yAxis: [{
            type: 'value',
            gridIndex: 0,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            min: min,
            max: 1000,
            axisLine: {
                lineStyle: {
                    color: '#0c3b71'
                }
            },
            axisLabel: {
                color: '#8ed1fd',
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            gridIndex: 0,
            min: min,
            max: 100,
            splitNumber: 12,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                }
            }
        }
    ],
    series: [{
            name: '合格率',
            type: 'bar',
            barWidth: '30%',
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00feff'
                            },
                            {
                                offset: 0.5,
                                color: '#027eff'
                            },
                            {
                                offset: 1,
                                color: '#0286ff'
                            }
                        ]
                    )
                }
            },
            data: yData,
            zlevel: 11

        },
        {
            name: '背景',
            type: 'bar',
            barWidth: '50%',
            xAxisIndex: 0,
            yAxisIndex: 1,
            barGap: '-135%',
            data: [100, 100, 100, 100, 100, 100, 100],
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            zlevel: 9
        },
      
    ]
};



        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }




      
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    //折线图
    getEchartData1() {
      const linechart = this.$refs.linechart;
      if (linechart) {
        const myChart = this.$echarts.init(linechart);
        const option = {
          title: {
            text: "各系统损伤时限趋势",
            left: "center",
            top: 0,
            textStyle: {
              color: "#8ed1fd",
            },
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [
              "发动机系统",
              "APU",
              "燃油系统",
              "液压系统",
              "空调系统",
              "电源系统",
              "导航系统",
              // "起落架",
              // "气源系统",
            ],

            textStyle: {
              color: "#fff",
            },
            show: false,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "300",
              "600",
              "900",
              "1200",
              "1500",
              "1800",
              "2100",
              "2400",
              "2700",
              "3000",
            ],
            axisLabel: {
              color: "#8ed1fd", // 设置横轴标签文字颜色为红色
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              color: "#8ed1fd", // 设置横轴标签文字颜色为红色
            },
          },
          series: [
            {
              name: "发动机系统",
              type: "line",
              stack: "Total",
              data: [
                820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
                1330,
              ],
              lineStyle: {
                color: "#d54eb4",
                type: "solid",
              },
              itemStyle: {
                color: "#d54eb4",
              },
            },
            {
              name: "APU",
              type: "line",
              stack: "Total",
              data: [
                220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330,
              ],
              lineStyle: {
                color: "#8ed1fd",
                type: "solid",
              },
              itemStyle: {
                color: "#8ed1fd",
              },
            },
            {
              name: "燃油系统",
              type: "line",
              stack: "Total",
              data: [
                150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330,
              ],
              lineStyle: {
                color: "#49a4e3",
                type: "solid",
              },
              itemStyle: {
                color: "#49a4e3",
              },
            },
            {
              name: "液压系统",
              type: "line",
              stack: "Total",
              data: [
                320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330,
              ],
              lineStyle: {
                color: "#002FA7",
                type: "solid",
              },
              itemStyle: {
                color: "#002FA7",
              },
            },
            {
              name: "电源系统",
              type: "line",
              stack: "Total",
              data: [
                520, 632, 601, 734, 120, 30, 620, 820, 932, 901, 934, 1290,
                1330,
              ],
              lineStyle: {
                color: "#fead25",
                type: "solid",
              },
              itemStyle: {
                color: "#fead25",
              },
            },
            // {
            //   name: "起落架",
            //   type: "line",
            //   stack: "Total",
            //   data: [
            //     820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
            //     1330,
            //   ],
            //          lineStyle: {
            //     color: '#03fcfd',
            //     type: 'solid'
            //  }

            // },
            {
              name: "导航系统",
              type: "line",
              stack: "Total",
              data: [
                120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230,
              ],
              lineStyle: {
                color: "#a4592b",
                type: "solid",
              },
              itemStyle: {
                color: "#a4592b",
              },
            },
            // {
            //   name: "气源系统",
            //   type: "line",
            //   stack: "Total",
            //   data: [
            //     820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
            //     1330,
            //   ],
            // },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    //饼图
    getEchartData3() {
      const piechart = this.$refs.piechart;
      if (piechart) {
        const myChart = this.$echarts.init(piechart);
        const option = {
          title: {
            text: "各系统损伤程度占比",
          },
          tooltip: {
            trigger: "axis",
          },
          // legend: {
          //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          // },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          // xAxis: {
          //   type: 'category',
          //   boundaryGap: false,
          //   data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
          // },
          // yAxis: {
          //   type: 'value'
          // },
          series: [
            {
              type: "pie",

              //标签
              // itemStyle : {
              //     normal : {
              //         label:{
              //             show : true,
              //             position : 'inner',
              //             formatter: '{d}%',
              //             distance : 0.7, //这项是标识距离中心点的距离
              //             textStyle : {
              //                 align : 'center',
              //                 baseline : 'middle',
              //                 fontFamily : '微软雅黑',
              //                 fontSize : 10,
              //                 fontWeight : 'bolder'
              //              }
              //         },
              //         labelLine:{
              //             show : true
              //         }
              //     }
              // },

              data: [
                {
                  value: 400,
                  name: "发动机系统",
                },
                {
                  value: 335,
                  name: "APU",
                },
                {
                  value: 234,
                  name: "燃油系统",
                },
                {
                  value: 200,
                  name: "液压系统",
                },
                {
                  value: 180,
                  name: "电源系统",
                },
                {
                  value: 153,
                  name: "导航系统",
                },
              ],
              // radius: '50%',
              radius: ["10%", "80%"],
              roseType: "area",
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    //雷达图
    getRaderChart() {
      const raderchart = this.$refs.raderchart;
      if (raderchart) {
        const myChart = this.$echarts.init(raderchart);

        var legendData = ["机体损伤原因", "AI预测机体损伤原因"]; //图例

        var indicator = [
          {
            text: "疲劳损伤",
            max: 30,
          },
          {
            text: "环境因素",
            max: 30,
          },
          {
            text: "机械磨损",
            max: 30,
          },
          {
            text: "过载与冲击",
            max: 30,
            //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
          },
          {
            text: "制造缺陷",
            max: 30,
          },
          {
            text: "外来物损伤",
            max: 30,
          },
        ];
        var dataArr = [
          {
            value: [29, 26, 21, 26, 18, 17],
            name: legendData[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4A99FF",
                  // shadowColor: '#4A99FF',
                  // shadowBlur: 10,
                },
                shadowColor: "#4A99FF",
                shadowBlur: 10,
              },
            },
            areaStyle: {
              normal: {
                // 单项区域填充样式
                color: {
                  type: "linear",
                  x: 0, //右
                  y: 0, //下
                  x2: 1, //左
                  y2: 1, //上
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4A99FF",
                    },
                    {
                      offset: 0.5,
                      color: "rgba(0,0,0,0)",
                    },
                    {
                      offset: 1,
                      color: "#4A99FF",
                    },
                  ],
                  globalCoord: false,
                },
                opacity: 1, // 区域透明度
              },
            },
          },
          {
            value: [19, 21, 14, 29, 26, 21],
            name: legendData[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4BFFFC",
                  // shadowColor: '#4BFFFC',
                  // shadowBlur: 10,
                },
                shadowColor: "#4BFFFC",
                shadowBlur: 10,
              },
            },
            areaStyle: {
              normal: {
                // 单项区域填充样式
                color: {
                  type: "linear",
                  x: 0, //右
                  y: 0, //下
                  x2: 1, //左
                  y2: 1, //上
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4BFFFC",
                    },
                    {
                      offset: 0.5,
                      color: "rgba(0,0,0,0)",
                    },
                    {
                      offset: 1,
                      color: "#4BFFFC",
                    },
                  ],
                  globalCoord: false,
                },
                opacity: 1, // 区域透明度
              },
            },
          },
        ];
        var colorArr = ["#4A99FF", "#4BFFFC"]; //颜色
        const option = {
          // backgroundColor: ,
          title: {
            show: false,
            text: "机体损伤原因分析",
            x: "4%",

            textStyle: {
              color: "#4A99FF",
              fontSize: "22",
            },
            subtextStyle: {
              color: "#90979c",
              fontSize: "16",
            },
          },
          color: colorArr,
          legend: {
            orient: "vertical",
            icon: "circle", //图例形状
            data: legendData,
            bottom: 35,
            right: 0,
            itemWidth: 10, // 图例标记的图形宽度。[ default: 25 ]
            itemHeight: 10, // 图例标记的图形高度。[ default: 14 ]
            itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
            textStyle: {
              fontSize: 16,
              color: "#00E4FF",
            },
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: "#fff",
                fontSize: 14,
              },
            },
            indicator: indicator,
            splitArea: {
              // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              },
            },
            axisLine: {
              //指向外圈文本的分隔线样式
              lineStyle: {
                color: "#153269",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#113865", // 分隔线颜色
                width: 1, // 分隔线线宽
              },
            },
          },
          series: [
            {
              type: "radar",
              symbolSize: 6,
              // symbol: 'angle',
              data: dataArr,
            },
          ],
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
    },

    //仪表盘
    getRateEchartData() {
      const ratechart = this.$refs.ratechart;
      if (ratechart) {
        const myChart = this.$echarts.init(ratechart);
        const dataArr = 86;
        const dataX = 100;
        const height1 = { value: 600 };
        const option = {
          // backgroundColor: '#031f45',
          /** 标题*/
          title: [
            {
              text:
                "{val|" +
                86.37 +
                "}{unit|" +
                "%" +
                "}\n{name|" +
                "整机性能评估" +
                "}",
              bottom: "32%",
              left: "center",
              textStyle: {
                rich: {
                  val: {
                    fontSize: "18",
                    color: "#DCCC5F",
                    padding: [10, 0],
                  },
                  name: {
                    fontSize: "16",
                    color: "#fff",
                  },
                  unit: {
                    fontSize: "18",
                    color: "#DCCC5F",
                  },
                },
              },
              triggerEvent: true,
            },
          ],

          /** 关闭必图例*/
          legend: {
            show: false,
          },
          series: [
            {
              name: "最外部进度条",
              type: "gauge",
              radius: "90%",
              splitNumber: 10,
              axisLine: {
                lineStyle: {
                  color: [
                    [
                      dataArr / dataX,
                      {
                        type: "linear",
                        x: 0,
                        y: 1,
                        x2: 0.5,
                        y2: 0.5,
                        colorStops: [
                          {
                            offset: 0,
                            color: "rgba(0,0,0,0)", // 0% 处的颜色
                          },
                          {
                            offset: 0.8,
                            color: "#583043", // 100% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#C34743", // 100% 处的颜色
                          },
                        ],
                        global: false, // 缺省为 false
                      },
                    ],
                    [1, "#083158"],
                  ],
                  width: 10,
                },
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              itemStyle: {
                show: false,
              },
              detail: {
                show: false,
              },
              title: {
                // 标题
                show: false,
              },
              data: [
                {
                  name: "title",
                  value: dataArr,
                },
              ],
              pointer: {
                show: false,
              },
              animationDuration: 4000,
            },

            {
              name: "刻度尺",
              type: "gauge",
              radius: "81%",
              splitNumber: 10, // 刻度数量
              min: 0, // 最小刻度
              max: dataX, // 最大刻度
              // 仪表盘轴线相关配置
              axisLine: {
                lineStyle: {
                  color: [
                    [
                      1,
                      {
                        type: "radial",
                        x: 0.5,
                        y: 0.6,
                        r: 0.6,
                        colorStops: [
                          {
                            offset: 0.85,
                            color: "#031F46", // 0% 处的颜色
                          },
                          {
                            offset: 0.93,
                            color: "#086989", // 100% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#12D7EF", // 100% 处的颜色
                          },
                        ],
                      },
                    ],
                  ],
                  width: 500,
                },
              },
              /** 分隔线样式*/
              splitLine: {
                show: true,
                length: 14,
                lineStyle: {
                  width: 3,
                  color: "#12E5FE", // 用颜色渐变函数不起作用
                },
              },
              /** 刻度线*/
              axisTick: {
                show: true,
                splitNumber: 20,
                lineStyle: {
                  color: "#12E5FE", // 用颜色渐变函数不起作用
                  width: 1,
                },
                length: 5,
              },
              /** 刻度标签*/
              axisLabel: {
                distance: 2,
                color: "#CEF3FE",
              },
              detail: {
                show: false,
              },
              animationDuration: 4000,
            },
            {
              name: "外部指针",
              type: "gauge",
              radius: "90%",
              axisLine: {
                lineStyle: {
                  color: [
                    [dataArr / dataX - 0.001, "rgba(0,0,0,0)"],
                    [dataArr / dataX + 0.003, "#C34743"],
                    [1, "rgba(0,0,0,0)"],
                  ],
                  width: 33,
                },
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              itemStyle: {
                show: false,
              },
              detail: {
                show: false,
              },
              title: {
                // 标题
                show: false,
              },
              data: [
                {
                  name: "title",
                  value: dataArr,
                },
              ],
              pointer: {
                show: false,
              },
              animationDuration: 4000,
            },
            {
              name: "内层带指针",
              type: "gauge",
              radius: "61%",
              splitNumber: 10, // 刻度数量
              min: 0, // 最小刻度
              max: dataX, // 最大刻度
              // 仪表盘轴线相关配置
              axisLine: {
                lineStyle: {
                  color: [
                    [
                      1,
                      {
                        type: "radial",
                        x: 0.5,
                        y: 0.59,
                        r: 0.6,
                        colorStops: [
                          {
                            offset: 0.72,
                            color: "#032046",
                          },
                          {
                            offset: 0.94,
                            color: "#086989",
                          },
                          {
                            offset: 0.98,
                            color: "#0FAFCB",
                          },
                          {
                            offset: 1,
                            color: "#0EA4C1",
                          },
                        ],
                      },
                    ],
                  ],
                  width: 1000,
                },
              },
              /** 分隔线样式*/
              splitLine: {
                show: false,
              },
              /** 刻度线*/
              axisTick: {
                show: false,
              },
              /** 刻度标签*/
              axisLabel: {
                show: false,
              },
              /** 仪表盘指针*/
              pointer: {
                show: true,
                length: "95%",
                width: 5, // 指针粗细
              },
              /** 仪表盘指针样式*/
              itemStyle: {
                color: "#12E5FF",
              },
              data: [
                {
                  value: dataArr,
                },
              ],
              detail: {
                show: false,
              },
            },
          ],
          graphic: {
            elements: [
              {
                type: "line",
                z: 4,
                style: {
                  fill: "#075173",
                  stroke: "#075173",
                  lineWidth: 2,
                  shadowBlur: 15,
                  shadowOffsetX: 0,
                  shadowOffsetY: -4,
                  shadowColor: "#13E6FF",
                },
                shape: {
                  x1: height1.value * 0.57,
                  y1: 0,
                  x2: 0,
                  y2: 0,
                },
                left: "center",
                bottom: "21%",
                silent: true,
              },
              {
                type: "line",
                z: 4,
                style: {
                  fill: "#075173",
                  stroke: "#075173",
                  lineWidth: 2,
                  shadowBlur: 15,
                  shadowOffsetX: 0,
                  shadowOffsetY: -4,
                  shadowColor: "#13E6FF",
                },
                shape: {
                  x1: height1.value * 0.43,
                  y1: 0,
                  x2: 0,
                  y2: 0,
                },
                left: "center",
                bottom: "28.5%",
                silent: true,
              },
            ],
          },
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }

      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
  },
  watch: {},
  created() {},
};
</script>
<style lang="scss" scoped>
// 整体
#main {
  background-image: url("./assest/bg002.png");
  background-size: 1546px 726px; /* 或者可以使用具体的宽高值，例如100px 150px */
  background-repeat: no-repeat;
  background-position: top;
  height: 716px;

  //标题
  .head {
    width: 100%;
    // background-color: #012da6;
    // background-image: url("./header1.png");
    background-size: 100%;
    display: flex;
    justify-content: center;
    .dashboard-title {
      font-size: 20px;
      color: #8ed1fd;
      font-weight: bold;
      height: 30px;
      transform: translateY(6px);
      // padding-top: 5px;

      // color:blue;
    }
  }

  // 小标题
  .title2 {
    display: flex;
    justify-content: center;
    .centertitle {
      color: #8ed1fd;
      font-size: 14px;
      transform: translateY(25px);
      font-weight: bold;
      .hour {
        font-weight: bold;
        color: red;
      }
    }
  }

  .mainbody {
    display: flex;
    justify-content: space-between;
    height: 676px;

    //左边部分
    .leftbody {
      width: 400px;
      // background-color: paleturquoise;
      //       #canvas {
      // width: 400px;
      // height: 400px;
      //       }
      // 扇形图
      #piechart {
        // background-color: green;
        transform: translate(50px, -10px);

        // background-color: red;
      }

      // 柱状图
      #barchart {
        // background-color: plum;
        transform: translate(60px,-15px);
        // padding-top: 10px;
      }

      //雷达图
      #raderchart {
        // background-color: #fff;
        transform: translate(-76px,-30px);
        padding-left: 30px;
        // margin-top: 5px;
      }
    }

    //中心部分
    .centerbody {
      flex: 1;
      

      //飞机模型与图片
      .top {
        display: flex;
        justify-content: center;
        // background-color: rgb(27, 203, 121);

        #canvas {
          width: 760px;
          height: 560px;
          transform: translate(10px, -70px);
        }

        .img {
          transform: translate(-120px, 350px);
        }
      }

      .linechart {
        // background-color: blue;
        height: 300px;
        transform: translate(30px, -170px);
      }
    }

    //右边部分
    .rightbody {
      width: 400px;
      // background-color: red;

      // 选择时间部分
      .choosetime {
        color: #fff;
        font-weight: bold;
        // background-color: blue;
        height: 105px;
        transform: translate(-70px, 20px);
::v-deep .el-input.el-input--suffix {
  // 修改背景颜色、字体颜色、边框、宽高
  .el-input__inner {
    background: #0a213d !important;
    // border: 1px solid #4c78ff;
    color: #fff;

    font-weight: bold;
    font-size: 16px;
    // height: 30px;
    // width: 140px;
  }
  // 符号的位置会错乱，进行修正（水平）
  .el-input__suffix-inner {
    position: absolute;
    left: -25px;
  }

  // 符号的位置会错乱，进行修正（垂直）
  .el-select__caret.el-input__icon.el-icon-arrow-up {
    line-height: 30px;
  }

  .el-input__inner::placeholder {
    color: #fff;
  }

  .el-icon-arrow-up:before {
    color: #fff;
  }
}

      }

      .aibox {
        //大标题
        .title {
          display: flex;
          // flex: 1;
          justify-content: center;
          font-size: 22px;
          // letter-spacing: 2px;
          color: #8ed1fd;
          // height: 100px;
          font-weight: bold;
          // background-color: red;
          transform: translate(-60px, 10px);
          .iconfont{
                font-size: 30px;
                color: #8ed1fd;
                padding-bottom: 80px;
                padding-right: 6px;
          }
        }

        //剩余寿命的标题
        .resttime {
          font-size: 17px;
          color: #8ed1fd;
          padding-top: 16px;
          // height: 100px;
          font-weight: bold;
          // background-color: red;
          transform: translate(-43px, 10px);
        }

        // 剩余寿命
        .time {
          display: flex;
          flex: 1;
          height: 100px;
          width: 300px;
          // background-color: red;
          transform: translate(-40px, 20px);
          .time1 {
            color: #fff;
            font-size: 16px;
            height: 100px;
            width: 110px;
            .word {
              display: flex;
              flex:1;
              padding-bottom: 15px;
              padding-top: 5px;
        
              .iconfont{
                font-size: 33px;
                color: #8ed1fd;
                padding-bottom: 80px;
          // transform: translateY(90px)/
              
                // color: #4e46da;

                
              }
              .name{
            // background-color: blue;
            padding-top: 10px;
            padding-left: 3px;
            // height: 30px;
                // color:#4e46da ;
          // transform: translate(0px,90px) !important;
              }
              // font
            }
            .number {
              font-size: 19px;
              color: #f2d21f;
              font-weight: bold;
          transform: translate(5px,0px)

            }

            .danger{
              color: #e72923;

            }

            .number1 {
              // color: #f07050;
              font-weight: bold;
            }
          }
        }

        .risk {
          font-size: 17px;
          color: #8ed1fd;
          padding-top: 16px;
          // height: 100px;
          font-weight: bold;
          // background-color: red;
          transform: translate(-63px, 10px);
        }
      }

      // 仪表盘
      #ratechart {
        width: 200px;
        height: 200px;
        // background-color: blue;
        transform: translate(-10px,30px);
      }
    }
  }
}
</style>



