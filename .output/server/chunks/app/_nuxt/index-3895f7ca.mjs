import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from '../server.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';

const _sfc_main = {
  data() {
    return {
      selectedPeriod: "day",
      startDate: null,
      endDate: null,
      bitcoinData: null
    };
  },
  methods: {
    async fetchData() {
      try {
        if (this.selectedPeriod === "custom" && (!this.startDate || !this.endDate)) {
          return;
        }
        const response = await this.$axios.get("/api/bitcoin-prices", {
          params: {
            period: this.selectedPeriod,
            startDate: this.startDate,
            endDate: this.endDate
          }
        });
        this.bitcoinData = response.data;
      } catch (error) {
        console.error("Error fetching bitcoin data", error);
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Bitcoin Price Tracker</h1><select><option value="day"${ssrIncludeBooleanAttr(Array.isArray($data.selectedPeriod) ? ssrLooseContain($data.selectedPeriod, "day") : ssrLooseEqual($data.selectedPeriod, "day")) ? " selected" : ""}>Day</option><option value="week"${ssrIncludeBooleanAttr(Array.isArray($data.selectedPeriod) ? ssrLooseContain($data.selectedPeriod, "week") : ssrLooseEqual($data.selectedPeriod, "week")) ? " selected" : ""}>Week</option><option value="month"${ssrIncludeBooleanAttr(Array.isArray($data.selectedPeriod) ? ssrLooseContain($data.selectedPeriod, "month") : ssrLooseEqual($data.selectedPeriod, "month")) ? " selected" : ""}>Month</option><option value="year"${ssrIncludeBooleanAttr(Array.isArray($data.selectedPeriod) ? ssrLooseContain($data.selectedPeriod, "year") : ssrLooseEqual($data.selectedPeriod, "year")) ? " selected" : ""}>Year</option><option value="custom"${ssrIncludeBooleanAttr(Array.isArray($data.selectedPeriod) ? ssrLooseContain($data.selectedPeriod, "custom") : ssrLooseEqual($data.selectedPeriod, "custom")) ? " selected" : ""}>Custom</option></select>`);
  if ($data.selectedPeriod === "custom") {
    _push(`<div><input type="date"${ssrRenderAttr("value", $data.startDate)}><input type="date"${ssrRenderAttr("value", $data.endDate)}></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button>Fetch Data</button>`);
  if ($data.bitcoinData) {
    _push(`<div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-3895f7ca.mjs.map
