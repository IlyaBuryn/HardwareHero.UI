import { getAll, getJsonResponse } from "../utils/clientConnect";

const getComponentTypesRoute = 'gateway/configurator/component-type-signs';

export async function getComponentTypes(handleErrorMessageChange) {
  if (false) {
    return [
      {
          "id": "49f8efff-deaf-4120-9431-5b220c6c8bb9",
          "componentNames": [
              "Case",
              "Tower"
          ],
          "specifications": [
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "ATX"
                  ],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "mATX"
                  ],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "Mini-ATX"
                  ],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "E-ATX"
                  ],
                  "types": []
              }
          ],
          "image": "configurator-case.svg"
      },
      {
          "id": "07d0e938-ae97-4dcc-abe6-e119a04bd6a1",
          "componentNames": [
              "Cooler",
              "Cooling",
              "Fan",
              "Water cooler"
          ],
          "specifications": [],
          "image": "configurator-cooler.svg"
      },
      {
          "id": "ed0ce5e4-7b63-4e94-a579-070a2e5ec6de",
          "componentNames": [
              "Processor",
              "CPU"
          ],
          "specifications": [
              {
                  "manufacturer": null,
                  "series": [
                      "Celeron",
                      "Pentium",
                      "Core",
                      "Core I3",
                      "Core I5",
                      "Core I7",
                      "Core I9",
                      "Xeon"
                  ],
                  "cpuManufacturer": "Intel",
                  "formFactor": [],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [
                      "A6",
                      "A8",
                      "Athlon",
                      "Phenom",
                      "FX",
                      "Ryzen 3",
                      "Ryzen 5",
                      "Ryzen 7",
                      "Ryzen 9",
                      "Threadripper"
                  ],
                  "cpuManufacturer": "AMD",
                  "formFactor": [],
                  "types": []
              }
          ],
          "image": "configurator-cpu.svg"
      },
      {
          "id": "d8facf00-4c48-4a31-9e03-cfb0e8d8e3fc",
          "componentNames": [
              "Graphics card",
              "GPU"
          ],
          "specifications": [
              {
                  "manufacturer": "NVidia",
                  "series": [
                      "GeForce GT",
                      "GeForce GTX",
                      "GeForce GTS",
                      "Titan",
                      "GeForce RTX",
                      "Quadro"
                  ],
                  "cpuManufacturer": null,
                  "formFactor": [],
                  "types": []
              },
              {
                  "manufacturer": "AMD",
                  "series": [
                      "Radeon RX"
                  ],
                  "cpuManufacturer": null,
                  "formFactor": [],
                  "types": []
              },
              {
                  "manufacturer": "Intel",
                  "series": [
                      "Arc"
                  ],
                  "cpuManufacturer": null,
                  "formFactor": [],
                  "types": []
              }
          ],
          "image": "configurator-gpu.svg"
      },
      {
          "id": "248541fb-9cc9-45cd-b11d-33732e6b48e7",
          "componentNames": [
              "Motherboard",
              "MB"
          ],
          "specifications": [
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": "Intel",
                  "formFactor": [],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": "AMD",
                  "formFactor": [],
                  "types": []
              }
          ],
          "image": "configurator-motherboard.svg"
      },
      {
          "id": "23774b9b-9c96-421a-b336-02d687e2396b",
          "componentNames": [
              "PS",
              "Power supply",
              "Power case"
          ],
          "specifications": [
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "ATX"
                  ],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "TFX"
                  ],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "SFX"
                  ],
                  "types": []
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [
                      "SFX-L"
                  ],
                  "types": []
              }
          ],
          "image": "configurator-psu.svg"
      },
      {
          "id": "573c50b6-6dc1-4c3b-889d-a2965577a8b1",
          "componentNames": [
              "RAM",
              "Random access memory"
          ],
          "specifications": [
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [],
                  "types": [
                      "DDR3",
                      "DDR4",
                      "DDR5"
                  ]
              }
          ],
          "image": "configurator-ram.svg"
      },
      {
          "id": "7153cab9-2651-4d76-a8d7-c7b94b8b594e",
          "componentNames": [
              "SD",
              "SSD",
              "M2",
              "HDD",
              "Storage device"
          ],
          "specifications": [
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [],
                  "types": [
                      "HDD"
                  ]
              },
              {
                  "manufacturer": null,
                  "series": [],
                  "cpuManufacturer": null,
                  "formFactor": [],
                  "types": [
                      "SSD",
                      "M2"
                  ]
              }
          ],
          "image": "configurator-sd.svg"
      }
  ]
  }
  var responseBody = await getAll(getComponentTypesRoute, handleErrorMessageChange, null, null);

  var responseJson = await getJsonResponse(responseBody, handleErrorMessageChange)

  if (responseJson) {
    return responseJson;
  }
  else {
    handleErrorMessageChange('Response error!');
    return [];
  }
}