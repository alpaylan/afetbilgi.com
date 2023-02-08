// gets safe gathering place data of given city
const getSafeGatheringPlace = (data, city) => {
    const safeGatheringPlaceData = data.options.filter(op => op.name_tr == "Güvenli Toplanma Alanları")
    const cityData = safeGatheringPlaceData[0].value.options.filter(op => op.name_tr == city)
    return cityData[0];
}

//getSafeGatheringPlace("Malatya")

module.exports = {
    getSafeGatheringPlace
}