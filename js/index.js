var pcaSelect = {};

pcaSelect = {

    init: function(provinceSelector, citySelector, areaSelector){
        pcaSelect.initProvince(provinceSelector,citySelector);
        pcaSelect.initCity(citySelector,areaSelector);
        pcaSelect.initArea(areaSelector);
    },

    initProvince: function(selector, target){
        $.ajax({
            type: 'GET',
            url: '/js/pca-code.json',
            dataType: 'json',
            success: function(res){
               let option = '<option>请选择省份</option>';
               res.forEach(element => {
                   option += '<option value="' +element.code + '">'+ element.name +'</option>';
               });
               let provinceSelect = document.getElementById(selector);
               provinceSelect.innerHTML = option;
               pcaSelect.pSelectOnchange(selector,target);
            }
        })
    },

    initCity: function(selector, target){
        let option = '<option>请选择地级市</option>';
        let citySelect = document.getElementById(selector);
        citySelect.innerHTML = option;
        pcaSelect.cSelectOnchange(selector, target);
    },

    initArea: function(selector){
        let option = '<option>请选择县市</option>';
        let areaSelect = document.getElementById(selector);
        areaSelect.innerHTML = option;
    },

    pSelectOnchange: function(origin, target){
        $("body").delegate('#'+origin,'change',function(){
            let code = $(this).find("option:selected").val();
            $.ajax({
                type: "GET",
                url: 'js/pca-code.json',
                dataType: 'json',
                success: function(res){
                    res.forEach(element => {
                        let childNode = element.childs;
                        if(code === element.code){
                            let option = '';
                            childNode.forEach(item =>{
                                option += '<option value="' +item.code + '">'+ item.name +'</option>';
                            });
                            let targetSelect = document.getElementById(target);
                            targetSelect.innerHTML = option;

                            console.log($(targetSelect).find("option:selected"));
                            let selectNodeCode = $(targetSelect).find("option:selected").val();
                        }
                        
                    })
                }
            })
        });
    },

    cSelectOnchange: function(origin, target){
        $("body").delegate('#'+origin,'change',function(){
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
                                let targetSelect = document.getElementById(target);
                                targetSelect.innerHTML = option;
                            }
                        })
                    })
                }
            })
        });
    }
}