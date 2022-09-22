$(document).ready(function () {

    /*
     * Install Note: connect to data-country.json & data-activity.json if csv to JSON is not working   
     */

    let prevLayerClicked = null;

    let mapType = "overview";
    let usaidRed = "#BA0C2F";
    let usaidLightBlue = "#A7C6ED";

    // $.getJSON(jsonlink, function (data) {
    $.getJSON(jsonlink_country, function (data) {
        let countries = [];
        let countries2 = [];
        
        $.each(data, function(i, item) {
            let country = data[i].Country;
            let supportnum = data[i]["Number of Supporting Agencies"];
            let preprimary = data[i]["Pre-Primary Education Support"];
            let primary = data[i]["Primary Education Support"];
            let secondary = data[i]["Secondary Education Support"];
            let postsecondary = data[i]["Post-Secondary Education Support"];
            let wfdsupport = data[i]["WFD Support"];
            let systems = data[i]["Systems Strengthening Support"];

            let agencysupport = data[i]["Agency Support"];

            let alias = '';
            
            if (agencysupport > 0){
            let agency = data[i]["Agency"];
                if (agency == 'U.S. Department of Agriculture'){ alias = 'usda'} 
                if (agency == 'U.S. Department of Labor'){ alias = 'usdol'} 
                if (agency == 'U.S. Department of State'){ alias = 'usdos'} 
                if (agency == 'Millennium Challenge Corporation'){ alias = 'mcc'} 
                if (agency == 'The Peace Corps'){ alias = 'uspc'} 
                if (agency == 'USAID'){ alias = 'usaid'} 
            }

            // Support List
            // Types of Coordination
            countries.push(country);
            countries2.push([country, supportnum, preprimary, primary, secondary, postsecondary, wfdsupport, systems, alias]);

        });

        let countriesList = [...new Set(countries)];
        let countriesList2 = [...new Set(countries2)];

        /* Build Select List */
        let countrySelect = '<option name="none">Select Country or Region</option>';

        let arrayLength = countriesList.length;

        for (let i = 0; i < arrayLength; i++) {
            let currentCountry = countriesList[i]
            countrySelect +=  '<option value="' + currentCountry + '">' + currentCountry + '</option>';
        }

        //add countrySelect to select
        $("#countries-select").html(countrySelect);

        // on select change
        $('#countries-select').on('change', function() {
            let selectedCountry = this.value

            //check if accordian exists -- destroy accordian
            let isAccordion = $("#projects-wrapper").hasClass("ui-accordion");
            if ( isAccordion ){
                $( "#projects-wrapper" ).accordion( "destroy" );
            }

            //go through json to find all matching countries
            let countryResult = '<div class="current-country">' + selectedCountry + '</div>';

            //set up variables
            let agencies = '';
            var programResult = '<h2>Country Activities</h2>';        

            //support array
            let supportArr = [];
            supportArr.push(["Pre-Primary Education Support", 0]);
            supportArr.push(["Primary Education Support", 0]);
            supportArr.push(["Secondary Education Support", 0]);
            supportArr.push(["Post-Secondary Education Support", 0]);
            supportArr.push(["WFD Support", 0]);
            supportArr.push(["Systems Strengthening Support", 0]);

            var support0 = 0;
            var support1 = 0;
            var support2 = 0;
            var support3 = 0;
            var support4 = 0;
            var support5 = 0;

            function supportTest(support0, support1, support2, support3, support4) {
                this.support0 = support0;
                this.support1 = support1;
                this.support2 = support2;
                this.support3 = support3;
                this.support4 = support4;
            }
            
            var supportBar = new supportTest (0, 0, 0, 0, 0);

            supportHolder = [];
            supportHolder.push(["usda", 0, supportBar]);
            supportHolder.push(["usdol", 0, supportBar]);
            supportHolder.push(["usdos", 0, supportBar]);
            supportHolder.push(["mcc", 0, supportBar]);
            supportHolder.push(["uspc", 0, supportBar]);
            supportHolder.push(["usaid", 0, supportBar]);
            
            //build coordination array
            let coordArr = [];
            coordArr.push(["Non-USG Meetings and Events", 0]);
            coordArr.push(["Joint Host-Country Government Engagement", 0]);
            coordArr.push(["Joint Strategic Planning", 0]);
            coordArr.push(["Joint Program Coordination / Management", 0]);
            coordArr.push(["Joint/Parallel Program Funding", 0]);
            coordArr.push(["Joint Agency Proposal Review", 0]);
            coordArr.push(["Sharing Data, Research, Guidance", 0]);
            // coordArr.push(["Sharing Data", 0]);
            // coordArr.push(["Research", 0]);
            // coordArr.push(["Guidance", 0]);
            coordArr.push(["Cross-Agency Trainings", 0]);
            coordArr.push(["Cross-Agency Education Meetings", 0]);

            //set vars
            var indexsplice = '0';

            let count = $(data).length;
            $.each(data, function(i, item) {

                let country = data[i].Country;
                let agencysupport = data[i]["Agency Support"]; 

                let agency = '';

                if (country == selectedCountry && agencysupport >= 1) {

                    //create variables
                    agency += data[i]["Agency"];
                    agencies += agency + ', ';

                    if (data[i]["Pre-Primary Education Support"] == 1)      { support0 = 1 };
                    if (data[i]["Primary Education Support"] == 1)          { support1 = 1 };
                    if (data[i]["Secondary Education Support"] == 1)        { support2 = 1 };
                    if (data[i]["WFD Support"] == 1)                   { support3 = 1 };
                    if (data[i]["Systems Strengthening Support"] == 1)      { support4 = 1 };

                    var supportFoo = new supportTest(support0, support1, support2, support3, support4);

                    if (agency == 'U.S. Department of Agriculture'){ alias = 'usda'} 
                    if (agency == 'U.S. Department of Labor'){ alias = 'usdol'} 
                    if (agency == 'U.S. Department of State'){ alias = 'usdos'} 
                    if (agency == 'Millennium Challenge Corporation'){ alias = 'mcc'} 
                    if (agency == 'The Peace Corps'){ alias = 'uspc'} 
                    if (agency == 'USAID'){ alias = 'usaid'} 

                    if (agency == 'U.S. Department of Agriculture')     { indexsplice = 0 }
                    if (agency == 'U.S. Department of Labor')           { indexsplice = 1 } 
                    if (agency == 'U.S. Department of State')           { indexsplice = 2 } 
                    if (agency == 'Millennium Challenge Corporation')   { indexsplice = 3 } 
                    if (agency == 'The Peace Corps')                   { indexsplice = 4 } 
                    if (agency == 'USAID')                              { indexsplice = 5 } 

                    var toholder = [alias, 1,  supportFoo];
                    supportHolder.splice(indexsplice, 1, toholder);

                    //Add to coord array
                    if (data[i]["Non-USG Meetings and Events"] == "Yes")                { ++coordArr[0][1] };
                    if (data[i]["Joint Host-Country Government Engagement"] == "Yes")   { ++coordArr[1][1] };
                    if (data[i]["Joint Strategic Planning"] == "Yes")                   { ++coordArr[2][1] };
                    if (data[i]["Joint Program Coordination/Management"] == "Yes")      { ++coordArr[3][1] };
                    if (data[i]["Joint/Parallel Program Funding"] == "Yes")             { ++coordArr[4][1] };
                    if (data[i]["Joint Agency Proposal Review"] == "Yes")               { ++coordArr[5][1] };
                    if (data[i]["Sharing Data, Research, Guidance"] == "Yes")           { ++coordArr[6][1] };
                    if (data[i]["Cross-Agency Trainings"] == "Yes")                     { ++coordArr[7][1] };
                    if (data[i]["Cross-Agency Education Meetings"] == "Yes")            { ++coordArr[8][1] };

                    support0 = 0;
                    support1 = 0;
                    support2 = 0;
                    support3 = 0;
                    support4 = 0;
                    support5 = 0;
                    
                }


                //executed at the end of the loop
                if (i+1 === count) {
                    agencies = agencies.replace(/,\s*$/, "");
                    
                    let supporttable = "";

                    supporttable += '<table class="support-table rtable rtable--flip"><tr>';
                    supporttable += '<th class="top-left"> </th>';
                    supporttable += '<th>Pre-Primary Education Support</th>';
                    supporttable += '<th>Primary Education Support</th>';
                    supporttable += '<th>Secondary Education Support</th>';
                    supporttable += '<th>WFD Support</th>';
                    supporttable += '<th>Systems Strengthening Support</th>';      

                    supporttable += '</tr>';

                    //DOL
                    supporttable += '<tr>';                
                    supporttable += '<td class="support-row-header">DOL</td>';
                    for (const [key, value] of Object.entries(supportHolder[1][2])) {
                        supporttable += '<td>' + checkValue(value) + '</td>';
                    }
                    supporttable += '</tr>';
                    
                    //MCC
                    supporttable += '<tr>';                
                    supporttable += '<td class="support-row-header">' + supportHolder[3][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[3][2])) {
                        supporttable += '<td>' + checkValue(value) + '</td>';
                    }
                    supporttable += '</tr>';
                    
                    //USPC
                    supporttable += '<tr>';                
                    supporttable += '<td class="support-row-header">PC</td>';
                    for (const [key, value] of Object.entries(supportHolder[4][2])) {
                        supporttable += '<td>' + checkValue(value) + '</td>';
                    }
                    supporttable += '</tr>';
                    
                    //USDOS
                    supporttable += '<tr>';                
                    supporttable += '<td class="support-row-header state">State</td>';
                    for (const [key, value] of Object.entries(supportHolder[2][2])) {
                        supporttable += '<td>' + checkValue(value) + '</td>';
                    }
                    supporttable += '</tr>';                    
                    
                    //USAID
                    supporttable += '<tr>';                
                    supporttable += '<td class="support-row-header">' + supportHolder[5][0] + '</th>';
                    for (const [key, value] of Object.entries(supportHolder[5][2])) {
                        supporttable += '<td>' + checkValue(value) + '</td>';
                    }   
                    supporttable += '</tr>';

                    //USDA
                    supporttable += '<tr>';                
                    supporttable += '<td class="support-row-header">' + supportHolder[0][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[0][2])) {
                        supporttable += '<td>' + checkValue(value) + '</td>';
                    }
                    supporttable += '</tr>';
                    supporttable += '</table>';

                    function checkValue(value){
                        if (value == 1 ){
                            value = '<svg xmlns="http://www.w3.org/2000/svg" class="box" width="24" height="24" viewBox="0 0 24 24"><path d="M24 0h-24v24h24v-24z"/></svg>';
                        }
                        else{
                            value = '<!-- none -->';
                        }
                        return value;
                    }

                    countryResult += '<div class="detailed">'; //detailed wrapper
                    countryResult += '<h2>USG BE Support by Education Level(s) and Agency</h2>';
                    countryResult += '<div>' + supporttable + '</div>';
                    countryResult += '<p><span class="supporting-agencies">Supporting Agencies:</span> ' + agencies  + '</p>';

                    countryResult += '<h2>Types of Coordination Reported for this Country</h2>';
                    countryResult += '<div class="coordination-list">';
                    
                    let check = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>';


                    //iterate through coordination array
                    for (var i = 0; i < coordArr.length; i++){
                        countryResult += '<div class="coordination-column">';
                        for (var j = 0; j < coordArr[i].length; j++){
                            if (j == 1) {
                                if (coordArr[i][j] > 0){ countryResult += '<div class="coordination-cell coordination-checked">' + check + '</div>'; }
                                else{ countryResult += '<div class="coordination-cell coordination-unchecked">' + '<!--None-->' + '</div>'; }
                            }
                            else { countryResult += '<div class="coordination-header">' + coordArr[i][j] + '</div>'; }
                        }
                        countryResult += '</div>';
                    }
                    countryResult += '</div>';
                    countryResult += '</div><!-- .detailed -->';//detailed
                    countryResult += '<div class="overview"><p><span class="supporting-agencies">Supporting Agencies:</span> ' + agencies  + '</p></div>';

//// Next stuff

$.getJSON(jsonlink_activity, function (data2) {

    let programHolder = [];


    let count2 = $(data2).length;
    $.each(data2, function(i, item) {
        let country2 = data2[i]["Country"];
        
        // begin if loop
        if (country2 == selectedCountry) {

            let programResult2 = '';

            //create variables
            let name = data2[i]["Activity Name"];
            let description = data2[i]["Description"];
            let start = data2[i]["Start Year"];
            let end = data2[i]["End Year"];
            let implementorname = data2[i]["Implementer"];
            let agency = data2[i]["Agency"];
            let link = data2[i]["Link to Website"];
            let eduLevels = "";

            programResult2 += '<div class="wrap"><h2 class="project-name">' + name + '</h2>';

            programResult2 += '<div><span class="project-description">';
            programResult2 += description + '</span>';
            if (start!=''||end!=''){programResult2 += '<span class="project-dates">' + start + ' &ndash; ' + end + '</span>';}
            programResult2 += '<span class="project-agency"><strong>Agency:</strong> ' + agency + '</span>';
            if (implementorname!='') { programResult2 += '<span class="project-implementorname"><strong>Implementor:</strong> ' + implementorname + '</span>';}
            
            var educationLevels = '';
            
            checkEduLevel(data2[i]["Pre-Primary"], 'Pre-Primary');
            checkEduLevel(data2[i]["Primary"], 'Pre-Primary');
            checkEduLevel(data2[i]["Secondary"], 'Secondary');
            checkEduLevel(data2[i]["Workforce Development"], 'Workforce Development');
            checkEduLevel(data2[i]["Education Systems Strengthening"], 'Education Systems Strengthening');
            
            if (educationLevels){
                programResult2 += '<span class="project-edulevel"><strong>Education Level:</strong> ';
                educationLevels = educationLevels.replace(/,\s*$/, ""); //remove final comma
                programResult2 += educationLevels;
            }

            programResult2 += '</span>';

            if (link!=''&&link!='-') { programResult2 += '<br><span class="project-subawardees"><a href="' + link + '" target="_blank" title="Link opens in a new window">Link to Project</a></span>';}

            programResult2 += '<div>';
            programResult2 += eduLevels;
            programResult2 += '</div>';

            programResult2 += '</div></div>';

            programHolder.push({'agency' : agency, 'result' : programResult2});

        }

        // once if loop is done
        if (i+1 === count2) {

            //group array by agency
            const programGroups = programHolder.reduce((groups, item) => {
                const group = (groups[item.agency] || []);
                group.push(item);
                groups[item.agency] = group;
                return groups;
              }, {});
              
            let allPrograms = '';

            const ordered = Object.keys(programGroups).sort().reduce(
                (obj, key) => { 
                  obj[key] = programGroups[key]; 
                  return obj;
                }, 
                {}
            );

            $.each(ordered, function(i, item) {
                let agencyPrograms = '';
                
                for(let i = 0; i < item.length; i++) {
                    if (i == 0){
                        agencyPrograms += '<h4>'+ item[0]["agency"] +'</h4>';
                    }
                    agencyPrograms += item[i].result;
                }
                allPrograms += agencyPrograms;
            });

            $("#projects-wrapper").html(programResult + allPrograms);
            
            //create accordian
            $("#projects-wrapper" ).accordion({
                animate: 200,
                header: '> div.wrap > h2',
                heightStyle: "content",
                collapsible: true,
                active: false, //collapse all panels
            });
        
        }
        
        function checkEduLevel(check, title, addTo){
            if (check.toUpperCase() == "X"){
                educationLevels += title + ', ';
            }
            return educationLevels;
        }
        
    }); //end each

});

}

});

        $("#country-wrapper").html(countryResult);  

            // highlight country 
            geojson.eachLayer(function(layer) {
                
                let layername = layer.feature.properties.name;
                if (layername == selectedCountry) {
                    if (prevLayerClicked !== null) {
                        prevLayerClicked.setStyle(solidStyle);
                        map.closePopup();
                        // console.log(layer.feature.properties); //for test
                    }
                    
                    layer.setStyle(selectStyle);
                    
                    // bring to front
                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        layer.bringToFront();
                    }
                    
                    prevLayerClicked = layer;
                }

            })
        });
        
        let othercountries = '';
        


        //iterate through countriesMap variable
        if (mapType == 'overview'){

        // var geojson = L.geoJSON(countriesMap, {style: solidStyle, onEachFeature: onEachFeature})
        var geojson = L.geoJSON(countriesMap, {onEachFeature: onEachFeature})
            .eachLayer(function (layer) {
                let thislayercountry = layer.feature.properties.name;

                var int = 0;
                if (exists(countriesList2, thislayercountry) ){ //checking 2 dim array    
                    layer.addTo(map) //adds countries to map
                    
                    countriesList2.forEach(e => {

                        if (e[0] == thislayercountry) { //if country matches other list

                            // first round with country registar data in object
                            if (int == 0){
                                layer.feature.properties["support"] = e[1];
                                layer.feature.properties["preprimary"] = e[2];
                                layer.feature.properties["primary"] = e[3];
                                layer.feature.properties["secondary"] = e[4];
                                layer.feature.properties["wfdsupport"] = e[6];
                                layer.feature.properties["systems"] = e[7];

                                layer.feature.properties[e[8]] = []; //set up array
                                layer.feature.properties[e[8]].push(e[2], e[3], e[4], e[6], e[7]);

                                if (e[8] != ''){
                                    layer.feature.properties["agencies"] = e[8];
                                }

                                layer.bindTooltip('<strong>' + layer.feature.properties.name + '</strong>' + '<br>Number of Supporting Agencies: ' + e[1]);
                            }

                            // other rounds
                            else{
                                if (e[2] == 1){layer.feature.properties["preprimary"]++;} 
                                if (e[3] == 1){layer.feature.properties["primary"]++;} 
                                if (e[4] == 1){layer.feature.properties["secondary"]++;} 
                                if (e[6] == 1){layer.feature.properties["wfdsupport"]++;} 
                                if (e[7] == 1){layer.feature.properties["systems"]++;} 
                                
                                layer.feature.properties[e[8]] = []; //set up array
                                layer.feature.properties[e[8]].push(e[2], e[3], e[4], e[6], e[7]);

                                if (e[8] != ''){
                                    if (layer.feature.properties["agencies"]){
                                        layer.feature.properties["agencies"] += ' ' + e[8];
                                    }
                                    else {
                                        layer.feature.properties["agencies"] = e[8];
                                    }
                                }
                            }

                            //set color based on # of supporting agencies
                            // layer.setStyle(colorstyle(layer.feature));
                            //

                            layer.setStyle(detailedBaseStyle);
                            // changeFilter();

                            int++;
                        }
                        
                    });
                }

                function exists(arr, search) {
                    return arr.some(row => row.includes(search)); //returns true
                }

                //popup
                layer
                    .on('click', function(layer) {
                        $('#countries-select').val(thislayercountry).trigger('change');
                    })
                othercountries += thislayercountry;
            });//L.geoJSON eachLayer function
        }//overview

        let prevLayerClicked = null;
        
        function resetHighlight(e) {
            let layer = e.target;
            layer.setStyle({ fillOpacity: 1 });

        }

        function highlightFeature(e) {
            let layer = e.target;

            layer.setStyle({ fillOpacity: 0.5 });

        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        }

        function getColor(d) {
            return  d == 1 ? '#aec7eb' :
                    d == 2 ? '#8ba3cb' :
                    d == 3 ? '#6b83ae' :
                    d == 4 ? '#516692' :
                    d >= 5 ? '#002F6C' :
                             'rgb(80, 101, 148)'; //none?
        }
        
        function colorstyle(feature) {
                let supportnum;

                if (!feature.properties){
                    supportnum = 0;
                }
                else{
                    supportnum = feature.properties.support
                }

            return {
                fillColor: getColor(supportnum),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 1
            };
        }

    let supportFilter = 'None';
    let filterDOL = 0;
    let filterMCC = 0;
    let filterPC = 0;
    let filterState = 0;
    let filterUSAID = 0;
    let filterUSDA = 0;

    $("input[type='checkbox']").on("change",function(){
        let id = $(this).attr('id');
        let checked = $(this).is(":checked");
        if (checked){
            check = 1;
        }
        else {
            check = 0;
        }

        if (id == "dol"){
            filterDOL = check;
        }
        if (id == "mcc"){
            filterMCC = check;
        }
        if (id == "pc"){
            filterPC = check;
        }
        if (id == "usdos"){
            filterState = check;
        }
        if (id == "usaid"){
            filterUSAID = check;
        }
        if (id == "usda"){
            filterUSDA = check;
        }

        // console.log (filterDOL + ' ' + filterMCC + ' ' + filterPC + ' ' + filterState + ' ' + filterUSAID + ' ' + filterUSDA)


        changeFilter();
    });

    function changeFilter (){
        const terms = [];

        supportFilter = $('#support-filter').val();
        
        if (filterDOL == 1){
            terms.push("usdol"); 
        }
        if (filterMCC == 1){
            terms.push("mcc"); 
        }
        if (filterPC == 1){
            terms.push("uspc"); 
        }
        if (filterState == 1){
            terms.push("usdos"); 
        }
        if (filterUSAID == 1){
            terms.push("usaid"); 
        }
        if (filterUSDA == 1){
            terms.push("usda");
        }

        geojson.eachLayer(function (layer) {
            let agencies = layer.feature.properties["agencies"];
            
            let containsSupportTerms = false; 

            if (agencies) {
                containsSupportTerms = terms.every(term => agencies.includes(term));
            }

            if (supportFilter == "none" && terms == '' ){
                layer.setStyle({fillColor : 'gray'});
            }

            else if(supportFilter == "none"){
                if(containsSupportTerms) {
                    layer.setStyle({fillColor : usaidLightBlue})
                }
                else {
                    layer.setStyle({fillColor : 'gray'})
                }
            }
            

            else if (terms == '' && supportFilter != "none"){

                if(layer.feature.properties[supportFilter] >= 1 && containsSupportTerms) {
                    layer.setStyle({
                        fillColor : usaidLightBlue
                    });
                }
                else {
                    layer.setStyle({fillColor : 'gray'})
                }

            }
            
            else{
                //loop through the terms selected
                let counter = 0;
                let arrayLength = terms.length;
                
                for (let i = 0; i < arrayLength; ) {
                    
                    let term = terms[i];

                    if (layer.feature.properties[term]){ //check if object has term
                        
                        // note this could be improved with keys on the objects    
                        // counter is iterated when a match occurs                   
                        if (supportFilter == 'preprimary' && layer.feature.properties[term][0] == 1 ) {
                            counter++;
                        }
                        if (supportFilter == 'primary' && layer.feature.properties[term][1] == 1 ) {
                            counter++;
                        }
                        if (supportFilter == 'secondary' && layer.feature.properties[term][2] == 1 ) {
                            counter++;
                        }
                        if (supportFilter == 'wfdsupport' && layer.feature.properties[term][3] == 1 ) {
                            counter++;
                        }
                        if (supportFilter == 'systems' && layer.feature.properties[term][4] == 1 ) {
                            counter++;
                        }

                    }

                    i++ //add to i

                    //if it gets to the end, and all agencies have the selected terms  
                    //if counter matches the number of terms
                    if (i == arrayLength && i == counter){
                        if (i == arrayLength && counter == arrayLength ){
                            console.log (i + '  --> ' + arrayLength);
                            layer.setStyle({fillColor : usaidLightBlue});
                        }
                    }
                    
                    else {
                        layer.setStyle({fillColor : 'gray'})
                    }
    

                }//end for

            }

        });

    }

    //on change filter

    // On change check the other boxes if they are checked or not
    // Then check against other formulae
    $('#support-filter').on('change', function() {
        changeFilter();
    });

    // Controls
    $(".map1").click(function() {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        $("#country-wrapper").removeClass("hiding");
        $("#projects-wrapper").removeClass("hiding");
        $(".legend").hide();
        $(".legend2").show();
        $(".mapfilter").show();
        changeFilter();
    });

    $(".map2").click(function() {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        $(".map-countries").removeClass("detailedmap");
        $("#country-wrapper").addClass("hiding");
        $("#projects-wrapper").addClass("hiding");
        $(".legend").show();
        $(".legend2").hide();
        $(".mapfilter").hide();
        geojson.eachLayer(function (layer) {
            layer.setStyle(colorstyle(layer.feature));
        });
    });
    

    $(".map-countries").hover(function() {
        $(this).addClass("hover");
    });

    $(".map-countries").click(function() {
        $(this).addClass("selected");
    });

    });//end $.getJSON(jsonlink, function (data) {

    // leafletjs init map
    let map = L.map('map').setView([0, 0], 2);

    // load a tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        maxZoom: 17,
        minZoom: 1
    }).addTo(map);

    let solidStyle = {
        color: "#fff",
        fillOpacity: 1,
        opacity: 0.5,
        weight: 2,
        className: "map-countries",
    };

    let detailedBaseStyle = {
        color: "#fff",
        fillColor: "gray",
        fillOpacity: 1,
        opacity: 0.5,
        weight: 1,
        className: "map-countries",
    };

    //style when selected
    let selectStyle = {
        color: usaidRed,
        className : "select-test",
        weight: 1.5
    }

    /* Legend specific */
    var legend = L.control({ position: "bottomleft" });

    legend.onAdd = function(map) {
        var legendKey = L.DomUtil.create("div", "legend");
        legendKey.innerHTML += "<h4>Number of Supporting Agencies</h4>";
        legendKey.innerHTML += '<i style="background: #002F6C"></i><span>5</span><br>';
        legendKey.innerHTML += '<i style="background: #516692"></i><span>4</span><br>';
        legendKey.innerHTML += '<i style="background: #6b83ae"></i><span>3</span><br>';
        legendKey.innerHTML += '<i style="background: #8ba3cb"></i><span>2</span><br>';
        legendKey.innerHTML += '<i style="background: #aec7eb"></i><span>1</span><br>';
                
        return legendKey;
    };

    var legend2 = L.control({ position: "bottomleft" });

    legend2.onAdd = function(map) {
        var legendKey2 = L.DomUtil.create("div", "legend2");
        legendKey2.innerHTML += '<i style="background: #A7C6ED"></i><span>Highlighted country contains the agencies & education levels you selected.</span><br>';
                    
        return legendKey2;
    };

    legend.addTo(map);
    legend2.addTo(map);

    /* Filter Specific */
    var mapfilters = L.control({ position: "bottomright" });

    mapfilters.onAdd = function(map) {
        var filtercontrol = L.DomUtil.create('div', 'mapfilter');
        filtercontrol.innerHTML += '<h4>Agencies</h4>';
        filtercontrol.innerHTML += '<input type="checkbox" id="dol" name="dol" value="1"><label for="vehicle1">DOL</label><br>';
        filtercontrol.innerHTML += '<input type="checkbox" id="mcc" name="mcc" value="1"><label for="vehicle1">MCC</label><br>';
        filtercontrol.innerHTML += '<input type="checkbox" id="pc" name="pc" value="1"><label for="vehicle1">PC</label><br>';
        filtercontrol.innerHTML += '<input type="checkbox" id="usdos" name="usdos" value="1"><label for="vehicle1">State</label><br>';
        filtercontrol.innerHTML += '<input type="checkbox" id="usaid" name="usaid" value="1"><label for="vehicle1">USAID</label><br>';
        filtercontrol.innerHTML += '<input type="checkbox" id="usda" name="usda" value="1"><label for="vehicle1">USDA</label><br></br>';
        filtercontrol.innerHTML += '<select id="support-filter"><option value="none">None Selected</option><option value="preprimary">Pre-Primary</option><option value="primary">Primary</option><option value="secondary">Secondary</option><option value="wfdsupport">WFD Support</option><option value="systems">Systems Strengthening</option></select>';

        return filtercontrol;
    };

    mapfilters.addTo(map);

});