
const CARTO_KEY = 'cb1_4unk_1_0e5dad60e26a5401d70f3ed5';


let map = L.map('map', {zoomControl: false});

map.setView([38, -96], 4);

// attributions

const OSM = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ESRI = 'Tiles &copy; Esri';
const USGS = 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>';

// the tile layers: each entry has the tile URL and options, plus the text for the info window

const tile_defs = [
    {
        name: 'OpenStreetMap: Standard',
        provider: 'OpenStreetMap Foundation',
        link: 'https://www.openstreetmap.org/',
        theme: 'Streets',
        description: 'The classic OpenStreetMap map. It is drawn from data that a worldwide community of volunteers collects and edits.',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {maxZoom: 19, attribution: OSM}
    },
    {
        name: 'OpenStreetMap: Black & white',
        provider: 'OpenStreetMap Foundation',
        link: 'https://www.openstreetmap.org/',
        theme: 'Black and white, high contrast',
        description: 'The standard OpenStreetMap tiles turned into a stark, high contrast black and white map.',
        note: 'Effect: the same OpenStreetMap tiles recolored in your browser with a CSS filter.',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {maxZoom: 19, attribution: OSM, className: 'tiles-bw'}
    },
    {
        name: 'CyclOSM: Cycling',
        provider: 'CyclOSM (hosted by OpenStreetMap France)',
        link: 'https://www.cyclosm.org/',
        theme: 'Cycling',
        description: 'An open-source bicycle map. It highlights cycle routes and bike lanes, and shows the things a cyclist looks for, like shops and shelters.',
        url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        options: {
            maxZoom: 19,
            attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: ' + OSM
        }
    },
    {
        name: 'OPNVKarte: Public transport',
        provider: 'MeMoMaps',
        link: 'https://memomaps.de/',
        theme: 'Public transport',
        description: 'A map built around public transport. Rail, subway, tram and bus lines are drawn as color-coded routes.',
        url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
        options: {
            maxZoom: 19,
            maxNativeZoom: 18,
            attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data ' + OSM
        }
    },
    {
        name: 'OpenTopoMap: Topographic',
        provider: 'OpenTopoMap',
        link: 'https://opentopomap.org/',
        theme: 'Topographic',
        description: 'A topographic map with contour lines and shaded hills, based on OpenStreetMap data and SRTM elevation data. Good for hiking.',
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        options: {
            maxZoom: 19,
            maxNativeZoom: 17,
            attribution: 'Map data: ' + OSM + ', <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
    },
    {
        name: 'USGS: US Topo',
        provider: 'U.S. Geological Survey (The National Map)',
        link: 'https://www.usgs.gov/',
        theme: 'Topographic',
        description: 'Topographic maps from the U.S. Geological Survey, with contours, water, roads and place names.',
        note: 'Coverage: the United States.',
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        options: {maxZoom: 19, maxNativeZoom: 16, attribution: USGS}
    },
    {
        name: 'Esri: World Shaded Relief',
        provider: 'Esri',
        link: 'https://www.esri.com/',
        theme: 'Terrain relief',
        description: 'A hillshade view of the land surface, where mountains and valleys are shown with light and shadow and no labels.',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        options: {maxZoom: 19, maxNativeZoom: 13, attribution: ESRI + ' &mdash; Source: Esri'}
    },
    {
        name: 'Esri: World Imagery',
        provider: 'Esri',
        link: 'https://www.esri.com/',
        theme: 'Satellite',
        description: 'Satellite and aerial photos of the whole world, with the sharpest images in and around cities.',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: {
            maxZoom: 19,
            attribution: ESRI + ' &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
    },
    {
        name: 'USGS: US Imagery',
        provider: 'U.S. Geological Survey (The National Map)',
        link: 'https://www.usgs.gov/',
        theme: 'Satellite',
        description: 'Aerial and satellite imagery served by the U.S. Geological Survey.',
        note: 'Coverage: best in the United States.',
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
        options: {maxZoom: 19, maxNativeZoom: 16, attribution: USGS}
    },
    {
        name: 'Esri: National Geographic',
        provider: 'Esri',
        link: 'https://www.esri.com/',
        theme: 'Reference map',
        description: 'A world reference map in the muted, painterly style of National Geographic, with shaded terrain and soft colors.',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
        options: {
            maxZoom: 19,
            maxNativeZoom: 16,
            attribution: ESRI + ' &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
        }
    },
    {
        name: 'Esri: Ocean Basemap',
        provider: 'Esri',
        link: 'https://www.esri.com/',
        theme: 'Ocean',
        description: 'A map of the sea floor. Colors show ocean depth (bathymetry), with undersea features and marine place names.',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
        options: {
            maxZoom: 19,
            maxNativeZoom: 13,
            attribution: ESRI + ' &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
        }
    },
    {
        name: 'NASA GIBS: Earth at Night',
        provider: 'NASA Global Imagery Browse Services (GIBS)',
        link: 'https://earthdata.nasa.gov',
        theme: 'Night lights',
        description: 'The Earth after dark. This is a 2012 composite of city lights seen by the VIIRS instrument on a satellite, so bright areas show where people live.',
        note: 'The source images stop at zoom 8, so closer views are enlarged and blurry.',
        url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default//GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
        options: {
            minZoom: 1,
            maxZoom: 19,
            maxNativeZoom: 8,
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
        }
    },
    {
        name: 'CARTO: Dark Matter',
        provider: 'CARTO',
        link: 'https://carto.com/basemaps/',
        theme: 'Dark mode',
        description: 'A dark gray map made so that bright data stands out against it. It is a popular choice for dark mode apps.',
        needsKey: true,
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=' + CARTO_KEY,
        options: {
            subdomains: 'abcd',
            maxZoom: 19,
            attribution: OSM + ' &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
    },
    {
        name: 'CARTO: Positron',
        provider: 'CARTO',
        link: 'https://carto.com/basemaps/',
        theme: 'Light, minimal',
        description: 'A very pale, minimal gray map. Its quiet colors make it a good background for data.',
        needsKey: true,
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=' + CARTO_KEY,
        options: {
            subdomains: 'abcd',
            maxZoom: 19,
            attribution: OSM + ' &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
    }
];

// the tile layer shown when the page opens

const default_layer = 'Esri: National Geographic';

// building the tile layers

const base_layers = {};
const layer_info = {};

tile_defs.forEach(def => {
    base_layers[def.name] = L.tileLayer(def.url, def.options);
    layer_info[def.name] = def;
});

// layers control

let layer_control = L.control.layers(base_layers, null, {
    collapsed: false
}).addTo(map);

// info window: describes the tile layer that is chosen

let info = L.control({position: 'topleft'});

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    L.DomEvent.disableClickPropagation(this._div);
    L.DomEvent.disableScrollPropagation(this._div);
    return this._div;
};

info.update = function(def) {
    let note = def.note || '';
    if (def.needsKey && CARTO_KEY.startsWith('PASTE_'))
        note = 'This layer needs a free CARTO API key. Paste it into CARTO_KEY at the top of mapping-tiles.js.';

    this._div.innerHTML = `<h4>${def.name}</h4>
        <p><b>Provider:</b> <a href="${def.link}" target="_blank" rel="noopener">${def.provider}</a></p>
        <p><b>Theme:</b> ${def.theme}</p>
        <p>${def.description}</p>
        ${note ? `<p class="note">${note}</p>` : ''}
        <p class="hint">Zoom with the mouse wheel, a double-click, or a pinch.</p>`;
};

info.addTo(map);

// show the default layer, and update the info window each time a layer is chosen

base_layers[default_layer].addTo(map);
info.update(layer_info[default_layer]);

map.on('baselayerchange', e => {
    info.update(layer_info[e.name]);
});
