<template>
  <div>
    <h1>Bitcoin Price Tracker</h1>
    <select v-model="selectedPeriod">
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
      <option value="custom">Custom</option>
    </select>

    <div v-if="selectedPeriod === 'custom'">
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
    </div>

    <button @click="fetchData">Fetch Data</button>

    <div v-if="bitcoinData">
      <!-- display price chart here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPeriod: 'day',
      startDate: null,
      endDate: null,
      bitcoinData: null
    };
  },
  methods: {
  async fetchData() {
    try {
      if (this.selectedPeriod === 'custom' && (!this.startDate || !this.endDate)) {
        return;
      }

      const response = await this.$axios.get('/api/bitcoin-prices', {
        params: {
          period: this.selectedPeriod,
          startDate: this.startDate,
          endDate: this.endDate
        }
      });

      this.bitcoinData = response.data;
    } catch (error) {
      console.error('Error fetching bitcoin data', error);
    }
  }
}
};
</script>
