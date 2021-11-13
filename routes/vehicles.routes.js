const fs = require("fs");
const { Router } = require("express");
const router = Router();

// /api/all
router.get("/all", (req, res) => {
  try {    
    
    let vehicles = getJsonFromFile();
    console.log("Server: Vehicles");
    res.status(201).json(vehicles);
   
  } catch (error) {
    res.status(500).json({ message: "Something going wrong!" });
  }
});

// /api/area
router.post("/area", (req, res) => {
  try {
    
    console.log("Server: Area");
    const { sw, ne } = req.body;
    console.log("Server: SW => ", sw);
    console.log("Server: NE=> ", ne);
    let vehicles = getJsonFromFile();
    
    let vehiclesInArea = vehicles.filter((element)=>{
      if (element.location.lat < ne.lat && 
          element.location.lat > sw.lat && 
          element.location.lng < ne.lng && 
          element.location.lng > sw.lng) 
          {
            return element;
      }     
    });
    //console.log("Server: vehiclesInArea => ", vehiclesInArea);    
    
    res.status(201).json(vehiclesInArea);
        
  } catch (error) {
    res.status(500).json({ message: "Something going wrong!" });
  }
});

function getJsonFromFile() {
  try {
    let rawdata = fs.readFileSync("./data/vehicles-location.json", "utf-8");
    // console.log("Rawdata");
    let jsonFile = JSON.parse(rawdata);
    // console.log("JS");
    return jsonFile;
  } 
  catch (error) {
    console.log("Error: ", error);
  }
}

module.exports = router;
