<template>
  <div class="flights">
      <flightsListHead ></flightsListHead>
      <flightsItem v-for="(value,index) in flights" :key='index' :flight='flights[index]'></flightsItem>
  </div>
</template>

<script>
import flightsListHead from '@/components/air/flightsListHead'
import flightsItem from '@/components/air/flightsItem'
export default {
    data () {
        return {
            flights: []
        }
    },
    async mounted () {
        
        console.log(this.$route.query)
        let res = await this.$axios({
            url:'/airs',
            params: this.$route.query
        }) 
        console.log(res)
        this.flights = res.data.flights.splice(0,10)
    },
    components: {
        flightsListHead,flightsItem
    }
}
</script>

<style>

</style>