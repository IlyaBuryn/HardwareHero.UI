
let GeneralRules = {};

// Add additional rules for mb, cpu

let CpuRules = {};
let GpuRules = {};
let PsuRules = {};
let RamRules = {};

let MbRules = {};
let CaseRules = {};
let CoolerRules = {};
let SdRules = {};


export function getStartRule(index) {
  GeneralRules["ComponentType"] = index;
  return JSON.stringify(GeneralRules);
} 

export function setSpecificItemToConfiguration(items, currentType) {
  return items.find(item => {
    if (item.specifications) {
      let specs = JSON.parse(item.specifications);
      return specs.ComponentType === currentType;
    }
    return null;
  }) || null;
}

export function getSpecificIndex(currentIndex) {
  if (currentIndex === 'CPU' || currentIndex === 'Processor') {
    return 'cpu';
  }
  if (currentIndex === 'Case' || currentIndex === 'Tower') {
    return 'case'
  }
  if (currentIndex === 'Cooler' || currentIndex === 'Fan' || currentIndex === 'Cooling' ) {
    return 'cooler'
  }
  if (currentIndex === 'GPU' || currentIndex === 'Graphics card') {
    return 'gpu'
  }
  if (currentIndex === 'MB' || currentIndex === 'Motherboard') {
    return 'mb'
  }
  if (currentIndex === 'PS' || currentIndex === 'PSU' || currentIndex === 'Power supply') {
    return 'psu'
  }
  if (currentIndex === 'RAM' || currentIndex === 'Random access memory') {
    return 'ram'
  }
  if (currentIndex === 'SD' || currentIndex === 'SSD' || currentIndex === 'M2' || currentIndex === 'HDD' || currentIndex === 'Storage device') {
    return 'sd'
  }
}


export function getFilterForSelectedItem() { //FE: for MB when CPU is taken -> {"Socket Type":"Type"}

}

export function foreachComponentRule(currentIndex) {
  const rules = {};
  const specIndex = getSpecificIndex(currentIndex);
  getStartRule(specIndex);
  rules["ComponentType"] = GeneralRules["ComponentType"];
  if (specIndex === 'cpu') {
    rules["CPU Socket Type"] = GeneralRules["CPU Socket Type"]
  }
  if (specIndex === 'mb') {
    rules["CPU Socket Type"] = GeneralRules["CPU Socket Type"]
  }

  console.log('Before adding: ', rules)
  return JSON.stringify(rules);
}

export function createRule(selectedItem, selectedIndex) {
  if (selectedIndex === 'cpu') {
    if (selectedItem.specifications) {
      let specs = JSON.parse(selectedItem.specifications);

      if (specs["CPU Socket Type"] !== null && GeneralRules["CPU Socket Type"] === null) {
        GeneralRules["CPU Socket Type"] = specs["CPU Socket Type"]
      }
    }
  }
  if (selectedIndex === 'mb') {
    if (selectedItem.specifications) {
      let specs = JSON.parse(selectedItem.specifications);

      if (specs["CPU Socket Type"]) {
        GeneralRules["CPU Socket Type"] = specs["CPU Socket Type"]
      }
    }
  }
  // const cpuRulesString = JSON.stringify(CpuRules);
  // const mbRulesString = JSON.stringify(MbRules);
  // console.log(cpuRulesString);
  // console.log(mbRulesString);
  console.log('After adding: ', GeneralRules);
}

export function deleteRule(selectedIndex) {
  const specIndex = getSpecificIndex(selectedIndex);
  if (specIndex === 'cpu') {
    delete GeneralRules["CPU Socket Type"];
  }
  if (specIndex === 'mb') {
    delete GeneralRules["CPU Socket Type"]
  }

  console.log('Delete rule: ', GeneralRules)
}
