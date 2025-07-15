import { PiCheckCircle } from "react-icons/pi"

const Stepper = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <ol className="flex items-center justify-center text-xs text-gray-900 font-medium sm:text-base">
        <li className="flex items-center text-[#7BC625] relative">
          <div className="flex flex-col items-center">
            <span className="w-6 h-6 bg-[#7BC625] border-2 border-transparent rounded-full flex justify-center items-center mb-3 text-sm text-[#7BC625] lg:w-10 lg:h-10">
              <PiCheckCircle size={20} color="black" />
            </span>
            <span className="whitespace-nowrap">Cadastro</span>
          </div>
          {/* Linha conectora */}
          <span className="w-24 h-0.5 bg-gray-300 mx-4 mt-[-24px] lg:mt-[-32px] "></span>
        </li>
        <li className="flex items-center text-[#3342B7]">
          <div className="flex flex-col items-center">
            <span className="w-6 h-6 bg-[#3342B7] border-2 border-transparent rounded-full flex justify-center items-center mb-3 text-sm text-white lg:w-10 lg:h-10">
              2
            </span>
            <span className="whitespace-nowrap">Pagamento</span>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Stepper
