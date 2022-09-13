import { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "../Css/map.css";

function Map() {
  const center = { lat: 13.828253, lng: 100.5284507 }; //บางซื่อ
  const [selected, setSelected] = useState(center);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  // Create the places service.

  const Create_places = () => {
    if (map != null) {
      // eslint-disable-next-line no-undef
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(
        /// Set รัศมีพื้นที่โดยรอบ เเละประเภทของสภานที่
        { location: selected, radius: 200, type: "restaurant" },
        (results, status) => {
          if (status !== "OK" || !results) return;
          addPlaces(results);
        }
      );
    }
  };

  /// กำหนดรูปเเบบดึงข้อมูลรายการร้านอาหาร
  const addPlaces = (places) => {
    const placesList = document.getElementById("div_list");
    placesList.innerHTML = "";
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const li = document.createElement("li");
        li.id = "li_list_ID";
        li.className = "li_list";

        const image = document.createElement("img");
        image.setAttribute("height", 70);
        image.setAttribute("width", 80);
        image.className = "img_li";
        let place_Photos = place.photos;

        if (place_Photos) {
          image.setAttribute(
            "src",
            place_Photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }) /// ดึงรูปจาก Google Api ขึ้นอยู่กับข้อมูลว่าสถานที่นั้นมีรูปไหม
          );

          li.appendChild(image);
        }

        li.appendChild(document.createTextNode(place.name));
        placesList.appendChild(li);

        // Even เวลา Click  รายการร้านอาหาร
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location); // set center ทุกครั้งที่เลือกร้านอาหาร
          map.setZoom(20);

          /// Icon เวลา click รายการร้านอาหาร
          const svgMarker = {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            // eslint-disable-next-line no-undef
            anchor: new google.maps.Point(15, 30), ///ตำเเหน่งเวลาเเสดง Icon
          };

          // eslint-disable-next-line no-undef
          const marker = new google.maps.Marker({
            /// Set แผนที่ให้มีจุด Marker เเสดงที่มีมีร้านอาหาร เมื่อ Click list
            map: map,
            icon: svgMarker,
            position: place.geometry.location,
          });
        });
      }
    }
  };

  return (
    <>
      <Container style={{ maxWidth: "2560px" }}>
        <Row>
          <Col lg={9} md={12} sm={12}>
            <PlacesAutocomplete setSelected={setSelected} />

            {/*  Map Control */}
            <GoogleMap
              zoom={15}
              center={selected}
              mapContainerClassName="map-container"
              options={
                {
                  // zoomControl: false,
                  // mapTypeControl: boolean,
                  // scaleControl: boolean,
                  // streetViewControl: boolean,
                  // rotateControl: boolean,
                  // fullscreenControl: boolean
                }
              }
              onLoad={(map) => setMap(map)}
            ></GoogleMap>

            {Create_places()}
            {selected && (
              <MarkerF
                position={selected}
                options={{
                  map,
                  visible: true,
                  // eslint-disable-next-line no-undef
                  animation: google.maps.Animation.DROP,
                }}
              />
            )}
          </Col>

          <Col lg={3} md={12} sm={12} xs={12}>
            <p className="p_head_list">รายการร้านอาหาร</p>
            <ul id="places" className="Ul_list">
              <div
                style={{ overflow: "auto", width: "auto", height: "60vh" }}
                id="div_list"
              ></div>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const originRef = useRef();
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async () => {
    let address = originRef.current.value;
    //  console.log(MarkerMap.current.value);
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address }); //ดึงข้อมูลของสถานที่
    const { lat, lng } = await getLatLng(results[0]); //ดึงข้อมูลเส้น ละติจูด, ลองจิจูด
    console.log(address);
    setSelected({ lat, lng });
  };

  return (
    <>
      <Container>
        <Row style={{ width: "100%", height: "60px" }}>
          <Col
            lg={4}
            md={5}
            sm={5}
            xs={10}
            className=""
            style={{
              textAlign: "center",
              paddingRight: "0px",
              paddingLeft: "0px",
            }}
          >
            {/* Search ชื่อสถานที่ */}
            <Autocomplete>
              <input
                type="text"
                placeholder="Search an address"
                ref={originRef}
                className="combobox-input fa"
                defaultValue={"เขตบางซื่อ กรุงเทพมหานคร ประเทศไทย"}
              />
            </Autocomplete>
          </Col>

          <Col lg={8} md={7} sm={4} xs={2}>
            <button
              type="button"
              value="OK"
              onClick={handleSelect}
              className="btn_Search fa fa-search"
            ></button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const libraries = ["places"];
const MapContainer = () => {
  //console.log(process.env.REACT_APP_Google_MAP_Key);

  const { isLoaded } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_Google_MAP_Key,
    googleMapsApiKey: "Google API Key You",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div
        style={{ paddingLeft: "16px", marginBottom: "20px", marginTop: "20px" }}
      >
        <h2>Map Restaurants </h2>
      </div>
      <Map />
    </>
  );
};

export default MapContainer;
