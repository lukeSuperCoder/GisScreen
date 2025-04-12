<template>
    <div class='screen-map' id="olmap">
    </div>
  </template>
  
  <script>
  import { OlMap } from '@/utils/olmap'
  export default {
    components: {},
    data() {
      return {
        mapInstance:null,
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
        let options = {
          targetId: 'olmap',
          baseMapName: 'AMAP_IMG'
        }
        this.mapInstance = new OlMap('olmap',options);
        window.olMap = this.mapInstance;
      },
      addMarkers(){
        let markers = {
          coordinates: [116.397428, 39.90923],
          properties: {
            name: '北京'
          }
        };
        this.mapInstance.markerLayer.addMarker(markers);
        this.mapInstance.mark.startDrawPolygon((data) => {
          console.log(data);
        });
      },
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