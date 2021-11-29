# USG Map Instructions


## Install

1. Upload all the files in the `/scripts` folder to the server.

3. Add this to the `<head>` to call Jquery, Jquery UI, and Leaflet.
(You may need to remove Jquery if it's already being called by the page and causing a conflict):
\*(Note this is the same as the HE Map.) 

        <!-- Jquery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>

        <!-- Jquery UI -->
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
            integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="    
            crossorigin="anonymous"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <!-- Leaflet -->
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" 
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossorigin=""></script>
        <link rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossorigin=""/>

4. Then add lines in the `<head>` to call the files you've be uploading locally -- the Countries Geo Data, the map script & css -- modify the URLs here to match the URLs of the uploaded files (e.g. replace `scripts/`):

        <!-- HE Map Countries Geo Data -->
        <script type="text/javascript" src="scripts/countriesgeodata_usg.js"></script>

        <!-- HE Map Script & CSS -->
        <script type="text/javascript" src="scripts/map_script_usg.js"></script>
        <link rel="stylesheet" href="scripts/map_usg.css">

5. Then add these lines of code into the header following, modifying the url to match where you've uploaded them (e.g. again replace `scripts/`):

        <script>
           //HE Map - set these links to the location of these files:
           var jsonlink_country = 'scripts/data_country.json'; //Country info
           var jsonlink_activity = 'scripts/data_activity.json'; //Activity Info 
        </script>


6. Then where you want to insert the **map** in the `<body>` paste this code.
You can remove the H1 header text, but everything else should stay as-is:

        <!-- Begin HE Map -->
        <div class="he-wrapper usg-map">
            <h1>USG Support to Basic Education</h1>
            <div class="controls">
                <div class="map1 selected">Detailed View</div>
                <div class="map2">USG Support Overview</div>
            </div>

            <form id="countries">
                <select id="countries-select">
                    <option>Loading...</option>
                </select>
            </form>
            <div><a href="#country-wrapper" class="skip-link">Skip to results</a></div>
            <div class="he-map" id="map"></div>
            <div id="country-wrapper"></div>
            <div id="projects-wrapper"></div>
            <div><a href="#countries" class="skip-link">Back to country selector</a></div>
        </div>
        <!-- End HE Map -->

---

## Updating the Map Data

\* Note: this map has two different data sets, one similar to the HE map for country data, and another for activity data.  
1. After editing each original spreadsheet, export it as a `.csv`.
2. Then use a CSV to JSON converter (e.g. https://csvjson.com/csv2json) to convert it to a `.json`.
3. Replace the `data_country.json` or `data_activity.json` file.

---

## Troubleshooting additions to the map
### New Countries
If countries have been added to the map, and they aren't showing up on the map (only in the dropdown), you probably need to edit the GEO JSON file `countriesgeodata_usg.js`.

Edit the country name to match the one from the spreadsheet. Sometimes they are different.
