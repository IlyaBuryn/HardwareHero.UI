import { getAll, getJsonResponse, getOne } from "../utils/clientConnect";

const getComponentsAsPageByFilterRoute = 'gateway/aggregator/components/';
const getComponentByIdRoute = 'gateway/aggregator/component/';
const getPageCountRoute = 'gateway/aggregator/components/pageCount';

export async function getComponentsAsPageByFilter(handleError, pageNumber, pageSize, filter, searchString) {
  
  if (false) {
    return [
      {
          "id": "c4a08c40-ab2c-4346-8190-09ba0bb53ac2",
          "name": "Noctua NH-U12S",
          "description": "Noctua NH-U12S, Premium CPU Cooler with NF-F12 120mm Fan (Brown)",
          "images": "c4a08c40-ab2c-4346-8190-09ba0bb53ac2_0.jpg,c4a08c40-ab2c-4346-8190-09ba0bb53ac2_1.jpg",
          "specifications": "{\"ComponentType\":\"cooler\",\"Best Seller Ranking\":\"#15 in CPU Fans & Heatsinks\",\"Brand\":\"Noctua\",\"Model\":\"NH-U12S\",\"Type\":\"Fan & Heatsinks\",\"Fan Size\":\"120mm\",\"CPU Socket Compatibility\":\"Intel LGA 2066 / 2011-0 & 2011-3 (Square ILM) / 1700 / 1156 / 1155 / 1151 / 1150AMD AM4 / AM3+ / AM3 / AM2+ / AM2 / FM2+ / FM2 / FM1 (backplate required)\",\"Bearing Type\":\"SSO2-Bearing ( Self-stabilising oil-presure bearing )\",\"RPM\":\"1500 RPM (standard), 1200 RPM (w/ L.N.A.), 300 RPM (PWM)\",\"Air Flow\":\"54.97 CFM (standard), 43.73 CFM (w/ U.L.N.A)\",\"Noise Level\":\"22.4 dB(A) (standard), 18.6 dB(A) (w/ U.L.N.A.)\",\"Color\":\"Brown\",\"Heatsink Material\":\"Copper ( Base and Heat-pipes), Alum.( cooling Fins ), Soldered Joints, Nickel Plated.\",\"Fan Mounting Types to Heatsink\":\"Horizontal\",\"Max CPU Cooler Height\":\"158 mm\",\"Weight\":\"755g\",\"Features\":\"Award-winning NH-U12 series100% RAM compatibilityClassic 120mm tower size for excellent overall compatibilityNF-F12 120mm Focused Flow fanPWM support and Low-Noise AdaptorAnti-vibration pads and fan-clips for second NF-F12 (optional)SecuFirm2 mounting systemCompatibility with past and future socketsNT-H1 thermal compound\",\"Date First Available\":\"May 03, 2013\"}",
          "initialPrice": 74.99
      },
      {
          "id": "ab06f0a9-d8a8-4320-9a6e-11858ddbdd34",
          "name": "MSI - MPG A850G PCIE 5.0",
          "description": "MSI - MPG A850G PCIE 5.0, 80 GOLD Full Modular Gaming PSU, 12VHPWR Cable, 4080 4070 ATX 3.0 Compatible, 850W Power Supply",
          "images": "ab06f0a9-d8a8-4320-9a6e-11858ddbdd34_0.jpg,ab06f0a9-d8a8-4320-9a6e-11858ddbdd34_1.jpg",
          "specifications": "{\"ComponentType\":\"psu\",\"Best Seller Ranking\":\"#23 in Power Supplies\",\"Brand\":\"MSI\",\"Model\":\"MPG A850G PCIE5\",\"Color\":\"Black\",\"Type\":\"ATX / ATX (ATX 3.0 Compatible)\",\"Maximum Power\":\"850 W\",\"Fans\":\"1 x 135 mm\",\"PFC\":\"Active\",\"+12V Rails\":\"Single\",\"PCI-Express Connector\":\"2 x 6+2-Pin\",\"SATA Power Connector\":\"12\",\"Max PSU Length\":\"150 mm\",\"Modular\":\"Full Modular\",\"Efficiency\":\"Up to 90%\",\"Energy-Efficient\":\"80 PLUS GOLD Certified\",\"PSU Noise Level\":\"Cybenetics Standard ++\",\"Protection\":\"OCP,OVP,OPP,OTP, SCP,UVP\",\"Input Voltage\":\"100 - 240 V\",\"Input Frequency Range\":\"50/60 Hz\",\"Connectors\":\"1 x 16 pin PCIe / 1 x 24 pin ATX / 1 x 8 pin (4+4) EPS (CPU) / 1 x Floppy / 4 x 4 pin Peripheral / 6 x 8 pin (6+2) PCIe / 8 x SATA\",\"Cable Spec\":\"1 x ATX Cable2 x EPS (8 PIN to 4+4 PIN) Cable2 x PCIe (8 PIN to 6+2 PIN) Cable1 x PCIe (16 PIN to 16 PIN) Cable1 x PCIe (16 PIN to 6+2 PIN) Cable2 x SATA Sleeved Cable1 x SATA Sleeved Cable1 x MOLEX/FDD Sleeved Cable\",\"Dimensions\":\"150 x 150 x 86mm / 5.9\\\" x 5.9\\\" x 3.4\\\"\",\"Date First Available\":\"October 11, 2022\"}",
          "initialPrice": 99.99
      },
      {
          "id": "15a19f9b-9f68-443d-a62e-12f46635cddd",
          "name": "B75M",
          "description": "B75M Desktop Motherboard B75 LGA 1155 for i3 i5 i7 CPU Support DDR33 Memory 3*USB 3.0 SATA 3.0 Up to 16GB",
          "images": "15a19f9b-9f68-443d-a62e-12f46635cddd_0.jpg,15a19f9b-9f68-443d-a62e-12f46635cddd_1.jpg,15a19f9b-9f68-443d-a62e-12f46635cddd_2.jpg",
          "specifications": "{\"ComponentType\":\"mb\",\"Brand\":\"LISM\",\"CPU Socket Type\":\"LGA 1151\",\"CPU Type\":\"Core i7 / i5 / i3 (LGA1155)\",\"Chipset\":\"Intel B75/Q75/Z77 or other 7 Series\",\"Memory Standard\":\"DDR3*2\",\"Maximum Memory Supported\":\"16GB\",\"PCI Express x8\":\"1 x PCI Express x8\",\"Back I/O Ports\":\"1 x HDMI / 2 x USB 2.0/1.1 / 2 x USB 3.0\",\"HDMI\":\"1 x HDMI\",\"USB 3.0\":\"2 x USB 3.0\",\"USB 1.1/2.0\":\"2 x USB 2.0\",\"Form Factor\":\"M-ATX\",\"Dimensions (W x L)\":\"6.69*7.48inch\",\"Date First Available\":\"January 04, 2022\"}",
          "initialPrice": 59.99
      },
      {
          "id": "1a4c7538-a7eb-4507-aa55-16857aef18d6",
          "name": "HYTE Y40 Mainstream",
          "description": "HYTE Y40 Mainstream Vertical GPU Case ATX Mid Tower Gaming Case with PCI Express 4.0 x 16 Riser Cable Included, Black",
          "images": "1a4c7538-a7eb-4507-aa55-16857aef18d6_0.jpg,1a4c7538-a7eb-4507-aa55-16857aef18d6_1.jpg,1a4c7538-a7eb-4507-aa55-16857aef18d6_2.jpg",
          "specifications": "{\"ComponentType\":\"case\",\"Brand\":\"HYTE\",\"Series\":\"Y40\",\"Model\":\"CS-HYTE-Y40-B\",\"Type\":\"ATX Mid Tower\",\"Color\":\"Black\",\"Case Material\":\"ABS / Steel / Tempered Glass\",\"Motherboard Compatibility\":\"Micro ATX / ATX / ITX\",\"Side Panel Window\":\"Yes\",\"Dust Filters\":\"TopSideBottom x 2\",\"Internal 3.5\\\" Drive Bays\":\"1 x 3.5\\\" HDD or 2 x 2.5\\\" SSD\",\"Expansion Slots\":\"4 + 6 half-height\",\"Front Ports\":\"2 x USB 3.0 / 1 x USB 3.2 Type-C/ 1 x Audio/Mic Jack\",\"Fan Options\":\"Side: 2x 120mm/140mmTop: 3x 120mmRear: 1x 120mm (1x 120mm, 1300 rpm included)Bottom: 1x 120mm/140mm (1x 120mm, 1300 rpm included)\",\"Radiator Options\":\"Side: 120, 140, 240, 280mm up to 120mm thickTop: 120, 240, 360mmRear: 120mm\",\"Max GPU Length\":\"422mm length, 94mm height (80mm height or less recommended for best cooling)\",\"Max CPU Cooler Height\":\"183 mm\",\"Max PSU Length\":\"ATX up to 224mm in length\",\"Dimensions (H x W x D)\":\"439mm x 240mm x 472mm\",\"Weight\":\"10.39kg\",\"Date First Available\":\"December 15, 2022\"}",
          "initialPrice": 149.99
      },
      {
          "id": "0712d311-71e5-4c5b-8f80-1b1b08180851",
          "name": "ASUS TUF Gaming NVIDIA GeForce RTX 3070 Ti",
          "description": "ASUS TUF Gaming NVIDIA GeForce RTX 3070 Ti OC V2 Graphics Card (PCIe 4.0, 8GB GDDR6X, HDMI 2.1, DisplayPort 1.4a, Military-grade Certification, GPU Tweak III) TUF-RTX3070TI-O8G-V2-GAMING",
          "images": "GPU1.png,GPU2.png,GPU3.png",
          "specifications": "{\"Brand\":\"ASUS\",\"Series\":\"TUF Gaming OC\",\"Model\":\"TUF-RTX3070TI-O8G-V2-GAMING\",\"Interface\":\"PCI Express 4.0\",\"Chipset Manufacturer\":\"NVIDIA\",\"GPU Series\":\"NVIDIA GeForce RTX 30 Series\",\"GPU\":\"GeForce RTX 3070 Ti\",\"Boost Clock\":\"1815 MHz\",\"CUDA Cores\":\"6144 Cores\",\"Memory Size\":\"8GB\",\"Memory Interface\":\"256-Bit\",\"Memory Type\":\"GDDR6X\",\"DirectX\":\"DirectX 12\",\"OpenGL\":\"OpenGL 4.6\",\"Multi-Monitor Support\":\"4\",\"HDMI\":\"2 x HDMI 2.1\",\"DisplayPort\":\"3 x DisplayPort 1.4a\",\"Max Resolution\":\"7680 x 4320\",\"Cooler\":\"Triple Fans\",\"Thermal Design Power\":\"290W\",\"Recommended PSU Wattage\":\"750W\",\"Power Connector\":\"2 x 8-Pin\",\"Form Factor\":\"ATX\",\"Max GPU Length\":\"300 mm\",\"Slot Width\":\"2.7 Slot\"}",
          "initialPrice": 569.99
      },
      {
          "id": "b3efd4c1-2507-4a24-8b6d-20aea4848d73",
          "name": "GIGABYTE WINDFORCE GeForce RTX 4070 12GB GDDR6X",
          "description": "GIGABYTE WINDFORCE GeForce RTX 4070 12GB GDDR6X PCI Express 4.0 x16 ATX Video Card GV-N4070WF3OC-12GD",
          "images": "b3efd4c1-2507-4a24-8b6d-20aea4848d73_0.jpg,b3efd4c1-2507-4a24-8b6d-20aea4848d73_1.jpg,b3efd4c1-2507-4a24-8b6d-20aea4848d73_2.jpg",
          "specifications": "{\"ComponentType\":\"gpu\",\"Brand\":\"GIGABYTE\",\"Series\":\"WINDFORCE\",\"Model\":\"GV-N4070WF3OC-12GD\",\"Interface\":\"PCI Express 4.0 x16\",\"Chipset Manufacturer\":\"NVIDIA\",\"GPU Series\":\"NVIDIA GeForce RTX 40 Series\",\"GPU\":\"GeForce RTX 4070\",\"Effective Memory Clock\":\"21000 MHz\",\"Memory Size\":\"12GB\",\"Memory Interface\":\"192-Bit\",\"Memory Type\":\"GDDR6X\",\"DirectX\":\"DirectX 12\",\"OpenGL\":\"OpenGL 4.6\",\"Multi-Monitor Support\":\"4\",\"HDMI\":\"1 x HDMI\",\"DisplayPort\":\"3 x DisplayPort\",\"Max Resolution\":\"7680 x 4320\",\"Thermal Design Power\":\"200W\",\"Recommended PSU Wattage\":\"650W\",\"Power Connector\":\"8-Pin\",\"Form Factor\":\"ATX\",\"Max GPU Length\":\"261 mm\",\"Slot Width\":\"2.5 Slots\",\"Date First Available\":\"April 12, 2023\"}",
          "initialPrice": 599.99
      },
      {
          "id": "17bb6742-6611-4865-99f4-222610fb1b88",
          "name": "Intel Core i9-13900K",
          "description": "Intel Core i9-13900K - Core i9 13th Gen Raptor Lake 24-Core (8P+16E) P-core Base Frequency: 3.0 GHz E-core Base Frequency: 2.2 GHz LGA 1700 125W Intel UHD Graphics 770 Desktop Processor - BX8071513900K",
          "images": "CPU1.png,CPU2.png,CPU3.png,CPU4.png",
          "specifications": "{\"Brand\":\"Intel\",\"Processors Type\":\"Desktop\",\"Series\":\"Core i9 13th Gen\",\"Name\":\"Core i9-13900K\",\"Model\":\"BX8071513900K\",\"CPU Socket Type\":\"LGA 1700\",\"Core Name\":\"Raptor Lake\",\"# of Cores\":\"24-Core (8P+16E)\",\"# of Threads\":\"32\",\"Operating Frequency\":\"P-core Base Frequency: 3.0 GHz\\r\\nE-core Base Frequency: 2.2 GHz\",\"Max Turbo Frequency\":\"Intel Turbo Boost Max Technology 3.0 Frequency: Up to 5.7 GHz\\r\\nSingle P-core Turbo Frequency: Up to 5.4 GHz\\r\\nSingle E-core Turbo Frequency: Up to 4.3 GHz\",\"L2 Cache\":\"32MB\",\"L3 Cache\":\"36MB\",\"64-Bit Support\":\"Yes\",\"Hyper-Threading Support\":\"Yes\",\"Memory Types\":\"DDR4 3200 / DDR5 5600\",\"Memory Channel\":\"2\",\"Max Memory Size\":\"128 GB\",\"ECC Memory\":\"Supported\",\"Integrated Graphics\":\"Intel UHD Graphics 770\",\"Thermal Design Power\":\"125W\",\"Windows 11\":\"Supported\"}",
          "initialPrice": 569.97
      },
      {
          "id": "27497fd7-531e-473f-9ead-222afd0a9b4a",
          "name": "DeepCool AK620",
          "description": "DeepCool AK620 High-Performance CPU Cooler, Dual-Tower Design, 2x 120mm Fluid Dynamic Bearing Fans, 6 Copper Heat Pipes, 260W Heat Dissipation, Black.",
          "images": "27497fd7-531e-473f-9ead-222afd0a9b4a_0.jpg,27497fd7-531e-473f-9ead-222afd0a9b4a_1.jpg",
          "specifications": "{\"ComponentType\":\"cooler\",\"Best Seller Ranking\":\"#1 in CPU Fans & Heatsinks\",\"Brand\":\"Deepcool\",\"Model\":\"AK620\",\"Type\":\"Fan & Heatsinks\",\"Fan Size\":\"120mm\",\"CPU Socket Compatibility\":\"Intel LGA 2066 / 2011-3 / 2011 / 1700 / 1200 / 1155 / 1151 / 1150AMD AM4\",\"Bearing Type\":\"Fluid Dynamic\",\"RPM\":\"500~1850 RPM+/-10%\",\"Air Flow\":\"68.99 CFM\",\"Noise Level\":\"<=28 dB(A)\",\"Power Connector\":\"4 Pin\",\"Color\":\"Black\",\"Max CPU Cooler Height\":\"160 mm\",\"Fan Dimensions\":\"120.00 x 120.00 x 25.00 mm\",\"Heatsink Dimensions\":\"129.00 x 138.00 x 160.00 mm\",\"Weight\":\"1456g\",\"Date First Available\":\"May 03, 2022\"}",
          "initialPrice": 63.99
      },
      {
          "id": "4d120703-a73d-4941-856e-24b69f999d4b",
          "name": "Silicon Power",
          "description": "Silicon Power 2TB UD90 NVMe 4.0 Gen4 PCIe M.2 SSD R/W up to 5,000/4,800 MB/s",
          "images": "4d120703-a73d-4941-856e-24b69f999d4b_0.jpg,4d120703-a73d-4941-856e-24b69f999d4b_1.jpg",
          "specifications": "{\"ComponentType\":\"sd\",\"Best Seller Ranking\":\"#83 in Internal SSDs\",\"Brand\":\"Silicon Power\",\"Model\":\"UD90\",\"Part Number\":\"SP02KGBP44UD9005\",\"Device Type\":\"Internal Solid State Drive (SSD)\",\"Used For\":\"Consumer\",\"Form Factor\":\"M.2 2280\",\"Capacity\":\"2TB\",\"Memory Components\":\"3D NAND\",\"Interface\":\"PCI-Express 4.0 x4\",\"Max Sequential Read\":\"Up to 5000 MBps\",\"Max Sequential Write\":\"Up to 4800 MBps\",\"MTBF\":\"1,500,000 hours\",\"HeatSink\":\"No\",\"Features\":\"To bolster its multi-tasking factor even further, the UD90 takes advantage of increased bandwidth when used in conjunction with motherboards equipped with PCIe 4.0 slots. In fact, it has nearly double the bandwidth of PCIe 3.0 for shorter download times and the ability to download more files within the same amount of time.An SSD's speed is meaningless without the ability to handle that speed reliably. The UD90 achieves improved sequential read/write and random read/write performance with support for SLC Caching. At the same time, it supports low density parity check (LDPC) coding to ensure accuracy of data transmission and reliability of data access.The UD90 supports RAID to protect data in the case of a drive failure. It's also equipped with built-in E2E data protection for enhanced data transfer integrity. Unexpected things can happen at any moment, but the UD90 is prepared for them with your data at its utmost priority.5-year limited warranty\",\"Operating Temperature\":\"0\°C - 70\°C\",\"Max Shock Resistance\":\"1500g/0.5ms\",\"Date First Available\":\"January 04, 2023\"}",
          "initialPrice": 64.99
      },
      {
          "id": "d5947087-a778-4291-af5f-272f0e33a504",
          "name": "ASUS TUF Gaming NVIDIA GeForce RTX 3070 Ti OC",
          "description": "ASUS TUF Gaming NVIDIA GeForce RTX 3070 Ti OC V2 Graphics Card (PCIe 4.0, 8GB GDDR6X, HDMI 2.1, DisplayPort 1.4a, Military-grade Certification, GPU Tweak III) TUF-RTX3070TI-O8G-V2-GAMING",
          "images": "d5947087-a778-4291-af5f-272f0e33a504_0.jpg,d5947087-a778-4291-af5f-272f0e33a504_1.jpg,d5947087-a778-4291-af5f-272f0e33a504_2.jpg",
          "specifications": "{\"ComponentType\":\"gpu\",\"Best Seller Ranking\":\"#3 in GPUs / Video Graphics Cards\",\"Brand\":\"ASUS\",\"Series\":\"TUF Gaming OC\",\"Model\":\"TUF-RTX3070TI-O8G-V2-GAMING\",\"Part Number\":\"90YV0IS1-M0AA00\",\"Interface\":\"PCI Express 4.0\",\"Chipset Manufacturer\":\"NVIDIA\",\"GPU Series\":\"NVIDIA GeForce RTX 30 Series\",\"GPU\":\"GeForce RTX 3070 Ti\",\"Boost Clock\":\"1815 MHz\",\"CUDA Cores\":\"6144 Cores\",\"Memory Size\":\"8GB\",\"Memory Interface\":\"256-Bit\",\"Memory Type\":\"GDDR6X\",\"DirectX\":\"DirectX 12\",\"OpenGL\":\"OpenGL 4.6\",\"Multi-Monitor Support\":\"4\",\"HDMI\":\"2 x HDMI 2.1\",\"DisplayPort\":\"3 x DisplayPort 1.4a\",\"Max Resolution\":\"7680 x 4320\",\"Thermal Design Power\":\"290W\",\"Recommended PSU Wattage\":\"750W\",\"Power Connector\":\"2 x 8-Pin\",\"HDCP Ready\":\"Yes\",\"Form Factor\":\"ATX\",\"Max GPU Length\":\"300 mm\",\"Slot Width\":\"2.7 Slot\",\"Date First Available\":\"December 28, 2022\"}",
          "initialPrice": 559.99
      }
  ]
  }
  
  if (!filter) {
    filter = '{}';
  }

  if (!searchString) {
    searchString = " ";
  }

  const additionalHeaders = {
    'X-Specification-Filter': filter,
    'X-Search-String': searchString,
    'X-Page-Size': pageSize,
  }
  var responseBody = await getAll(getComponentsAsPageByFilterRoute + pageNumber, handleError, null, 
    additionalHeaders);

  var responseJson = await getJsonResponse(responseBody, handleError)

  if (responseJson) {
    return responseJson;
  }
  else {
    handleError('Response error!');
    return [];
  }
}

export async function getPageCount(handleError, pageSize, filter, searchString) {
  
  if (false) {
    return 2;
  }

  if (!filter) {
    filter = '{}';
  }

  if (!searchString) {
    searchString = " ";
  }

  const additionalHeaders = {
    'X-Specification-Filter': filter,
    'X-Search-String': searchString,
    'X-Page-Size': pageSize,
  }
  var responseBody = await getAll(getPageCountRoute, handleError, null, 
    additionalHeaders);

  var responseJson = await getJsonResponse(responseBody, handleError)

  if (responseJson) {
    return responseJson;
  }
  else {
    handleError('Response error!');
    return [];
  }
}

export async function getComponentById(errorHandler, id) {
  var responseBody = await getOne(getComponentByIdRoute + id, errorHandler, null);

  var responseJson = await getJsonResponse(responseBody, errorHandler);

  
  if (responseJson) {
    return responseJson;
  }
  else {
    errorHandler('Response error!');
    return null;
  }
}

export async function getManyComponents(errorHandler, ids) {
  if (!ids || ids.length === 0) {
    return [];
  }
  else {
    const items = [];
    ids.forEach(id => {
      items.push(getComponentById(errorHandler, id));
    });
    return items
  }
}