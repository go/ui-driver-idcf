let ZONES = [
  "henry",
  "newton",
  "joule",
  "pascal",
];

let URLS =
[
  {
    "displayName": "東日本",
    "url": "https://compute.jp-east.idcfcloud.com/client/api",
  },
  {
    "displayName": "東日本2",
    "url": "https://compute.jp-east-2.idcfcloud.com/client/api",
  },
  {
    "displayName": "西日本",
    "url": "https://compute.jp-west.idcfcloud.com/client/api",
  }
];

let OFFERINGS = [
  "light.S1",
  "light.S2",
  "standard.S4",
  "standard.S8",
  "standard.M8",
  "standard.L16",
  "standard.XL32",
  "highcpu.M4",
  "highcpu.L8",
  "highcpu.XL16",
  "highcpu.2XL32",
  "highmem.M16",
  "highmem.L32",
  "highmem.XL64",
  "highio.3XL128",
  "highio.5XL128",
];

/* v----- Do not change anything between here
 *       (the DRIVERNAME placeholder will be automatically replaced during build) */
define('ui/components/machine/driver-%%DRIVERNAME%%/component', ['exports', 'ember', 'ui/mixins/driver'], function (exports, _ember, _uiMixinsDriver) {

  exports['default'] = _ember['default'].Component.extend(_uiMixinsDriver['default'], {
    driverName: '%%DRIVERNAME%%',
    zoneChoices: ZONES,
    apiUrlChoices: URLS,
    offeringChoices: OFFERINGS,
    idcfConfig: Ember.computed.alias('model.%%DRIVERNAME%%Config'),

/* ^--- And here */

    // Write your component here, starting with setting 'model' to a machine with your config populated
    bootstrap: function() {
      let config = this.get('store').createRecord({
        type                : '%%DRIVERNAME%%Config',
        apiUrl              : 'https://compute.jp-east.idcfcloud.com/client/api',
        apiKey              : '',
        secretKey           : '',
        zone                : 'henry',
        template            : 'Ubuntu Server 16.04 LTS 64-bit',
        sshUser             : 'ubuntu',
        serviceOffering     : 'light.S1',
        expunge             : '',
      });

      this.set('model', this.get('store').createRecord({
        type: 'host',
        '%%DRIVERNAME%%Config': config,
      }));
    },

    // Add custom validation beyond what can be done from the config API schema
    validate() {
      // Get generic API validation errors
      this._super();
      var errors = this.get('errors')||[];

      // Add more specific errors

      // Check empty value for api/secret keys
      //let apiKey = this.get('%%DRIVERNAME%%Config.apiKey');
      //if ( apiKey == null ) {
      //  errors.push('API キーは必須です');
      //}

      //let secretKey = this.get('%%DRIVERNAME%%Config.secretKey');
      //if ( secretKey == null ) {
      //  errors.push('秘密キーは必須です');
      //}

      // Check something and add an error entry if it fails:
      //if ( parseInt(this.get('model.%%DRIVERNAME%%Config.size'),10) < 1024 )
      //{
      //  errors.push('Size must be at least 1024 MB');
      //}

      // Set the array of errors for display,
      // and return true if saving should continue.
      if ( errors.get('length') )
      {
        this.set('errors', errors);
        return false;
      }
      else
      {
        this.set('errors', null);
        return true;
      }
    },

    // Any computed properties or custom logic can go here
  });
});
