<template>
  <div class="dashboard">
    <img
      src="../../../src/assets/images/topbg2.gif"
      alt="topimg"
      style="width: 100%;height: auto;"
    />
    <div class="total-title">水产智慧养殖可视化大屏</div>
    <div class="content">
      <div class="map_container">
        <dv-border-box-1 class="box-left-top">
          <div class="header-first">鱼塘概况</div>
          <div class="box-left-top-container">
            <div class="header-second">智慧养殖渔场</div>
            <ul class="flex-container">
              <li class="flex-item">
                <div class="title">鱼塘数(个)</div>
                <div class="number">{{ fishpondStatus.number }}</div>
              </li>
              <li class="flex-item">
                <div class="title">鱼塘总面积(亩)</div>
                <div class="number">{{ fishpondStatus.area }}</div>
              </li>
              <li class="flex-item">
                <div class="title">鱼苗总数(万尾)</div>
                <div class="number">{{ fishpondStatus.fishNum }}</div>
              </li>
              <li class="flex-item">
                <div class="title">养殖品种(种)</div>
                <div class="number">{{ fishpondStatus.type }}</div>
              </li>
              <li class="flex-item">
                <div class="title">员工人数(个)</div>
                <div class="number">{{ fishpondStatus.staffNum }}</div>
              </li>
              <li class="flex-item flex-item-last">
                <div class="title">预计产值(万元)</div>
                <div class="number">{{ fishpondStatus.earn }}</div>
              </li>
            </ul>
          </div>
        </dv-border-box-1>
        <div ref="container" class="container border">
          <div class="box-container-title">全方位鱼塘3D模型</div>
          <div class="box-container-right">
            <dv-decoration-5 style="width:68px;height:30px;" />
            <div class="box-container-right-title">鱼塘尺寸</div>
            <ul class="box-container-right-ul">
              <li>鱼塘号：{{ nowFishNumber }}</li>
              <li>鱼塘长：{{ nowFishLength }}m</li>
              <li>鱼塘宽：{{ nowFishWidth }}m</li>
              <li>鱼塘深：{{ nowFishDepth }}m</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fish-main">
        <div class="fish-list border">
          <div class="header">渔场列表</div>
          <ul>
            <li
              v-for="(fish, index) in fishes"
              :key="index"
              @click="selectFish(index)"
            >
              <template v-if="selectedFish === index">
                <dv-border-box-8>
                  <div class="list-top">
                    <div class="list-title">{{ fish.title }}</div>
                    <div
                      class="fish-att"
                      :style="{
                        'background-color':
                          fish.att === '正常' ? '#a2e9b6' : '#e46f64',
                      }"
                    >
                      {{ fish.att }}
                    </div>
                  </div>
                  <div class="list-bottom">
                    <div class="fish-breed">养殖品种</div>
                    <div class="fish-name">{{ fish.name }}</div>
                  </div>
                </dv-border-box-8>
              </template>
              <template v-else>
                <div class="list-top">
                  <div class="list-title">{{ fish.title }}</div>
                  <div
                    class="fish-att"
                    :style="{
                      'background-color':
                        fish.att === '正常' ? '#a2e9b6' : '#e46f64',
                    }"
                  >
                    {{ fish.att }}
                  </div>
                </div>
                <div class="list-bottom">
                  <div class="fish-breed">养殖品种</div>
                  <div class="fish-name">{{ fish.name }}</div>
                </div>
              </template>
            </li>
          </ul>
        </div>
        <div class="video">
          <Video1 :cVideoId="'K33949606'" :width="100" :height="80"></Video1>
        </div>
      </div>
      <FishDetail :fishTitle="fishes[selectedFish].title" />
    </div>
  </div>
</template>

<script>
import { markRaw } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Video1 from "../../components/large-cpns/Video1.vue";
import FishDetail from "../../components/large-cpns/FishDetail.vue";
import { borderBox8, borderBox1, decoration5 } from "@/compat/data-view";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import safePng from "../../assets/images/safe.png";
import unsafePng from "../../assets/images/unsafe.png";
import waterNormalsJpg from "../../assets/images/waternormals.jpg";
export default {
  data() {
    return {
      selectedFish: 0,
      fishes: [
        { title: "鱼塘-01", att: "正常", name: "草鱼" },
        { title: "鱼塘-02", att: "正常", name: "鲤鱼" },
      ],
      fishDataName: {
        pm25: "PM2.5",
        pm10: "PM10",
        noise: "噪音",
        // luminous: "光照强度",
        temperature: "温度",
        // airTemperature: "空气温度",
        airHumidity: "空气湿度",
        // sunRadiation: "太阳辐射",
        // rain: "降雨量",
        // oxygenDissolve: "溶解氧",
        windDirection: "风向",
        windSpeed: "风速",
        airPressure: "气压",
      },
      fishDataUnit: {
        // ph: "mol/L",
        // conductance: "μS/cm",
        // carbonDioxide: "g/100ml",
        pm25: "μg/m3",
        pm10: "μg/m3",
        noise: "dB",
        // luminous: "lux",
        temperature: "℃",
        // airTemperature: "℃",
        airHumidity: "g/m3",
        // sunRadiation: "w/m2",
        // rain: "mm",
        // oxygenDissolve: "mg/L",
        windDirection: "°(度)",
        windSpeed: "m/s",
        airPressure: "KPa",
      },
      fishData: {
        // ph: 3,
        // conductance: 0.055,
        // carbonDioxide: 0.145,
        pm25: 1.95,
        pm10: 2,
        noise: 1,
        // luminous: 20,
        temperature: 3,
        // airTemperature: 12,
        airHumidity: 1,
        // sunRadiation: 200,
        // rain: 80,
        // oxygenDissolve: 1.95,

        windDirection: 160,
        windSpeed: 100,
        airPressure: 120,
      },
      fishpondStatus: {
        number: 2, // 鱼塘数量
        area: 6.8, // 总面积
        fishNum: 6.9, // 鱼苗总数
        type: 4, // 鱼苗品种
        staffNum: 16, // 员工人数
        earn: 62.65, // 预计产值
      },
      nowFishNumber: 1,
      nowFishLength: 50,
      nowFishWidth: 50,
      nowFishDepth: 0.9,
      fishNumber: [0, 1, 2, 3, 4, 5, 6, 7],
    };
  },
  computed() {},
  mounted() {
    // 创建场景
    this.scene = markRaw(new THREE.Scene());

    // 创建相机
    this.camera = markRaw(new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ));
    this.camera.position.set(0, -0.45, 1); // 设置相机初始位置

    // 创建渲染器
    this.renderer = markRaw(new THREE.WebGLRenderer({ alpha: true }));
    // 获取容器的宽度
    const containerWidth = this.$refs.container.offsetWidth;
    // 获取容器的高度
    const containerHeight = this.$refs.container.offsetHeight;

    this.renderer.setSize(containerWidth, containerHeight);
    this.$refs.container.appendChild(this.renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // 加载图标纹理
    const textureLoader = new THREE.TextureLoader();
    const iconTexture1 = textureLoader.load(
      safePng
    );
    const iconTexture2 = textureLoader.load(
      unsafePng
    );
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    //
    let sun = new THREE.Vector3();

    // 添加水平面
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        waterNormalsJpg,
        function(texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    this.scene.add(water);

    // 天空
    const sky = new Sky();
    sky.scale.setScalar(10000);
    this.scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    const parameters = {
      elevation: 2,
      azimuth: 180,
    };

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const sceneEnv = new THREE.Scene();
    let sceneTem = this.scene;
    let rendererTem = this.renderer;
    let cameraTem = this.camera;

    let renderTarget;

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();

      sceneEnv.add(sky);
      renderTarget = pmremGenerator.fromScene(sceneEnv);
      sceneTem.add(sky);

      sceneTem.environment = renderTarget.texture;
    }

    updateSun();

    function render() {
      const time = performance.now() * 0.001;

      water.material.uniforms["time"].value += 1.0 / 200.0;

      rendererTem.render(sceneTem, cameraTem);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }
    animate();


    // 创建立方体
    const geometries = [
      new THREE.BoxGeometry(
        containerWidth * 0.0018,
        containerHeight * 0.001,
        0.09
      ), // 立方体1的尺寸
      new THREE.BoxGeometry(
        containerWidth * 0.0018,
        containerHeight * 0.001,
        0.05
      ), // 立方体2的尺寸
    ];

    this.cubes = markRaw([]);
    // 创建不同尺寸的立方体，并添加到场景中
    for (let i = 0; i < geometries.length; i++) {
      let material = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
      const cube = new THREE.Mesh(geometries[i], material);
      cube.position.set(
        -0.7 + i * 1.5, // 调整立方体的水平位置
        0,
        0
      );
      cube.scale.set(1, 1, 1); // 设置初始缩放比例为1
      cube.rotation.x = -Math.PI / 2;
      this.scene.add(cube);
      this.cubes.push(cube);

      // 在立方体的正上方创建图标平面
      // const iconGeometry = new THREE.PlaneGeometry(0.25, 0.25);
      // let iconMaterial;
      // if (i == 5 || i == 4) {
      //   iconMaterial = new THREE.MeshBasicMaterial({
      //     map: iconTexture2,
      //     transparent: true,
      //     side: THREE.DoubleSide,
      //   });
      // } else {
      //   iconMaterial = new THREE.MeshBasicMaterial({
      //     map: iconTexture1,
      //     transparent: true,
      //     side: THREE.DoubleSide,
      //   });
      // }
      // const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
      // const iconClone = iconMesh.clone();
      // iconClone.rotation.x = Math.PI / 2;
      // iconClone.position.copy(cube.position);
      // iconClone.position.z += cube.geometry.parameters.depth / 2 + 0.2;
      // this.scene.add(iconClone);

      // 在立方体上创建序号文本
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 64; // 适当调整画布宽度
      canvas.height = 32; // 适当调整画布高度
      context.font = "18px Arial"; // 适当调整字体样式和大小
      context.fillStyle = "#ffffff"; // 适当调整字体颜色
      context.fillText((i + 1).toString() + "号", 10, 24); // 绘制序号文本，根据需要调整位置
      const texture = new THREE.CanvasTexture(canvas);
      const numberMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        alphaTest: 0.5,
      });
      const numberGeometry = new THREE.PlaneGeometry(0.25, 0.25); // 适当调整序号平面的大小
      const numberMesh = new THREE.Mesh(numberGeometry, numberMaterial);
      numberMesh.position.copy(cube.position);
      numberMesh.position.y += cube.geometry.parameters.height / 2; // 调整序号平面的垂直位置
      numberMesh.position.z += 0.15;
      numberMesh.rotation.x = Math.PI / 2;
      this.scene.add(numberMesh);
    }

    // 创建OrbitControls控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // 启用阻尼效果，平滑动画
    this.raycaster = new THREE.Raycaster();
    this.renderer.domElement.addEventListener("mousemove", this.onMouseMove);
    // 添加鼠标滚轮事件监听器
    this.renderer.domElement.addEventListener("wheel", this.onMouseWheel);
    this.renderer.domElement.addEventListener(
      "mouseenter",
      this.onCubeMouseEnter
    );
    this.renderer.domElement.addEventListener(
      "mouseleave",
      this.onCubeMouseLeave
    );
    this.rotationSpeed = 0.005; // 旋转速度
    // 渲染循环
    this.animate();
  },
  methods: {
    // datastatu(index, value) {
    //   switch (index) {
    //     case 0:
    //       if (value > 6 && value < 8) {
    //         return "background-color: #a2e9b6;";
    //       } else if ((value >= 5 && value <= 6) || (value >= 8 && value <= 9)) {
    //         return "background-color: #f7b883;";
    //       } else {
    //         return "background-color: #e46f64;";
    //       }
    //     case 1:
    //       return "background-color: #a2e9b6;";

    //     case 2:
    //       return "background-color: #a2e9b6;";

    //     case 3:
    //       return "background-color: #a2e9b6;";

    //     case 4:
    //       return "background-color: #a2e9b6;";

    //     case 5:
    //       if (value > 7 && value < 30) {
    //         return "background-color: #a2e9b6;";
    //       } else if (4 <= value <= 7 || 35 >= value >= 30) {
    //         return "background-color: #f7b883;";
    //       } else {
    //         return "background-color: #e46f64;";
    //       }
    //     case 6:
    //       return "background-color: #a2e9b6;";

    //     case 7:
    //       return "background-color: #a2e9b6;";

    //     case 8:
    //       return "background-color: #a2e9b6;";

    //     case 9:
    //       if (value <= 50) {
    //         return "background-color: #a2e9b6;";
    //       } else if (value <= 100) {
    //         return "background-color: #f7b883;";
    //       } else {
    //         return "background-color: #e46f64;";
    //       }
    //     case 10:
    //       if (value > 5) {
    //         return "background-color: #a2e9b6;";
    //       } else if (value < 2) {
    //         return "background-color: #e46f64;";
    //       } else {
    //         return "background-color: #f7b883;";
    //       }
    //     case 11:
    //       return "background-color: #a2e9b6;";

    //     default:
    //       break;
    //   }
    // },
    selectFish(index) {
      console.log(index);
      this.selectedFish = index;
      const cubeSize = this.cubes[index].geometry.parameters;
      this.nowFishNumber = index + 1;
      this.nowFishLength = cubeSize.width * 100;
      this.nowFishWidth = cubeSize.height * 100;
      this.nowFishDepth = Math.round(cubeSize.depth * 100) / 10;
    },
    onCubeMouseEnter(event) {
      this.rotationSpeed = 0; // 将旋转速度设置为0，暂停旋转
    },
    onCubeMouseLeave(event) {
      this.rotationSpeed = 0.005; // 恢复旋转速度
    },
    animate() {
      requestAnimationFrame(this.animate);
      // 更新控制器
      this.controls.update();
      // 自动旋转整个场景
      // this.scene.rotation.z += this.rotationSpeed;
      this.renderer.render(this.scene, this.camera);
    },
    onMouseMove(event) {
      // 计算鼠标位置的归一化设备坐标
      const mouse = new THREE.Vector2();
      mouse.x = (event.offsetX / 400) * 2 - 1;
      mouse.y = -(event.offsetY / 400) * 2 + 1;
      // 更新射线的起点和方向
      this.raycaster.setFromCamera(mouse, this.camera);
      // 检测射线与立方体的相交情况
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      // 如果有相交的立方体
      for (let i = 0; i < 15; i++) {
        this.cubes[i].material.color.set(0x87ceeb);
      }
      // 如果有相交的立方体
      if (intersects.length != 0) {
        for (let i = 0; i < intersects.length; i++) {
          let idx = this.cubes.indexOf(intersects[i].object);
          if (idx >= 0) {
            const selectedCube = intersects[0].object;
            const selectedCubeIndex = this.cubes.indexOf(selectedCube);
            // 创建或更新显示框元素
            let infoBox = document.getElementById("info-box");
            if (!infoBox) {
              infoBox = document.createElement("div");
              infoBox.id = "info-box";
              infoBox.style.position = "absolute";
              infoBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
              infoBox.style.color = "#fff";
              infoBox.style.padding = "10px";
              document.body.appendChild(infoBox);
            }

            // 设置显示框内容为立方体的长宽高信息
            const cubeSize = this.cubes[selectedCubeIndex].geometry.parameters;
            console.log(idx, "idx");
            this.nowFishNumber = idx + 1;
            this.nowFishLength = cubeSize.width * 100;
            this.nowFishWidth = cubeSize.height * 100;
            console.log(cubeSize.width, cubeSize.height);
            this.nowFishDepth = Math.round(cubeSize.depth * 100) / 10;
            infoBox.textContent = `${this.nowFishNumber}号鱼塘长度: ${this.nowFishLength}m, 宽度: ${this.nowFishWidth}m, 深度: ${this.nowFishDepth}m`;
            // 调整显示框的位置
            infoBox.style.top = `${event.clientY + 10}px`;
            infoBox.style.left = `${event.clientX + 10}px`;
            console.log("当前鼠标选中元素:", idx);
            this.cubes[idx].material.color.set(0xff0000);
            break;
          }
        }
      } else {
        // 如果没有相交的立方体，则删除显示框元素
        const infoBox = document.getElementById("info-box");
        if (infoBox) {
          infoBox.parentNode.removeChild(infoBox);
        }
      }
    },
  },
  beforedestroy() {
    // 清除OrbitControls实例
    this.controls.dispose();
    this.scene.dispose();
    this.renderer.dispose();
  },
  components: {
    FishDetail,
    Video1,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  color: white;
}
/* 设置滚动条样式 设置滚动条样式 设置滚动条样式 设置滚动条样式 */
/*滚动条的宽度*/
::-webkit-scrollbar {
  width: 6px;
}

/*滚动条里面小方块*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(32, 217, 217, 1);
}

/*滚动条里面轨道*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(40, 73, 81, 1);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.dashboard {
  width: 100%;
  height: 100vh;
}
.total-title {
  font-size: 25px;
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content {
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
.map_container {
  left: 0;
  width: 30%;
  height: 100vh;
}
.box-left-top {
  height: 150px;
}
.box-left-top-container {
  width: 100%;
  height: 90%;
}
.header-first {
  padding-top: 1%;
  font-size: 1rem;
  text-align: center;
}
.header-second {
  margin-left: 7%;
  font-size: 0.7rem;
}
.flex-container {
  width: 90%;
  height: 100%;
  margin: 2% auto;
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
}
.flex-item {
  height: 50px;
  flex: 1 1 20px;
  padding: 3px 1px;
  margin-right: 10px;
  background-color: rgba(38, 43, 50, 0.8);
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, skyblue, rgba(32, 217, 217, 1)) 1;
  position: relative;
  /* 样式 */
}
.flex-item-last {
  margin-right: 0;
}
.number {
  color: skyblue;
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.container {
  margin-top: 5px;
  width: 100%;
  height: 70%;
  position: relative;
}
.box-container-title {
  padding-top: 1%;
  text-align: center;
}
.box-container-right {
  width: 68px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}
.box-container-right-ul {
  margin: 1px;
  list-style-type: none;
}
.box-container-right-ul li {
  padding: 1px;
  font-size: 1rem;
  margin-top: 15%;
  background-color: rgba(22, 27, 33, 0.8);
}
.box-container-right-title {
  font-size: 12px;
  text-align: center;
}
/* 渔场列表 渔场列表 渔场列表 渔场列表 渔场列表 渔场列表 渔场列表 渔场列表 */
.fish-list {
  width: 100%;
  margin: 0 1%;
  height: calc(42vh - 20px);
}

.fish-list ul {
  width: 100%;
  height: 94%;
  overflow-y: scroll;
}

.fish-list ul li {
  list-style: none;
  width: calc(100% - 20px);
  height: 50px;
  margin: 10px;
  background-color: rgba(22, 27, 33, 1);
}
.selected {
  border: 2px solid #a0d9b8;
  border-image: linear-gradient(to right, #a0d9b8, #90cfae);
  border-image-slice: 1;
}
.list-top {
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-title {
  font-size: 14px;
  margin: 0px 10px;
}

.fish-att {
  width: 40px;
  height: 17px;
  font-size: 12px;
  text-align: center;
  line-height: 17px;
  border-radius: 10px;
  margin: 0px 10px;
}

.list-bottom {
  height: 40%;
  width: 100%;
  display: flex;
  align-items: center;
}

.fish-breed {
  margin: 0px 10px;
  font-size: 10px;
  color: gray;
}

.fish-name {
  color: white;
  font-size: 10px;
  margin: 0 5px;
}
/* 鱼塘监控 鱼塘监控 鱼塘监控 鱼塘监控 鱼塘监控 鱼塘监控 鱼塘监控 */
.main {
  width: 43%;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 98px);
}

.header {
  color: white;
  padding: 5px 0px 5px 10px;
  font-size: 0.5rem;
}

.monitor {
  width: 100%;
  height: 6vh;
  min-height: 40px;
}

.progress {
  width: 98%;
  height: 6vh;
  min-height: 40px;
  margin: 5px 1%;
  border: 2px solid rgba(0, 88, 124, 0.5);
}

.bottom {
  width: 100%;
  height: calc(100% - 26px - 12vh);
  display: flex;
}

.data {
  flex: 1;
  width: 50%;
  height: 98%;
}

.chart {
  flex: 1;
  width: 50%;
  height: 100%;
}

.alldata {
  height: 100%;
}

.alldata ul {
  width: 98%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
}

.alldata ul li {
  list-style: none;
  height: 100%;
  width: 90px;
  background-color: rgba(22, 27, 33, 0.8);
}

.title {
  width: 90%;
  margin: 0.5vh 5% 0 5%;
  font-size: 0.5rem;
  text-align: center;
}

.number1 {
  font-weight: 800;
  text-align: center;
}

.line {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.pro-line {
  position: relative;
  width: 96%;
  height: 6px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: #26484f;
}

.now-pro {
  position: absolute;
  top: 0;
  left: 0;
  width: 66%;
  height: 100%;
  background: -webkit-linear-gradient(left, #1b8eee, #22f7d1);
  border-radius: 3px;
}

.period {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
}

.period li {
  list-style: none;
  text-align: left;
  height: 100%;
  font-size: 0.6rem;
  font-weight: 600;
  color: white;
  padding: 0px 5px 0px 5px;
}

.data-box {
  margin: 0 auto;
  width: 96%;
  height: 100%;
  border: 2px solid rgba(0, 88, 124, 0.5);
}

.data-header {
  width: 100%;
  padding: 1vh 0px 1vh 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.header-left {
  margin: 0px 0px 0px 10px;
}

.header-right ul {
  display: flex;
}

.header-right ul li {
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0px 5px;
}

.color {
  width: 10px;
  height: 10px;
  margin: 0px 5px;
}

.color1 {
  background-color: #a2e9b6;
}

.color2 {
  background-color: #f7b883;
}

.color3 {
  background-color: #e46f64;
}

.data-content {
  width: 100%;
  height: 100%;
}

.data-content ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.data-content ul li {
  list-style: none;
  width: 46%;
  height: 14%;
  margin: 1% 2%;
}

.name {
  font-size: 0.5rem;
  margin: 0.5vh 0;
  text-align: center;
}

.now-data {
  display: flex;
  justify-content: center;
}

.number2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.unit {
  display: flex;
  align-items: end;
}

.fish-main {
  display: flex;
  flex-direction: column;
  width: 26%;
}
.video {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 10% 0;
}
</style>
