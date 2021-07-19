$(document).ready(function () {

    /*
     * Install Note: connect to data.json if csv to JSON is not working   
     */

    //jsonlink is being called to in header
    //let jsonlink = 'scripts/data.json';

    let prevLayerClicked = null;
    let prevPinClicked = null;

    let mapType = "overview";
    let usaidRed = "#BA0C2F";

    $.getJSON(jsonlink, function (data) {
        let countries = [];
        let countries2 = [];

        // console.log(data);
        
        $.each(data, function(i, item) {
			let name = data[i].name;
			let description = data[i].description;
            let country = data[i].Country;
            let support = data[i]["Support List"];
            let supportnum = data[i]["Number of Supporting Agencies"];
            countries.push(country);
            countries2.push([country, supportnum]);
        });

        console.log(countries2);

        let countriesList = [...new Set(countries)];
        let countriesList2 = [...new Set(countries2)];

        /* Build Select List */
        let countrySelect = '<option name="none">Select Country or Region</option>';

        let arrayLength = countriesList.length;

        for (let i = 0; i < arrayLength; i++) {
            let currentCountry = countriesList[i]
            countrySelect +=  '<option value="' + currentCountry/*.toLowerCase()*/ + '">' + currentCountry + '</option>';
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
            // supportArr.push(["Agency", 0]);
            supportArr.push(["Pre-Primary Education Support", 0]);
            supportArr.push(["Primary Education Support", 0]);
            supportArr.push(["Secondary Education Support", 0]);
            supportArr.push(["Post-Secondary Education Support", 0]);
            supportArr.push(["WFD Support List", 0]);
            supportArr.push(["Systems Strengthening Support", 0]);

            var support0 = 0;
            var support1 = 0;
            var support2 = 0;
            var support3 = 0;
            var support4 = 0;
            var support5 = 0;

            function supportTest(support0, support1, support2, support3, support4, support5) {
                this.support0 = support0;
                this.support1 = support1;
                this.support2 = support2;
                this.support3 = support3;
                this.support4 = support4;
                this.support5 = support5;
              }
            
            var supportBar = new supportTest (0, 0, 0, 0, 0, 0);

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
            coordArr.push(["Sharing Data", 0]);
            coordArr.push(["Research", 0]);
            coordArr.push(["Guidance", 0]);
            coordArr.push(["Cross-Agency Trainings", 0]);
            coordArr.push(["Cross-Agency Education Meetings", 0]);


            var usda  = 'none';
            var usdol = 'none';
            var usdos = 'none';
            var mcc = 'none';
            var uspc = 'none';
            var usaid = 'none';


            //set vars
            var indexsplice = '0';

            // console.log (coordArr);

            let count = $(data).length;
            $.each(data, function(i, item) {

                let country = data[i].Country;
                let agencysupport = data[i]["Agency Support"]; 

                let agency = '';

                if (country == selectedCountry && agencysupport == 1) {

                    console.log(country);

                    //create variables
                    agency += data[i]["Agency"];
                    agencies += agency + ', ';

                    if (data[i]["Pre-Primary Education Support"] == 1) { support0 = 1 };
                    if (data[i]["Primary Education Support"] == 1) { support1 = 1 };
                    if (data[i]["Secondary Education Support"] == 1) { support2 = 1 };
                    if (data[i]["Post-Secondary Education Support"] == 1) { support3 = 1 };
                    if (data[i]["WFD Support List"] == 1) { support4 = 1 };
                    if (data[i]["Systems Strengthening Support"] == 1) { support5 = 1 };     

                    var supportFoo = new supportTest(support0, support1, support2, support3, support4, support5);

                    if (agency == 'U.S. Department of Agriculture'){ alias = 'usda'} 
                    if (agency == 'U.S. Department of Labor'){ alias = 'usdol'} 
                    if (agency == 'U.S. Department of State'){ alias = 'usdos'} 
                    if (agency == 'Millennium Challenge Corporation'){ alias = 'mcc'} 
                    if (agency == 'U.S. Peace Corps'){ alias = 'uspc'} 
                    if (agency == 'USAID'){ alias = 'usaid'} 
                    

                    if (agency == 'U.S. Department of Agriculture')     { indexsplice = 0 }
                    if (agency == 'U.S. Department of Labor')           { indexsplice = 1 } 
                    if (agency == 'U.S. Department of State')           { indexsplice = 2 } 
                    if (agency == 'Millennium Challenge Corporation')   { indexsplice = 3 } 
                    if (agency == 'U.S. Peace Corps')                   { indexsplice = 4 } 
                    if (agency == 'USAID')                              { indexsplice = 5 } 

                    // supportHolder.push(["usda", 0, supportBar]);

                    var toholder = [alias, 1,  supportFoo];
                    supportHolder.splice(indexsplice, 1, toholder);

                    // console.log(supportHolder);

                    // Replace 1 array element at index with item 
                    // arr.splice(index,1,item);

                    //eval('var ' + alias + '= new supportTest(country, agency, support0, support1, support2, support3, support4, support5);');

                    // usaid = new supportTest(country, agency, support0, support1, support2, support3, support4, support5);

                    console.log (alias);
                    // U.S. Department of Agriculture
                    // U.S. Department of Labor
                    // U.S. Department of State
                    // Millennium Challenge Corporation
                    // U.S. Peace Corps
                    // USAID

                    // usda
                    // usdol
                    // usdos
                    // mcc
                    // uspc
                    // usaid

                    // console.log(supportFoo);

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

                    // let name = data[i]["Agency"];
                    // let description = data[i].description;
                    // let start = data[i].start;
                    // let end = data[i].end;
                    // let implementorname = data[i].implementorname;
                    // let subawardees = data[i].subawardees;
                    // let link = data[i].link;

                    // add to result
                    // programResult += '<div class="wrap"><h2 class="project-name">' + name + '</h2>';
                    // programResult += '<div><span class="project-description">' + description + '</span>';
                    // programResult += '<span class="project-dates">' + start + ' &ndash; ' + end + '</span>';
                    // if (implementorname!='') { programResult += '<span class="project-implementorname"><strong>Implementor:</strong> ' + implementorname + '</span>';}
                    // if (subawardees!='') { programResult += '<span class="project-subawardees"><strong>Subawardees:</strong> ' + subawardees + '</span>';}
                    // if (link!='') { programResult += '<br><span class="project-subawardees"><a href="' + link + '" target="_blank" title="Link opens in a new window">Link to Project</a></span>';}
                    // programResult += '</div></div>';

                    // console.log ("support first ->" + support0);

                    // // add to result
                    // programResult += '<div class="wrap"><h2 class="project-name">' + name + '</h2>';
                    // programResult += '<div><span class="project-description">' + description + '</span>';
                    // programResult += '<span class="project-dates">' + start + ' &ndash; ' + end + '</span>';
                    // if (implementorname!='') { programResult += '<span class="project-implementorname"><strong>Implementor:</strong> ' + implementorname + '</span>';}
                    // if (subawardees!='') { programResult += '<span class="project-subawardees"><strong>Subawardees:</strong> ' + subawardees + '</span>';}
                    // if (link!='') { programResult += '<br><span class="project-subawardees"><a href="' + link + '" target="_blank" title="Link opens in a new window">Link to Project</a></span>';}
                    // programResult += '</div></div>';
                }


                //executed at the end of the loop
                if (i+1 === count) {
                    agencies = agencies.replace(/,\s*$/, "");


                    let supporttable = "";
                    // //iterate through coordination array
                    // for (var i = 0; i < coordArr.length; i++){
                    //     supporttable += '<div class="support-column">';
                    //     for (var j = 0; j < coordArr[i].length; j++){
                    //         if (j == 1) {
                    //             if (coordArr[i][j] > 0){ supporttable += '<div class="support-cell support-checked">' + 'X' + '</div>'; }
                    //             else{ supporttable += '<div class="support-cell support-unchecked">' + '<!--None-->' + '</div>'; }
                    //         }
                    //         else { supporttable += '<div class="support-header">' + coordArr[i][j] + '</div>'; }
                    //     }
                    //     supporttable += '</div>';
                    // }
                    // supporttable += '</div>';
                    

                    // <table>
                    //     <tr>  </tr>
                    // </table>

                    supporttable += '<table class="support-table rtable rtable--flip"><tr>';
                    supporttable += '<th class="top-left"> </th>';
                    supporttable += '<th>Pre-Primary Education Support</th>';
                    supporttable += '<th>Primary Education Support</th>';
                    supporttable += '<th>Secondary Education Support</th>';
                    supporttable += '<th>Post-Secondary Education Support</th>';
                    supporttable += '<th>WFD Support List</th>';
                    supporttable += '<th>Systems Strengthening Support</th>';      

                    supporttable += '</tr>';

                    supporttable += '<tr>';                
                    // supporttable += '<td class="support-row-header">Pre-Primary Education Support</th>';
                    supporttable += '<td class="support-row-header">' + supportHolder[0][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[0][2])) {
                        // supporttable += '<td>' + value + '</td>';
                        supporttable += '<td>' + testguy(value) + '</td>';
                    }
                    supporttable += '</tr>';

                    supporttable += '<tr>';                
                    // supporttable += '<td class="support-row-header">Primary Education Support</th>';
                    supporttable += '<td class="support-row-header">' + supportHolder[1][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[1][2])) {
                        supporttable += '<td>' + testguy(value) + '</td>';
                    }
                    supporttable += '</tr>';

                    supporttable += '<tr>';                
                    // supporttable += '<td class="support-row-header">Secondary Education Support</td>';
                    supporttable += '<td class="support-row-header">' + supportHolder[2][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[2][2])) {
                        supporttable += '<td>' + testguy(value) + '</td>';
                      }
                    supporttable += '</tr>';

                    supporttable += '<tr>';                
                    // supporttable += '<td class="support-row-header">Post-Secondary Education Support</td>';
                    supporttable += '<td class="support-row-header">' + supportHolder[3][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[3][2])) {
                        supporttable += '<td>' + testguy(value) + '</td>';
                    }
                    supporttable += '</tr>';

                    supporttable += '<tr>';                
                    // supporttable += '<td class="support-row-header">WFD Support List</td>';
                    supporttable += '<td class="support-row-header">' + supportHolder[4][0] + '</td>';
                    for (const [key, value] of Object.entries(supportHolder[4][2])) {
                        supporttable += '<td>' + testguy(value) + '</td>';
                        }
                    supporttable += '</tr>';

                    supporttable += '<tr>';                
                    // supporttable += '<td class="support-row-header">Systems Strengthening Support</td>';        
                    supporttable += '<td class="support-row-header">' + supportHolder[5][0] + '</th>';
                    for (const [key, value] of Object.entries(supportHolder[5][2])) {
                        supporttable += '<td>' + testguy(value) + '</td>';
                        }   
                    supporttable += '</tr>';


                    supporttable += '</table>';


                    function testguy(value){
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
                    // countryResult += '<p>Coordination List: <br>' + coordinationlist + '</p>';


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

$.getJSON(jsonlink2, function (data2) {
    //iterate thru
    let count2 = $(data2).length;
    $.each(data2, function(i, item) {
        // let country2 = data2[i].country;
        let country2 = data2[i]["Country"];
        // console.log(selectedCountry)
        

        if (country2 == selectedCountry) {
            // console.log("Country == second data set ->> "+ country2);

            //create variables
            let name = data2[i]["Activity Name"];
            let description = data2[i]["Description"];
            let start = data2[i]["Start Year"];
            let end = data2[i]["End Year"];
            let implementorname = data2[i]["Implementer"];
            let subawardees = data2[i].subawardees;
            let link = data2[i]["Link to Website"];
            let eduLevels = "";

            // console.log(name);

            // add to result
            programResult += '<div class="wrap"><h2 class="project-name">' + name + '</h2>';

            programResult += '<div><span class="project-description">';
            // programResult += data2[i]["Country"] + '<br>';
            programResult += description + '</span>';
            
            programResult += '<span class="project-dates">' + start + ' &ndash; ' + end + '</span>';
            programResult += '<span class="project-agency"><strong>Agency:</strong> ' + data2[i]["Agency"] + '</span>';
            if (implementorname!='') { programResult += '<span class="project-implementorname"><strong>Implementor:</strong> ' + implementorname + '</span>';}
            // if (subawardees!='') { programResult += '<span class="project-subawardees"><strong>Subawardees :</strong> ' + subawardees + '</span>';
			// }
            
            
            var educationLevels = '';
            
            checkEduLevel(data2[i]["Pre-Primary"], 'Pre-Primary');
            checkEduLevel(data2[i]["Primary"], 'Pre-Primary');
            checkEduLevel(data2[i]["Secondary"], 'Secondary');
            checkEduLevel(data2[i]["Workforce Development"], 'Workforce Development');
            checkEduLevel(data2[i]["Education Systems Strengthening"], 'Education Systems Strengthening');
            
            if (educationLevels){
                programResult += '<span class="project-edulevel"><strong>Education Level:</strong> ';
                educationLevels = educationLevels.replace(/,\s*$/, ""); //remove final comma
                programResult += educationLevels;
            }
            
            console.log(educationLevels);

            programResult += '</span>';

            if (link!='') { programResult += '<br><span class="project-subawardees"><a href="' + link + '" target="_blank" title="Link opens in a new window">Link to Project</a></span>';}

            programResult += '<div>';

            programResult += eduLevels;
            programResult += '</div>';

            programResult += '</div></div>';


        }
        if (i+1 === count2) {
        // if (i+1 === count) {
            // console.log ("result has been added!!!!");
            $("#projects-wrapper").html(programResult);
            //create accordian
            $("#projects-wrapper" ).accordion({
                animate: 200,
                header: '> div.wrap > h2',
                heightStyle: "content",
                collapsible: true,
                active: false, //collapse all panels
            });
        
        }
        
        // var eduLevels = [];
        function checkEduLevel(check, title, addTo){
            if (check.toUpperCase() == "X"){
                // programResult += title + ', ';
                educationLevels += title + ', ';
                
                // console.log("it worked!!! " + addTo);
            }
            return educationLevels;
            // return eduLevels;
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
                    }
                    // layer.setStyle({ 'fillColor' : usaidRed });
                    // layer.setStyle({ fillOpacity: .7});
                    layer.setStyle(selectStyle);
                    console.log(layer);
                    prevLayerClicked = layer;                    
                }

                if (prevPinClicked !== null){
                    prevPinClicked.setIcon(pinIcon);
                }
            })
        });
        
        let othercountries = '';
        
        console.log(countriesMap);



        //iterate through countriesMap variable
        if (mapType == 'overview'){
        console.log("overview");

            var geojson = L.geoJSON(countriesMap, {style: solidStyle, onEachFeature: onEachFeature})
            .eachLayer(function (layer) {
                let thislayercountry = layer.feature.properties.name;

                if (exists(countriesList2, thislayercountry) ){ //checking 2 dim array    
                    layer.addTo(map) //adds countries to map
                    countriesList2.forEach(e => {

                        if (e[0] == thislayercountry) {
                            console.log(layer);
                            layer.setStyle({ "fillColor": getColor(e[1])}); //set color based on second value in array via getColor fn
                            // layer.setStyle(testStyle);
                            console.log(e[1]);
                            layer.bindTooltip('<strong>' + layer.feature.properties.name + '</strong>' + '<br>Number of Supporting Agencies: ' + e[1]);
                        }

                    });
                }

                // if (countriesList.includes(thislayercountry)){
                //     layer.addTo(map)
                // }

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
        function clickFeature(e) {
            let layer = e.target;

            layer.setStyle({ "fillColor": usaidRed })

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
            if (prevLayerClicked !== null) {
                prevLayerClicked.setStyle(solidStyle);
            }
            prevLayerClicked = layer;
        }
        
        function resetHighlight(e) {
            let layer = e.target;
            // layer.setStyle({ color: '#fff' });
        }

        function highlightFeature(e) {
            let layer = e.target;
            // layer.bringToFront();

            console.log("highlight");
            // layer.setStyle({ color: usaidRed});

            // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            //     layer.bringToFront();
            // }
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        }

        function onClickMap(e) {
            e.layer._icon.classList.add('activemarker');
        }

        function getColor(d) {
            return  d == 1 ? '#aec7eb' :
                    d == 2 ? '#8ba3cb' :
                    d == 3 ? '#6b83ae' :
                    d >= 4 ? '#516692' :
                            'rgb(80, 101, 148)'; //none?
        }
        
        //sample
        function solidStyle2(feature) {
            return {
                "color": "#fff",
                "fillColor": "#A7C6ED",
                "fillOpacity": 1.0,
                "opacity": 1,
                "weight": 2,
                "className": "map-countries",
            };
        }


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
        "color": "#fff",
        // "fillColor": "#A7C6ED",
        
        "fillOpacity": 1,
        "opacity": 0.5,
        "weight": 2,
        "className": "map-countries",
    };

    //style when selected
    let selectStyle = {
        "color" : usaidRed,
        className : "select-test"
    }


    /*Legend specific*/
    var legend = L.control({ position: "bottomleft" });

    legend.onAdd = function(map) {
        var legendKey = L.DomUtil.create("div", "legend");
        legendKey.innerHTML += "<h4>Number of Supporting Agencies</h4>";
        legendKey.innerHTML += '<i style="background: #516692"></i><span>1</span><br>';
        legendKey.innerHTML += '<i style="background: #6b83ae"></i><span>2</span><br>';
        legendKey.innerHTML += '<i style="background: #8ba3cb"></i><span>3</span><br>';
        legendKey.innerHTML += '<i style="background: #aec7eb"></i><span>4</span><br>';
                
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

    // Controls
    
    $(".map1").click(function() {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        console.log( "Map1 selected" );
        $(".map-countries").removeClass("detailedmap");
        $("#country-wrapper").removeClass("show");
        $("#projects-wrapper").removeClass("show");
        $(".legend").show();
        $(".legend2").hide();
    });
    
    $(".map2").click(function() {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        console.log("Map2 selected." );
        $(".map-countries").addClass("detailedmap");
        $("#country-wrapper").addClass("show");
        $("#projects-wrapper").addClass("show");        
        $(".legend").hide();
        $(".legend2").show();
    });

    $(".map-countries").hover(function() {
        $(this).addClass("hover");
    });

    $(".map-countries").click(function() {
        $(this).addClass("selected");
        // $(this).siblings().removeClass("selected");
        console.log("click");
    });





});