
const Rating = ({rating}) => {
    const totalStar = 5;
  return (
    <>
    {[...Array(totalStar)].map((_, index)=>{
      const startIndex =  index + 1;
      return(
        <span key={index} className={`text-xl ${startIndex <=rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
      )
    })}
        
    </>
  )
}

export default Rating