import AuthenticatedLayout from "../layouts/AuthenticatedLayout"
import HistoryTable from "../components/HistoryTable"
import { useEffect, useState } from "react"
import type { Purchase } from "@/types/purchases"
import { getPurchases } from "@/services/getServices"
import PlanHeader from "@/components/PlanHeader"

const HistoryPage = () => {
  const [purchaseData, setPurchaseData] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPurchases()
      .then((data) => setPurchaseData(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <PlanHeader />
            <HistoryTable purchaseData={purchaseData} />
          </>
        )}
      </div>
    </AuthenticatedLayout>
  )
}

export default HistoryPage
