import PlanCard from "./PlanCard"
import whatsappLogo from "../assets/WhatsappLogo.svg"

const Plans = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-6">Planos de acesso</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <PlanCard
          title="Light"
          priceAnual="130,83"
          priceMensal="157,00"
          beneficios={["2 Créditos Offline", "20 Créditos Offline"]}
        />
        <PlanCard
          title="Standard"
          priceAnual="207,91"
          priceMensal="249,50"
          beneficios={["10 Créditos Offline", "30 Créditos Offline"]}
        />
        <PlanCard
          title="Pro"
          priceAnual="289,92"
          priceMensal="347,00"
          beneficios={["30 Créditos Offline", "Créditos Offline ILIMITADOS"]}
        />
      </div>

      <div className="mt-8 flex justify-start">
        <button className="bg-[#5E17F5] text-white px-5 py-3 rounded-full text-sm flex items-center justify-center gap-2">
          <img src={whatsappLogo} width={15} height={15} alt="whatsappLogo" />
          <span className="text-sm">Tire suas dúvidas</span>
        </button>
      </div>
    </section>
  )
}

export default Plans
