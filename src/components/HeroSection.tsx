import awnings from "../assets/headerAwnings.svg"
import empyPlan from "../assets/empyPlan.svg"
import PlansToBuy from "./PlansToBuy"

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between max-w-6xl mx-auto bg-white rounded-lg h-full">
        <div className="flex justify-center flex-col items-center p-2">
          <div className="flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <img key={i} src={awnings} alt={`awning-${i}`} />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-5">
            <img src={empyPlan} alt="empyPlan" className="w-full h-auto" />
          </div>
          <PlansToBuy />
        </div>
      </div>
    </>
  )
}

export default HeroSection
