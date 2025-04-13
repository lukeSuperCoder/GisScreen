<template>
    <div class='screen-map' id="olmap">
    </div>
  </template>
  
  <script>
  import { OlMap } from '@/utils/olmap'
  import { currentGET,currentGETById } from 'api/modules'

  export default {
    components: {},
    data() {
      return {
        mapInstance:null,
        popupHtml:'<div class="popup-content"></div>'
      };
    },
    props:{
      data:{
        type:Array,
        default:()=>[]
      }
    },
    computed: {},
    methods: {
      initMap(){
        let that = this;
        let options = {
          targetId: 'olmap',
          baseMapName: 'AMAP_IMG'
        }
        this.mapInstance = new OlMap('olmap',options);
        window.olMap = this.mapInstance;

        // 聚类点击事件
        this.mapInstance.clusterMakerLayer.setOnClick((featureData, event) => {
          if(featureData.length > 0){
            if(featureData[0].type === 'cluster'){
              this.mapInstance.view.setCenter(featureData[0].geometry);
              this.mapInstance.view.zoomIn();
            }
          }
        });
        // 点标记点击事件
        this.mapInstance.markerLayer.setOnClick(async (featureData, event) => {
          if(featureData.type === 'marker' && featureData.properties.id){
            const data = await this.getListById(featureData.properties.id);
            if(data){
              that.$store.commit('setting/updateId',data.id);
              that.mapInstance.geomLayer.clearGeoms();
              that.mapInstance.geomLayer.drawPolygon(data.geometry.coordinates[0]);
            }
          }
        });
      },
      addMarkers(){
        currentGET('mapList').then((res)=> {
          if(res.code===200) {
            console.log(res.data);
            const markers = res.data.items.map(item => {
              return {
                coordinates: [item.lng, item.lat],
                properties: {
                  id: item.id
                }
              }
            })
            this.mapInstance.clusterMakerLayer.addMarkers(markers);
            this.mapInstance.clusterMakerLayer.setMinZoom(1);
            this.mapInstance.clusterMakerLayer.setMaxZoom(8);
            this.mapInstance.markerLayer.addMarkers(markers);
            this.mapInstance.markerLayer.setMinZoom(8);
            this.mapInstance.markerLayer.setMaxZoom(18);
          }
        })
        
      },
      async getListById(id){
        const res = await currentGETById('getListById',id);
        if(res.code===200 && res.data){
          return res.data
        }else{
          return null
        }
      }
    },
    created() {
    
    },
    mounted() {
      this.initMap();
      this.addMarkers();
    },
    beforeDestroy() { 
    },
  }
  </script>
  
  <style lang='scss' scoped>
  .screen-map{
      width: 100%;
      height: 100%;
  }
  </style>