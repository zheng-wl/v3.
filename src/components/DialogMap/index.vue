<template>
  <div>
    <el-dialog
      title="地图"
      :visible.sync="isDialogMap"
      width="60%%"
      :before-close="handleSure"
    >
      <!-- map start -->
      <!-- <el-amap vid="amapDemo"   class="amap-demo">
      </el-amap> -->
      <div>
        <el-row style="margin-bottom:10px">
          <el-col :span="8">
            <div
              class="input-card"
              style="position: relative;flex-direction: inherit;align;align-items: center;"
            >
              地址:  <input
                id="tipinput"
                ref="tipinput"
                v-model="address"
                type="text"
                style="width:60%"
                autocomplete="off"
              > &nbsp;  <a
                id="btn-search"
                ref="searchBtn"
                href="javascript:;"
                title="搜索"
                class="btn-search"
              >搜索</a>
            </div>
          </el-col>
          <el-col :span="16">
            经纬度 <input
              id="lnglat"
              v-model="lnglat"
              type="text"
              readonly="true"
              style="width:50%"
            >(左键点击地图，可获取高精度)
          </el-col>
        </el-row>
        <div
          id="container"
          ref="container"
          class="map"
          style="width:100%;height:600px"
        />
      </div>
      <!-- map end -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleSure"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  props: {
    isDialogMap: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      address: '',
      lnglat: []
    }
  },
  mounted() {
    this.getLoaction()

    this.$nextTick(() => {
      const _that = this
      const container = this.$refs.container
      const map = new AMap.Map('container', {
        resizeEnable: true
      })
      //   const tipinput =this.$refs.tipinput
      const tipinput = document.querySelector('#tipinput')
      const auto = new AMap.Autocomplete({
	        input: 'tipinput'
      })
      map.on('click', function(e) {
        // document.getElementById('lnglat').value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        if (e.lnglat.getLng()) {
          _that.lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
        }
      })
      const placeSearch = new AMap.PlaceSearch({
	        map: map
      })
      AMap.event.addListener(auto, 'select', select)
      function select(e) {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name)
        _that.address = e.poi.name
        addMarker(e.poi.location.lng, e.poi.location.lat, e.poi.name)
      }
      function addMarker(lng, lat, name) {
        _that.lnglat = [lng, lat]
        const markerContent = document.createElement('div')
        const markerImg = document.createElement('img')
        markerImg.className = 'markerlnglat'
        markerImg.src = '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
        markerContent.appendChild(markerImg)
        const markerSpan = document.createElement('span')
        markerSpan.className = 'marker'
        markerSpan.innerHTML = name + '！'
        markerContent.appendChild(markerSpan)
	       const marker = new AMap.Marker({
	        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
	        position: [lng, lat],
          content: markerContent,
          zIndex: 1000,
	        offset: new AMap.Pixel(-13, -30)
	        })
        marker.setMap(map)
      }
      this.$refs.searchBtn.onclick = function() {
        placeSearch.search(_that.address, function(e, data) {
          _that.getLoaction(_that.addressa)
        })
      }
    })
  },
  methods: {
    handleSure() {
      console.log(null)
    },
    getLoaction(val) {
      const _that = this
      const ajaxs = new XMLHttpRequest()
      ajaxs.open('get', 'http://restapi.amap.com/v3/geocode/geo?key=389880a06e3f893ea46036f030c94700&s=rsv3&city=35&address=' + val, true)
      ajaxs.send()
      ajaxs.onreadystatechange = function() {
        if (ajaxs.readyState === 4 && ajaxs.status === 200) {
          const data = JSON.parse(ajaxs.responseText)
          _that.lnglat = data.geocodes[0].location.split(',')
        }
      }
    }
    // handleClickMap(e){
    //     console.log(e.lnglat.getLng())
    //     console.log(e.lnglat.getLat())
    //     console.log(e)
    // }
  }
}
</script>
<style lang='scss'>
 .amap-icon img,
        .amap-marker-content img{
            width: 25px;
            height: 34px;
        }

        .marker {
            position: absolute;
            top: -20px;
            right: -80px;
            color: #fff;
            padding: 4px 10px;
            box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
            white-space: nowrap;
            font-size: 12px;
            font-family: "";
            background-color: #f34234;
            border-radius: 3px;
        }

        .input-card{
            width: 18rem;
            z-index: 3001;
        }

        .input-card .btn{
            margin-right: .8rem;
        }

        .input-card .btn:last-child{
            margin-right: 0;
        }
        .amap-sug-result{
          z-index: 3000 !important;
        }
</style>
