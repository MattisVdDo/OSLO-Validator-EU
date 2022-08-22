<template>
  <vl-grid>
    <vl-column width="2">
      <vl-title tag-name="h3">
        Applicatieprofiel
      </vl-title>
    </vl-column>
    <vl-column width="3">
      <vl-select
        :mod-error="showSelectError"
        placeholder-text="Selecteer een applicatieprofiel"
        @input="onChangeSelect"
        @blur="validateError()"
      >
        <option
          v-for="ap in applicationProfiles"
          :key="ap[Object.keys(ap)[0]]"
          :value="[Object.keys(ap)[0]].toString()"
        >
          {{ ap[Object.keys(ap)[0]] }}
        </option>
      </vl-select>
    </vl-column>
    <vl-column v-if="showSelectError">
      <p style="color: red">
        Gelieve een applicatieprofiel te kiezen.
      </p>
    </vl-column>
  </vl-grid>
</template>

<script>
export default {
  name: "SelectComponent",
  emits: ["onChangeSelect"],
  data() {
    return {
      applicationProfiles: [],
      showSelectError: false,
      applicationProfile: ""
    };
  },
  methods: {
    onChangeSelect(value) {
      this.applicationProfile = value;
      this.showSelectError = false;
      this.$emit("onChangeSelect", value);
    },
    validateError() {
      if (this.applicationProfile === "") {
        this.showSelectError = true;
        return true;
      }

      this.showSelectError = false;
      return false;
    }
  },
  async mounted() {
    const response = await fetch(process.env.CONFIGURATION_URL);
    const data = await response.text(); //get github config.properties content as text

    var obj = {};

    data.toString().split('\n').forEach(element => {
      if (element.includes('=')) {
        element = element.replaceAll(' = ', '=').trim();
        obj[element.split("=")[0]] = element.split("=")[1];
      }else if (!element.trim().startsWith('#') && element.trim()) {
        obj["validator.type"] = obj["validator.type"] + ' ' + element; //check for extra types in different line (fix layout)
      }
    }); //turn properties file into json object

    obj["validator.type"].split(',').map(x => x.trim()).forEach(type => {
      var ttlarr = {};
      ttlarr[type] = obj[`validator.typeLabel.${type}`] //make array for every type : {type: "typelabel"}
      this.applicationProfiles.push(ttlarr); //add array to applicationprofiles list
    });
  }
};
</script>
