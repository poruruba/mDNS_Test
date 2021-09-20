'use strict';

//const vConsole = new VConsole();
//window.datgui = new dat.GUI();

const base_url = "【立ち上げたエンドポイントのURL】";

var vue_options = {
    el: "#top",
    mixins: [mixins_bootstrap],
    data: {
        timeout: 5000,
        servicetype: 'http',
        protocol: 'tcp',
        service_list: [],
        servicetype_list: [
            'http', "smb", "ssh", "googlecast", "hap"
        ],
    },
    computed: {
    },
    methods: {
        servicetype_select: function(index){
            this.servicetype = this.servicetype_list[index];
        },
        do_browse: async function(){
            try{
                this.progress_open();
                var param = {
                    servicetype: this.servicetype,
                    timeout: this.timeout,
                    protocol: this.protocol
                };
                var json = await do_post(base_url + '/mdns-list', param );
                console.log(json);
                this.service_list = json.list;
            }catch(error){
                console.error(error);
                alert(error);
            }finally{
                this.progress_close();
            }
        }
    },
    created: function(){
    },
    mounted: function(){
        proc_load();
    }
};
vue_add_data(vue_options, { progress_title: '' }); // for progress-dialog
vue_add_global_components(components_bootstrap);
vue_add_global_components(components_utils);

/* add additional components */
  
window.vue = new Vue( vue_options );
