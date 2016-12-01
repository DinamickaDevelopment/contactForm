module.exports = {
   
    data1: {
        programName: "",
        serviceArea: [],
        programDescription: "",
        fundsInvested: 0,
        fundsType: "",
        programLength: "",
        programStartDate: "",
        programEndDate: "",
        populationServed: "",
        unduplicatedInd: 0,
        unduplicatedFam: 0,
        male: 0,
        female: 0,
        unknownGender: 0,
        ageUnder5: 0,
        ageUnder5_10: 0,
        ageUnder10_15: 0,
        ageUnder15_20: 0,
        ageUnder20_50plus: 0,
        regionsDescription: "",
        regions: [],
        programActivities: [],
        programOutcome: [],
        shortTermImpact: "",
        longTermImpact: "",
        overallImpact: "",
        programStatus: "",
        meetProgramResult: false,
        pastProgramData: [],
        programDocument: "",
        recent990: ""
    },

    set_category: function(ct) {
        this.data = this["data" + ct];
    }, 
    data: {}, 
    set_ext: function (elem, index) {
        var phone_ext = elem.inputmask('unmaskedvalue'); 

        this.data.leadership[index].extension = phone_ext.substr(phone_ext.length - 4);
        this.data.leadership[index].phone = phone_ext.substr(0, phone_ext.length - 4);
     
    },
    set_regions: function (elem, flag, index) {
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

    set_field: function (elem, propname, nested_prop, old_elem, index) {
        if (elem.attr('data-type') == 'file') {
            if (!old_elem.prop('files')) return false; 

            if (elem.prop('files').length > 0) {
                if (typeof elem.prop('files')[0] != 'undefined') {
                    this.data[propname] = elem.prop('files')[0].name;
                } else {
                    this.data[propname] = ''; 
                }
   
            } else if (old_elem.prop('files').length > 0) {
                if (typeof old_elem.prop('files')[0] != 'undefined') {
                    this.data[propname] = old_elem.prop('files')[0].name;
                } else {
                    this.data[propname] = '';
                }
            }

        } else {
            if (!nested_prop) {
             
                if (Object.prototype.toString.call(this.data[propname]) === '[object Array]') {
                    this.data[propname].push(elem.val())
                }
                else {
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
                    } else if (elem.attr('data-maskval') == 'nums') {
                        v = parseInt(elem.val()); 
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
            }
            else {
                if (Object.prototype.toString.call(this.data[propname]) === '[object Array]') {
                    if (propname == 'programActivities' || propname == 'programOutcome' || propname== "pastProgramData") {
                        if (Object.prototype.toString.call(this.data[propname][index]) !== '[object Object]') {
                            if (propname == 'programActivities') {
                                this.data[propname].push({
                                    impactedNumber: 0,
                                    description: ""
                                });
                            }
                            if (propname == 'programOutcome') {
                                this.data[propname].push({
                                    impactedNumber: 0,
                                    impactedGroup: "",
                                    impact: ""
                                });
                            }
                            if (propname == 'pastProgramData') {
                                this.data[propname].push({
                                    impact: "",
                                    impactedNumber: 0,
                                    impactedGroup: ""
                                })
                            }
                            
                        }

                        this.data[propname][index][nested_prop] = elem.val();
                        
                    }
                } else {
                    this.data[propname][nested_prop] = elem.val(); 
                }

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
                        if (!isNaN(parseInt(propname.substr(propname.length - 1)))) {
                            propname = propname.substr(0, propname.length - 1);
                        }

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

                        if (elem.attr('data-maskval') == 'cash') {
                            var v = elem.val().replace('$ ', '');
                            v = v.replace(',', '');
                            v = parseFloat(v);
                            if (isNaN(v)) { v = 0 }
                            this.data[catname][index][propname] = v;

                        } else if (elem.attr('data-maskval') == 'nums') {
                            v = parseInt(elem.val());
                            if (isNaN(v)) { v = 0 }

                            this.data[catname][index][propname] = v;
                        }
                        else {
                            this.data[catname][index][propname] = elem.val();
                        }
                       
                    }
                }
  
                else {
                    this.set_ext(elem, index);
                }
            }
            else {
                try {
                    if (typeof elem.prop('files') != 'undefined') {
                        if (typeof elem.prop('files')[0] != 'undefined') {
                            this.data[catname][index][propname] = elem.prop('files')[0].name;
                        } else {
                            this.data[catname][index][propname] = '';
                        }
                    }
                } catch (err) {
                    this.data[catname][index][propname] = '';
                }
            }

        }

    },


    set_drop: function (drop, propname, flag, index) {

        var opts = drop.find(":selected");

        if (opts.length == 0) return false; 

        //if (!flag) {
        //    var data = this.data; 
        //} else {
        //    if (drop.hasClass('p')) {
        //        var data = this.data.programs[index];
        //    } else if (drop.hasClass('o')) {
        //        var data = this.data.outcomes[index];
        //    }
        //}

        var data = this.data; 

        if (typeof data[propname] != 'undefined') {
            if (data[propname].length > 0) {
                data[propname] = [];
            }
            if (Object.prototype.toString.call(data[propname]) !== '[object Array]') {
                data[propname] = [];
            }
        } else {
            data[propname] = [];
        }

            if (drop.find('optgroup').length > 0) {

                var optgroups= drop.find('optgroup'); 

                for (var i = 0; i < optgroups.length; i++) {

                    data[propname].push({});
                    data[propname][i][optgroups.eq(i).attr('label')] = [];

                    var cells = optgroups.eq(i).find(':selected');

                    for (var j = 0; j < cells.length; j++) {
                        data[propname][i][optgroups.eq(i).attr('label')].push(cells.eq(j).val());
                    }
                }

             

            } else {
                for (var i = 0; i < opts.length; i++) {
                    data[propname].push(opts.eq(i).val()); 
                }
            }

            if (drop.hasClass('one-dimension')) {
                var v = data[propname][0];
                data[propname] = v; 
            }

            if (propname == 'populationServed' && data[propname].length > 0) {
                var v = data[propname].join(', ');
                data[propname] = v; 
            }
         
    },

    get_data: function (ct) {
        return this.data; 
    },

    get_json_data: function () {
        return JSON.stringify(this.data); 
    },
    refresh_data: function () {
        for (prop in this.data) {
            
            if (Object.prototype.toString.call(this.data[prop]) === '[object Array]') {
                this.data[prop] = new Array(); 
         
            } else if (Object.prototype.toString.call(this.data[prop]) === '[object Object]') {
                for (prop1 in this.data[prop]) {
                    this.data[prop][prop1] = {}
                }
            }
            else if (typeof this.data[prop] == 'number') {
                this.data[prop] = 0; 
            } 
            else {
            this.data[prop] = ''; 
            }
        }
    }

}