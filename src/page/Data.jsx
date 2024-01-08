import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Data() {
  const [token, setToken] = useState("");
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [provinceChoice, setProvinceChoice] = useState(null);
  const [cityChoice, setCityChoice] = useState(null);

  // useEffect(()=>{
  //   setToken(localStorage.getItem("TOKEN"));
  //   console.log(token);
  // } , [])

  // const labeledProvince = province.map(())

  useEffect(() => {
    // const token = localStorage.getItem("TOKEN")

    async function fetchProvince() {
      try {
        const { data } = await axios.get(
          "http://rezayari.ir:5050/CityAndProvince/GetProvince",
          {
            headers: {
              accept: "text/plain",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ3MDM3MTksImlzcyI6InJlemF5YXJpLmlyIiwiYXVkIjoicmV6YXlhcmkuaXIifQ.K3PxktI2jpo7NKHRmpNxLYlucdWxH9-PqT6PBruabtM`,
            },
          }
        );
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCity() {
      try {
        const { data } = await axios.get(
          "http://rezayari.ir:5050/CityAndProvince/GetCity",
          {
            headers: {
              accept: "text/plain",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ3MDM3MTksImlzcyI6InJlemF5YXJpLmlyIiwiYXVkIjoicmV6YXlhcmkuaXIifQ.K3PxktI2jpo7NKHRmpNxLYlucdWxH9-PqT6PBruabtM`,
            },
          }
        );
        setCity(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCity();

    fetchProvince();
  }, []);

  const provinceHandler = (event, newValue, reason) => {
    console.log({ event, newValue, reason });
    if (reason === "clear") {
      setProvinceChoice(null);
      setCityChoice(null);
    } else {
      const cites = [...city];
      const filterData = cites.filter(
        (prov) => prov.provinceId === newValue.id
      );
      setCity(filterData);
      setProvinceChoice(newValue);
    }
  };

  const cityHandler = (event, newValue, reason) => {
    if (reason === "clear") {
      setCityChoice(null);
    } else {
      setCityChoice(newValue);
      console.log(newValue);

      const provinces = [...province];

      const filtered = provinces.filter((c) => {
        return c.id === newValue.provinceId;
      });
      setProvinceChoice(filtered[0]);
    }
  };

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={province}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="استان" />}
        value={provinceChoice}
        onChange={(event, newValue, reason) =>
          provinceHandler(event, newValue, reason)
        }
        getOptionKey={(o) => o.id}
      />
      <Autocomplete
        id="combo-box-demo1"
        options={city}
        getOptionLabel={(option) => option.name}
        getOptionKey={(o) => o.id}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="شهر" />}
        onChange={(event, newValue) => cityHandler(event, newValue)}
        value={cityChoice}
      />
    </div>
  );
}

export default Data;
