var pcaSelect = {};

pcaSelect = {

    provinceSelector: '',
    citySelector: '',
    areaSelector: '',

    init: function(provinceSelector, citySelector, areaSelector){
        this.provinceSelector = provinceSelector;
        this.citySelector = citySelector;
        this.areaSelector = areaSelector;

        pcaSelect.initProvince();
        pcaSelect.initCity();
        pcaSelect.initArea();
    },

    initProvince: function(){
        $.ajax({
            type: 'GET',
            url: '/js/pca-code.json',
            dataType: 'json',
            success: function(res){
               let option = '';
               res.forEach(element => {
                   option += '<option value="' +element.code + '">'+ element.name +'</option>';
               });
               let provinceSelect = document.getElementById(pcaSelect.provinceSelector);
               provinceSelect.innerHTML = option;
               pcaSelect.pSelectOnchange(this.provinceSelector,this.citySelector);
            }
        })
    },

    initCity: function(){
        //以北京地区初始化
        let option = '<option value="1101">市辖区</option>';
        let citySelect = document.getElementById(this.citySelector);
        citySelect.innerHTML = option;
        pcaSelect.cSelectOnchange(this.citySelector, this.areaSelector);
    },

    initArea: function(){
        //以北京地区初始化
        let option = '';
        let beijingAreaArray = [{"code":"110101","name":"东城区"},{"code":"110102","name":"西城区"},{"code":"110105","name":"朝阳区"},{"code":"110106","name":"丰台区"},{"code":"110107","name":"石景山区"},{"code":"110108","name":"海淀区"},{"code":"110109","name":"门头沟区"},{"code":"110111","name":"房山区"},{"code":"110112","name":"通州区"},{"code":"110113","name":"顺义区"},{"code":"110114","name":"昌平区"},{"code":"110115","name":"大兴区"},{"code":"110116","name":"怀柔区"},{"code":"110117","name":"平谷区"},{"code":"110118","name":"密云区"},{"code":"110119","name":"延庆区"}];
        beijingAreaArray.forEach(element =>{
            option += '<option value="' +element.code + '">'+ element.name +'</option>';
        })
        let areaSelect = document.getElementById(this.areaSelector);
        areaSelect.innerHTML = option;
    },

    pSelectOnchange: function(){
        $("body").delegate('#'+ pcaSelect.provinceSelector,'change',function(){
            let code = $(this).find("option:selected").val();
            $.ajax({
                type: "GET",
                url: 'js/pca-code.json',
                dataType: 'json',
                success: function(res){
                    let firstAreaNodeData = [];
                    res.forEach((element, index)=> {
                        let childNode = element.childs;
                        let selectedOptionValue = '';
                        if(code === element.code){
                            let option = '';
                            childNode.forEach(item =>{
                                option += '<option value="' +item.code + '">'+ item.name +'</option>';
                            });
                            let targetSelect = document.getElementById(pcaSelect.citySelector);
                            targetSelect.innerHTML = option;

                            let $selectedOption = $(targetSelect).find("option:selected");
                            selectedOptionValue = $selectedOption.val();

                            childNode.forEach(item =>{
                                if( item.code === selectedOptionValue){
                                    firstAreaNodeData = item.childs;
                                }
                            })
                        }
                    });
                    let areaOption = '';
                    firstAreaNodeData.forEach(item => {
                        areaOption += '<option value="' +item.code + '">'+ item.name +'</option>';
                    });
                    let areaSelect = document.getElementById(pcaSelect.areaSelector);
                    areaSelect.innerHTML = areaOption;
                }
            })
        });
    },

    cSelectOnchange: function(){
        $("body").delegate('#'+pcaSelect.citySelector,'change',function(){
            let code = $(this).find("option:selected").val();
            $.ajax({
                type: "GET",
                url: 'js/pca-code.json',
                dataType: 'json',
                success: function(res){
                    res.forEach(element => {
                        let childNode = element.childs;
                        childNode.forEach(element =>{
                            if(code === element.code){
                                let childNode = element.childs,
                                    option = '';
                                childNode.forEach(item =>{
                                    option += '<option value="' +item.code + '">'+ item.name +'</option>';
                                });
                                let targetSelect = document.getElementById(pcaSelect.areaSelector);
                                targetSelect.innerHTML = option;
                            }
                        })
                    })
                }
            })
        });
    }
}