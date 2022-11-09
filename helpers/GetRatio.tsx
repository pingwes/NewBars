
export const GetRatio = (male: number, female: number) => {
  
  const total = male + female
  const malePercentage = male / total

  if (malePercentage < .143)
    return "1:7"
  else if (malePercentage > .143 && malePercentage <= .166)
    return "1:6"
  else if (malePercentage > .166 && malePercentage <= 0.18)
    return "1:5"
  else if (malePercentage > .18 && malePercentage <= 0.225)
    return "1:4"
  else if (malePercentage > .225 && malePercentage <= 0.3)
    return "1:3"
  else if (malePercentage > .3 && malePercentage <= 0.375)
    return "1:2"
  else if (malePercentage > .375 && malePercentage <= 0.45)
    return "2:3"
  else if (malePercentage > 0.45 && malePercentage <= 0.55)
    return "1:1"
  else if (malePercentage > 0.55 && malePercentage <= 0.625)
    return "3:2"
  else if (malePercentage > 0.625 && malePercentage <= 0.7)
    return "2:1"
  else if (malePercentage > 0.7 && malePercentage <= 0.775)
    return "3:1"
  else if (malePercentage > 0.775 && malePercentage <= 0.82)
    return "4:1"
  else if (malePercentage > 0.82 && malePercentage <= 0.833)
    return "5:1"
  else if (malePercentage > 0.833 && malePercentage <= 0.857)
    return "6:1" 
  else if (malePercentage > 0.857)
    return "7:1"
  else  
    return ""
  


}