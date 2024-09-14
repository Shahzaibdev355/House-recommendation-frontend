import { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./MapComponent";

//import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Spinner } from "react-bootstrap"; // Import Spinner component

// Fix the missing default icon issue with Leaflet in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HomeCheck = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);

  const [loading, setLoading] = useState(true); // State for states loading

  const [loadingResults, setLoadingResults] = useState(false); // State for results loading

  const [formData, setFormData] = useState({
    PRICE: "",
    BEDS: "",
    BATH: "",
    STATE: "",
    PROPERTYSQFT: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target; // id and value from the event target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value, // Update the corresponding form field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setResults([]);
    setError("");
    setLoadingResults(true); // Show loader when request starts

    axios
      .post("https://double-georgena-shahzaibdev355-376d2bcf.koyeb.app/predict", formData)
      .then((response) => {
        // const sortedResults = response.data.sort((a, b) => a.Price - b.Price);
        // setResults(sortedResults);
        setResults(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "An error occurred.");
      })
      .finally(() => {
        setLoadingResults(false); // Hide loader when request completes
      });
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data

    axios
      .get("https://double-georgena-shahzaibdev355-376d2bcf.koyeb.app/states")
      .then((response) => {
        // Directly use response.data since axios handles JSON parsing
        const stateList = response.data;
        setStates(stateList);
      })
      .catch((error) => console.error("Error fetching states:", error))

      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, []);

  return (
    <>
      <h3>House Recommendation System For New York</h3>

      <div className="search-header shadow p-4 mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-center justify-content-center mb-4">
            <div className="col-md-5">
              <div className="form-group">
                <input
                  className="form-control"
                  id="PRICE"
                  type="text"
                  placeholder="Enter Anual Income ($)..."
                  value={formData.PRICE}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <input
                  className="form-control"
                  id="PROPERTYSQFT"
                  type="text"
                  placeholder="Enter Property Sqrt..."
                  value={formData.PROPERTYSQFT}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center mb-3">
            <div className="col-lg-4">
              {/* <select
                className="form-select"
                name="State"
                id="STATE"
                value={formData.STATE}
                onChange={handleChange}
              >
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select> */}

              {loading ? (
                <Spinner animation="border" />
              ) : (
                <select
                  className="form-select"
                  name="State"
                  id="STATE"
                  value={formData.STATE}
                  onChange={handleChange}
                >
                  
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="col-lg-4">
              {/* <label htmlFor="categories">Categories</label> */}
              <select
                className="form-select"
                name="BEDS"
                id="BEDS"
                value={formData.BEDS}
                onChange={handleChange}
              >
                <option value="Select Bedrooms">Select Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="col-lg-4">
              {/* <label htmlFor="categories">Categories</label> */}
              <select
                className="form-select"
                name="BATH"
                id="BATH"
                value={formData.BATH}
                onChange={handleChange}
              >
                <option value="Select Bedrooms">Select Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          <div className="col-lg-2 m-auto">
            <button className="btn btn-primary w-100 mt-4">Search</button>
          </div>
        </form>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loadingResults ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : results.length > 0 ? (
        <div className="container">
          {results.map((result, index) => (
            <div className="box" key={index}>
              <div className="to">
                <MapComponent
                  latitude={result.Longitute}
                  longitude={result.Latitude}
                  address={result.Address}
                />
              </div>

              <div className="bottom">
                <h3>{result.Address}</h3>
                <p>
                  Enchanting three bedrooms, three bath home with spacious one
                  bedroom, one bath...
                </p>
                <div className="advants">
                  <div>
                    <span>Bedrooms</span>
                    <div>
                      <i className="fas fa-th-large" />
                      <span> {result.Beds}</span>
                    </div>
                  </div>
                  <div>
                    <span>Bathrooms</span>
                    <div>
                      <i className="fas fa-shower" />
                      <span> {result.Baths}</span>
                    </div>
                  </div>
                  <div>
                    <span>Area</span>
                    <div>
                      <i className="fas fa-vector-square" />
                      <span>
                        {result.PropertySqrt}
                        <span>Sq Ft</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <span>For Sale</span>
                  <span>${result.Price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      
    </>
  );
};

export default HomeCheck;
