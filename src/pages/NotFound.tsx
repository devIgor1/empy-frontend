import { Card, CardContent } from "@/components/ui/card"
import { Search, CreditCard, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-500/50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="relative">
            <div className="w-32 h-32 mx-auto empy-bg-blue rounded-full flex items-center justify-center">
              <CreditCard className="w-16 h-16 text-white" />
              <AlertCircle className="w-10 h-10 text-[#3F4FFF] absolute -top-2 -right-2 rounded-full p-1" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-[#3F4FFF]">404</h1>
            <h2 className="text-3xl font-bold text-black">
              Planos Não Encontrados
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-black max-w-md mx-auto">
            Ops! O plano de assinatura que você está procurando não foi
            encontrado.
          </p>
          <p className="text-black">
            Não se preocupe, temos outras opções disponíveis para você.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Link to="/">
            <Card className="empy-bg-blue cursor-pointer hover:empy-bg-blue/50">
              <CardContent className="p-6 text-center space-y-3">
                <Search className="w-8 h-8 text-white mx-auto" />
                <h3 className="font-semibold text-white">Explorar Planos</h3>
                <p className="text-sm text-white">
                  Veja todos os planos disponíveis
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
