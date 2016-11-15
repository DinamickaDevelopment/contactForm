module.exports = {
    data : {
        name: "",
        aka: "",
        numberOfStaff: "",
        ein: "",
        website: "",
        tagline: "",
        missionStatement: "",
        history: "",
        overallwork: "",
        primaryContact: {
            firstName: "",
            lastName: "", 
            email: "",
            phone: ""
        },
        showContactInfo: false,
        physicaladdresses: [],
        fiscalStartDate: "",
        fiscalEndDate: "",
        assetAmount: 0, 
        assetAmountYear: 0,
        revenueAmount: 0,
        revenueAmountYear: 0,
        incomeAmount: 0,
        incomeAmountYear: 0,
        yearFounded: "",
        yearIncorporated: "",
        organizationType: [],
        serviceArea: [],
        regionsDescription: "",
        regions: [],
        leadership: []
    }, 

    set_ext: function (elem, index) {
        var phone_ext = elem.inputmask('unmaskedvalue'); 

        this.data.leadership[index].extension = phone_ext.substr(phone_ext.length - 4);
        this.data.leadership[index].phone = phone_ext.substr(0, phone_ext.length - 4);
     
    },
    set_regions: function (elem) {
        var r = elem.val().split(' ');

        this.data.regions = r.map(function (item) {
            return {
                  zipcode: item,
                  latlng: "",
                  formattedAddress: "",
                  region: "",
                  state: ""
            }
        })

    },

    set_field: function (elem, propname, nested_prop) {
        if (elem.attr('data-type') == 'file') {
            if (typeof elem.prop('files') != 'undefined') { 
                this.data[propname] = elem.prop('files')[0];
   
            }

        } else {
            if (!nested_prop) {
                if (elem.attr('data-maskval') == 'cash') {
                    var v = elem.val().replace('$ ', '');
                    v = v.replace(',', '');
                    v = parseFloat(v); 
                    if (isNaN(v)) { v = 0 } 
                    this.data[propname] = v; 
                    
                } else if (elem.attr('data-maskval') == '(999) 999-9999') {
                    var v = elem.inputmask('unmaskedvalue');
                    this.data[propname] = v;

                } else if (elem.attr('data-maskval') == '9999') {
                    var v = elem.inputmask('unmaskedvalue');
                    v = parseInt(v);

                    if (isNaN(v)) { v = 0 }
                    this.data[propname] = v; 
                }
                else if (propname == 'numberOfStaff') {
                    var v = parseInt(elem.val());
                    if (isNaN(v)) { v = 0 }
                    this.data[propname] = v;
                }
                else if (elem.hasClass('rad2')) {
                    if (elem.prop('checked')) {
                        if (elem.val() == 'true') {
                            var v = true; 
                        } else {
                            var v = false;
                        }

                        this.data[propname] = v; 
                    }
                } else {
                    this.data[propname] = elem.val();
                }
            }
            else {
                this.data[propname][nested_prop] = elem.val(); 
            }
        }
 
    },
    
    isSet: false, 
    set_multi: function (elem, catname, propname, index, flag) {

        var obj = {};

        if (typeof this.data[catname][index] == 'undefined') {

            this.data[catname].push(obj);

            map_vals.call(this);

        } else {

            map_vals.call(this); 
        }

        function map_vals() {
            if (elem.attr('data-type') != 'file') {
                if (propname != 'phoneExt') {
                 
                    if (elem.hasClass('rad2')) {
                      
                        if (flag && !this.isSet) {
                            this.data[catname][index][propname] = true
                            this.isSet = true;
                            return false; 
                        };
                        if (!flag && !this.isSet) {
                            this.data[catname][index][propname] = false;
                            this.isSet = true;
                            return false;
                        };
                        if (!flag && this.isSet) {
                            this.isSet = false;
                            return false;
                        }
                        if (flag && this.isSet) {
                            this.isSet = false;
                            return false;
                        }
                    } else {
                        this.data[catname][index][propname] = elem.val();
                    }
                }
  
                else {
                    this.set_ext(elem, index);
                }
            }
            else {
                if (typeof elem.prop('files') != 'undefined') {
                    this.data[catname][index][propname] = elem.prop('files')[0];
                }
            }

        }

    },


    set_drop: function (drop, propname) {

        var opts = drop.find(":selected");

      

        if (opts.length == 0) return false; 

        if (this.data[propname].length > 0) {
            this.data[propname] = [];
        }

        if (drop.find('optgroup').length > 0) {

            var optgroups= drop.find('optgroup'); 

            for (var i = 0; i < optgroups.length; i++) {

                this.data[propname].push({});
                this.data[propname][i][optgroups.eq(i).attr('label')] = []; 
                
                var cells = optgroups.eq(i).find(':selected');

                for (var j = 0; j < cells.length; j++) {
                    this.data[propname][i][optgroups.eq(i).attr('label')].push(cells.eq(j).val()); 
                }
            }

        } else {
            for (var i = 0; i< opts.length; i++) {
                this.data[propname].push(opts.eq(i).val()); 
            }
        }
    }, 

    get_data: function () {
        return this.data; 
    },

    get_json_data: function () {
        return JSON.stringify(this.data); 
    },
    refresh_data: function () {
        for (prop in this.data) {
            if (Object.prototype.toString.call(this.data[prop]) === '[object Array]') {
                this.data[prop] = new Array(); 
         
            } else if (typeof this.data[prop] == 'number') {
                this.data[prop] = 0; 
            } 
            else {
            this.data[prop] = ''; 
            }
        }
    }

}