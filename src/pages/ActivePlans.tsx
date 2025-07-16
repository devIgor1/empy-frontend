import AuthenticatedLayout from "../layouts/AuthenticatedLayout"
import AdminPlansHeader from "../components/AdminPlansHeader"
import AdminPlansTable from "../components/AdminPlansTable"
import type { Plan } from "@/types/Plan"
import { useEffect, useState } from "react"
import { getPlans } from "@/services/getPlans"

const ActivePlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlans()
      .then((data) => setPlans(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthenticatedLayout>
      <AdminPlansHeader />
      {loading ? <p>Carregando...</p> : <AdminPlansTable plans={plans} />}
    </AuthenticatedLayout>
  )
}

export default ActivePlansPage
