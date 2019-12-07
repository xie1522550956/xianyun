<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
    <div class="flights-content">
      <FlightsFilters :flightsData="flights" @setFlightsData="setFlightsData"></FlightsFilters>
    <flightsListHead></flightsListHead>
    <flightsItem
      v-for="(value,index) in flightsitem"
      :key="index"
      :index="index"
      :setindex='setindex'
      @itemindex="setshowitem"
      :flight="flightsitem[index]"
    ></flightsItem>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    
    </div>
     <!-- 航班信息 -->
    <div class="aside">
      <FlightsAside></FlightsAside>
    </div>
  
  </el-row>
  </section>
</template>

<script>
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      flights: {
        flights: []
      },
      total: 0,
      currentPage4: 1,
      pageindex: 0,
      pagesize: 2,
      flightsitem: [],
      setindex: -1
    };
  },
  async mounted() {
    console.log(this.$route.query);
    let res = await this.$axios({
      url: "/airs",
      params: this.$route.query
    });
    console.log(res);
    this.flights = res.data;
    this.total = this.flights.flights.length;
    this.flightsitem = [...this.flights.flights].splice(
      this.pageindex * this.pagesize,
      this.pagesize
    );
    console.log(this.flights.flights);
  },
  components: {
    flightsListHead,
    flightsItem,
    FlightsFilters,
    FlightsAside
  },
  methods: {
    setshowitem(index) {
      this.setindex = index
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.flightsitem = [...this.flights.flights].splice(
        (this.pageindex - 1) * this.pagesize,
        this.pagesize
      );
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.flightsitem = [...this.flights.flights].splice(
        (this.pageindex - 1) * this.pagesize,
        this.pagesize
      );
      console.log(`当前页: ${val}`);
    },
    setFlightsData(lisdata) {
      this.total = lisdata.length;
      this.flightsitem = [...lisdata].splice(
        (this.pageindex - 1) * this.pagesize,
        this.pagesize
      );
    }
  }
};
</script>

<style>
</style>